"use client"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js"

const PAPER = "#d4cff6"

// Estrella de 4 puntas (destello Y2K)
function sparkleShape(r = 1, inner = 0.22) {
  const s = new THREE.Shape()
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2 + Math.PI / 2
    const rr = i % 2 === 0 ? r : inner
    const x = Math.cos(a) * rr
    const y = Math.sin(a) * rr
    i === 0 ? s.moveTo(x, y) : s.lineTo(x, y)
  }
  s.closePath()
  return s
}

// Flecha de crecimiento, como la del logo
function arrowShape() {
  const s = new THREE.Shape()
  s.moveTo(-0.12, -1.2)
  s.lineTo(0.12, -1.2)
  s.lineTo(0.12, 0.25)
  s.lineTo(0.42, 0.25)
  s.lineTo(0, 0.9)
  s.lineTo(-0.42, 0.25)
  s.lineTo(-0.12, 0.25)
  s.closePath()
  return s
}

// Sombra suave bajo el árbol (textura radial dibujada en canvas)
function shadowTexture() {
  const c = document.createElement("canvas")
  c.width = c.height = 128
  const g = c.getContext("2d")
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grd.addColorStop(0, "rgba(58,44,153,0.4)")
  grd.addColorStop(1, "rgba(58,44,153,0)")
  g.fillStyle = grd
  g.fillRect(0, 0, 128, 128)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function buildScene(isSmall) {
  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(PAPER, 13, 30)
  const disposables = []
  const track = (x) => (disposables.push(x), x)

  // ── Materiales ──
  // Follaje facetado (low-poly) en cromo iridiscente lavanda; las facetas reflejan el ambiente.
  const greens = ["#c9c2f5", "#b4c4fa", "#e2d2fc", "#a69ee6"].map((c) =>
    track(
      new THREE.MeshPhysicalMaterial({
        color: c,
        metalness: 0.85,
        roughness: 0.16,
        clearcoat: 1,
        iridescence: 1,
        iridescenceIOR: 1.4,
        iridescenceThicknessRange: [180, 620],
        flatShading: true,
      })
    )
  )
  const bark = track(
    new THREE.MeshPhysicalMaterial({ color: "#a9a1e0", metalness: 0.6, roughness: 0.22, clearcoat: 1, iridescence: 0.6, flatShading: true })
  )
  const lime = track(
    new THREE.MeshPhysicalMaterial({
      color: "#f2e6ff",
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1,
      iridescence: 1,
      iridescenceIOR: 1.6,
      iridescenceThicknessRange: [250, 800],
    })
  )
  const chrome = track(
    new THREE.MeshPhysicalMaterial({ color: "#f1efff", metalness: 1, roughness: 0.06, clearcoat: 1, iridescence: 0.35 })
  )

  // ── Secuoya low-poly: tronco alto y recto, copa columnar a partir de un tercio de altura ──
  let seed = 116
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  const tree = new THREE.Group()
  const H = 7.2
  const trunkProfile = [
    [0.7, 0], [0.42, 0.15], [0.33, 0.55], [0.28, 1.8], [0.21, 3.6], [0.13, 5.2], [0.05, 6.7], [0.0, H],
  ].map(([r, y]) => new THREE.Vector2(r, y))
  tree.add(new THREE.Mesh(track(new THREE.LatheGeometry(trunkProfile, 8)), bark))

  const clumpGeo = track(new THREE.IcosahedronGeometry(1, 0))
  const branchGeo = track(new THREE.CylinderGeometry(0.035, 0.06, 1, 5))
  const clumps = []
  // Perfil columnar: angosto, se ensancha poco y se cierra arriba
  const profile = (t) => Math.min(1, (t - 0.38) * 5) * Math.pow(1 - t, 0.5)
  const LEVELS = isSmall ? 16 : 22
  for (let i = 0; i < LEVELS; i++) {
    const t = 0.4 + (i / (LEVELS - 1)) * 0.57
    const y = t * H
    const reach = 0.95 * profile(t) + 0.14
    const count = t > 0.85 ? 2 : 3
    const offset = rand() * Math.PI * 2
    for (let k = 0; k < count; k++) {
      const ang = offset + (k / count) * Math.PI * 2 + (rand() - 0.5) * 0.6
      const r = reach * (0.55 + rand() * 0.45)
      const x = Math.cos(ang) * r
      const z = Math.sin(ang) * r
      // Rama
      const br = new THREE.Mesh(branchGeo, bark)
      br.scale.y = r
      br.position.set(x / 2, y - 0.05, z / 2)
      br.lookAt(new THREE.Vector3(x, y - 0.2, z).add(tree.position))
      br.rotateX(Math.PI / 2)
      tree.add(br)
      // Mechón de follaje: aplanado y un poco caído, como las ramas de una secuoya
      const size = (0.26 + rand() * 0.14) * (0.6 + profile(t) * 0.7)
      const c = new THREE.Mesh(clumpGeo, greens[Math.floor(rand() * greens.length)])
      c.position.set(x, y - 0.12, z)
      c.scale.set(size * 1.45, size * 0.5, size * 1.45)
      c.rotation.set(rand() * 0.6, rand() * Math.PI, rand() * 0.6)
      c.userData.baseY = c.position.y
      c.userData.phase = rand() * Math.PI * 2
      clumps.push(c)
      tree.add(c)
    }
    // Relleno junto al tronco
    const core = new THREE.Mesh(clumpGeo, greens[i % 2 ? 0 : 2])
    const cs = 0.2 + profile(t) * 0.22
    core.position.set(0, y, 0)
    core.scale.set(cs, cs * 0.8, cs)
    core.rotation.y = rand() * Math.PI
    tree.add(core)
  }
  const tip = new THREE.Mesh(track(new THREE.ConeGeometry(0.2, 0.75, 6, 1)), greens[0])
  tip.position.y = H + 0.1
  tree.add(tip)
  const tiers = clumps

  // Anillo tipo Saturno
  const ring = new THREE.Mesh(track(new THREE.TorusGeometry(1.75, 0.035, 10, 140)), lime)
  ring.position.y = 4.6
  ring.rotation.x = Math.PI / 2.35
  tree.add(ring)
  scene.add(tree)

  // Sombra en el piso
  const shadow = new THREE.Mesh(
    track(new THREE.PlaneGeometry(5.5, 5.5)),
    track(new THREE.MeshBasicMaterial({ map: track(shadowTexture()), transparent: true, depthWrite: false }))
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = 0.01
  scene.add(shadow)

  // Flecha de crecimiento
  const arrowGeo = track(
    new THREE.ExtrudeGeometry(arrowShape(), { depth: 0.22, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2 })
  )
  arrowGeo.center()
  const arrow = new THREE.Mesh(arrowGeo, lime)
  arrow.position.set(2.1, 4.4, 0.6)
  arrow.rotation.z = -Math.PI / 4
  scene.add(arrow)

  // Destellos y burbujas cromadas
  const sparkGeo = track(
    new THREE.ExtrudeGeometry(sparkleShape(0.5, 0.11), { depth: 0.08, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2 })
  )
  sparkGeo.center()
  const sparkPos = isSmall
    ? [[-2.0, 5.4, 0.5, 0.8], [2.0, 1.4, 1.2, 0.6]]
    : [[-2.3, 5.5, 0.4, 0.9], [2.3, 1.5, 1.2, 0.6], [-2.6, 2.0, -0.6, 0.5], [1.2, 6.6, -0.8, 0.45]]
  const sparks = sparkPos.map(([x, y, z, s], i) => {
    const m = new THREE.Mesh(sparkGeo, i === 0 ? lime : chrome)
    m.position.set(x, y, z)
    m.scale.setScalar(s)
    m.userData.baseY = y
    scene.add(m)
    return m
  })
  const ballGeo = track(new THREE.SphereGeometry(1, 32, 24))
  const balls = (isSmall ? [[-1.9, 0.5, 1.6, 0.32]] : [[-1.9, 0.6, 1.5, 0.34], [2.7, 3.0, -1.2, 0.26], [-1.3, 7.0, -1.5, 0.2]]).map(
    ([x, y, z, s]) => {
      const m = new THREE.Mesh(ballGeo, chrome)
      m.position.set(x, y, z)
      m.scale.setScalar(s)
      m.userData.baseY = y
      scene.add(m)
      return m
    }
  )

  // Piso de cuadrícula Y2K
  const grid = new THREE.GridHelper(44, 44, "#ffffff", "#ffffff")
  grid.material.transparent = true
  grid.material.opacity = 0.55
  track(grid.geometry)
  track(grid.material)
  scene.add(grid)

  // Luces (el ambiente da los reflejos; estas dan brillo y volumen)
  const key = new THREE.DirectionalLight("#ffffff", 1.6)
  key.position.set(5, 9, 6)
  const rim = new THREE.DirectionalLight("#b9a8ff", 1.2)
  rim.position.set(-6, 5, -4)
  scene.add(key, rim, new THREE.HemisphereLight("#ffffff", "#b3a9ef", 0.7))

  return { scene, tree, tiers, ring, arrow, sparks, balls, disposables }
}

function setupScene(canvas, parent, onFail) {
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" })
  } catch {
    onFail()
    return null
  }
  const isSmall = window.innerWidth < 768
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 1.75))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const pmrem = new THREE.PMREMGenerator(renderer)
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
  const { scene, tree, tiers, ring, arrow, sparks, balls, disposables } = buildScene(isSmall)
  scene.environment = envRT.texture
  scene.environmentIntensity = 1

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  const lookAt = new THREE.Vector3(0, 3.4, 0)

  const resize = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // En pantallas angostas se aleja un poco para que el árbol quepa completo
    camera.position.z = camera.aspect < 0.8 ? 16.5 : 13.5
    camera.updateProjectionMatrix()
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(parent)

  // Cursor y scroll
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMove = (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1
  }
  window.addEventListener("pointermove", onMove, { passive: true })

  // El árbol "crece" en cuanto la escena arranca (después de la animación de entrada)
  const growStart = performance.now()

  let visible = true
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(parent)

  const t0 = performance.now()
  let raf
  const easeOutBack = (x) => 1 + 2.2 * Math.pow(x - 1, 3) + 1.2 * Math.pow(x - 1, 2)

  const frame = () => {
    raf = requestAnimationFrame(frame)
    if (!visible) return
    const t = (performance.now() - t0) / 1000
    const scroll = Math.min(1.5, window.scrollY / window.innerHeight)

    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05

    // Crecimiento
    const g = Math.min(1, (performance.now() - growStart) / 1400)
    const grow = g === 0 ? 0.001 : Math.max(0.001, easeOutBack(g))
    tree.scale.set(grow, grow, grow)
    const pop = Math.max(0.001, Math.min(1, (g - 0.4) / 0.6))
    arrow.scale.setScalar(pop)
    sparks.forEach((s) => (s.visible = g > 0.5))
    balls.forEach((b) => (b.visible = g > 0.3))

    const spin = reduced ? 0 : t * 0.18
    tree.rotation.y = spin + scroll * 1.4 + mouse.x * 0.35
    tiers.forEach((m) => {
      m.position.y = m.userData.baseY + (reduced ? 0 : Math.sin(t * 1.3 + m.userData.phase) * 0.03)
    })
    ring.rotation.z = reduced ? 0 : t * 0.4

    arrow.position.y = 4.4 + (reduced ? 0 : Math.sin(t * 1.4) * 0.18) + scroll * 1.2
    arrow.rotation.y = reduced ? 0 : Math.sin(t * 0.8) * 0.5
    sparks.forEach((s, i) => {
      if (reduced) return
      s.rotation.y = t * (0.9 + i * 0.2)
      s.position.y = s.userData.baseY + Math.sin(t * 1.1 + i * 2) * 0.2
    })
    balls.forEach((b, i) => {
      if (reduced) return
      b.position.y = b.userData.baseY + Math.sin(t * 0.9 + i * 1.7) * 0.25 + scroll * (0.6 + i * 0.3)
    })

    // Cámara: paralaje con el cursor y descenso con el scroll
    camera.position.x = mouse.x * 0.9
    camera.position.y = 3.2 - mouse.y * 0.45 + scroll * 1.6
    camera.lookAt(lookAt.x, lookAt.y + scroll * 0.9, lookAt.z)
    renderer.render(scene, camera)
  }
  frame()

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
    window.removeEventListener("pointermove", onMove)
    disposables.forEach((d) => d.dispose?.())
    envRT.dispose()
    pmrem.dispose()
    renderer.dispose()
  }
}

export default function HeroScene({ className = "" }) {
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return
    // Se espera a que termine la animación del logo: compilar la escena 3D
    // bloquea un momento el navegador y no debe trabar esa animación.
    let cleanup = null
    let cancelled = false
    const root = document.documentElement
    const go = () => {
      if (cleanup || cancelled) return
      cleanup = setupScene(canvas, parent, () => setFailed(true)) || (() => {})
    }
    let mo
    if (!root.classList.contains("intro-active")) go()
    else {
      mo = new MutationObserver(() => {
        if (root.classList.contains("intro-active")) return
        mo.disconnect()
        requestAnimationFrame(go)
      })
      mo.observe(root, { attributes: true, attributeFilter: ["class"] })
    }
    return () => {
      cancelled = true
      mo?.disconnect()
      cleanup?.()
    }
  }, [])

  if (failed) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/hyperion-mark.png" alt="" className="h-3/4 w-auto" />
      </div>
    )
  }
  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />
}
