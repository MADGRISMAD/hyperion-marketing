"use client"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

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

// Lo que refleja el cromo: cielo violeta, horizonte coral muy brillante, suelo oscuro y dos "ventanas" de luz blanca
// que dejan los brillos duros. Es el truco de los aerógrafos de Sorayama: el metal es un espejo del atardecer.
function sunsetEnvironment() {
  const env = new THREE.Scene()
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(50, 64, 32),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      uniforms: {},
      vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }",
      fragmentShader: `varying vec3 vP;
        void main(){
          float y = vP.y;
          // cielo: violeta oscuro arriba, banda clara a media altura, horizonte coral; suelo casi negro (el contraste del cromo)
          vec3 top = vec3(0.30,0.34,0.50), pale = vec3(0.86,0.89,0.96), rose = vec3(0.95,0.55,0.55), hor = vec3(1.0,0.55,0.36), glow = vec3(1.0,0.86,0.70);
          vec3 c;
          if (y > 0.0) {
            c = mix(hor, rose, smoothstep(0.0, 0.08, y));
            c = mix(c, pale, smoothstep(0.08, 0.2, y));
            c = mix(c, top, smoothstep(0.35, 0.95, y));
          } else {
            c = mix(vec3(0.20,0.08,0.08), vec3(0.015,0.01,0.02), smoothstep(0.0, -0.12, y));
          }
          c += glow * exp(-abs(y) * 60.0) * 1.6;
          gl_FragColor = vec4(c, 1.0);
        }`,
    })
  )
  env.add(sky)
  const panel = new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 6, 6) })
  const a = new THREE.Mesh(new THREE.PlaneGeometry(14, 4), panel)
  a.position.set(-18, 16, 14)
  a.lookAt(0, 0, 0)
  const b = new THREE.Mesh(new THREE.PlaneGeometry(3, 18), panel)
  b.position.set(20, 6, -6)
  b.lookAt(0, 0, 0)
  env.add(a, b)
  return env
}

// Destello de 4 puntas (sprite que suma luz): se coloca sobre partes del cromo y titila
function glintTexture() {
  const c = document.createElement("canvas")
  c.width = c.height = 128
  const g = c.getContext("2d")
  const r = g.createRadialGradient(64, 64, 0, 64, 64, 40)
  r.addColorStop(0, "rgba(255,255,255,1)")
  r.addColorStop(0.15, "rgba(255,240,220,0.7)")
  r.addColorStop(1, "rgba(255,200,160,0)")
  g.fillStyle = r
  g.fillRect(0, 0, 128, 128)
  for (const [w, h] of [[128, 3], [3, 128]]) {
    const l = g.createLinearGradient(64 - w / 2, 64 - h / 2, 64 + w / 2, 64 + h / 2)
    l.addColorStop(0, "rgba(255,255,255,0)")
    l.addColorStop(0.5, "rgba(255,255,255,1)")
    l.addColorStop(1, "rgba(255,255,255,0)")
    g.fillStyle = l
    g.fillRect(64 - w / 2, 64 - h / 2, w, h)
  }
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function buildScene(isSmall) {
  const scene = new THREE.Scene()
  const disposables = []
  const track = (x) => (disposables.push(x), x)

  // ── Materiales ──
  // Cromo espejo: todo el color sale del atardecer que refleja.
  const chrome = track(new THREE.MeshPhysicalMaterial({ color: "#ffffff", metalness: 1, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.04 }))
  // Laca roja (el acento): la flecha de crecimiento
  const lime = track(new THREE.MeshPhysicalMaterial({ color: "#ff4a38", metalness: 0.2, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.03 }))

  // ── Secuoya de cromo pulido: tronco alto y una copa de faldones que se curvan hacia abajo, torneada como escultura ──
  const tree = new THREE.Group()
  const H = 7.2
  const trunkProfile = [
    [0.7, 0], [0.42, 0.15], [0.33, 0.55], [0.28, 1.8], [0.21, 3.6], [0.13, 5.2], [0.05, 6.7], [0.0, H],
  ].map(([r, y]) => new THREE.Vector2(r, y))
  tree.add(new THREE.Mesh(track(new THREE.LatheGeometry(trunkProfile, 48)), chrome))

  const crown = []
  const TIERS = 7
  const base = 0.36 * H
  const step = (H * 0.96 - base) / TIERS
  for (let k = 0; k < TIERS; k++) {
    const yb = base + k * step
    const R = 1.1 * Math.pow(1 - k / TIERS, 0.85) + 0.16 // cada faldón, más angosto que el de abajo
    const core = 0.24 * (1 - k / TIERS) + 0.06
    // faldón abombado: la curva hace que el reflejo pase del cielo al horizonte y al suelo, como el cromo aerografiado
    crown.push([core, yb + 0.18 * step], [R * 0.94, yb], [R, yb + 0.06], [R * 0.86, yb + step * 0.32], [R * 0.52, yb + step * 0.7], [core * 1.3, yb + step])
  }
  crown.push([0.05, H + 0.25], [0, H + 0.32])
  const crownCurve = new THREE.SplineCurve(crown.map(([r, y]) => new THREE.Vector2(r, y)))
  tree.add(new THREE.Mesh(track(new THREE.LatheGeometry(crownCurve.getPoints(isSmall ? 220 : 360), isSmall ? 64 : 96)), chrome))
  const tiers = []

  // Anillo tipo Saturno
  const ring = new THREE.Mesh(track(new THREE.TorusGeometry(1.75, 0.03, 16, 160)), chrome)
  ring.position.y = 4.6
  ring.rotation.x = Math.PI / 2.35
  tree.add(ring)
  scene.add(tree)

  // Flecha de crecimiento
  const arrowGeo = track(
    new THREE.ExtrudeGeometry(arrowShape(), { depth: 0.22, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2 })
  )
  arrowGeo.center()
  const arrow = new THREE.Mesh(arrowGeo, lime)
  arrow.position.set(2.1, 4.4, 0.6)
  arrow.rotation.z = -Math.PI / 4
  scene.add(arrow)

  // Destellos: en la punta, el anillo y la flecha, donde el cromo refleja las luces
  const glintMat = track(new THREE.SpriteMaterial({ map: track(glintTexture()), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }))
  const glintPos = isSmall
    ? [[0.05, 7.45, 0.1, 1.1], [1.55, 4.9, 0.6, 0.8]]
    : [[0.05, 7.45, 0.1, 1.3], [1.55, 4.9, 0.6, 0.9], [-0.55, 3.2, 0.5, 0.6], [2.4, 5.0, 0.9, 0.8]]
  const sparks = glintPos.map(([x, y, z, s], i) => {
    const m = new THREE.Sprite(glintMat)
    m.position.set(x, y, z)
    m.scale.setScalar(s)
    m.userData.size = s
    m.userData.phase = i * 1.9
    scene.add(m)
    return m
  })
  const ballGeo = track(new THREE.SphereGeometry(1, 48, 32))
  const balls = (isSmall ? [[-1.9, 0.5, 1.6, 0.32]] : [[-1.9, 0.6, 1.5, 0.42], [2.7, 3.0, -1.2, 0.26]]).map(
    ([x, y, z, s]) => {
      const m = new THREE.Mesh(ballGeo, chrome)
      m.position.set(x, y, z)
      m.scale.setScalar(s)
      m.userData.baseY = y
      scene.add(m)
      return m
    }
  )

  // Luz de relleno cálida desde abajo, como el reflejo del suelo al atardecer
  scene.add(new THREE.HemisphereLight("#2a1830", "#ff8a5c", 0.35))

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
  renderer.toneMappingExposure = 1.05
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const pmrem = new THREE.PMREMGenerator(renderer)
  const envScene = sunsetEnvironment()
  const envRT = pmrem.fromScene(envScene, 0.02)
  envScene.traverse((o) => (o.geometry?.dispose(), o.material?.dispose()))
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
    camera.position.z = camera.aspect < 0.8 ? 17.5 : camera.aspect < 1.2 ? 16 : 13.5
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
    sparks.forEach((s) => (s.visible = g > 0.85))
    balls.forEach((b) => (b.visible = g > 0.3))

    const spin = reduced ? 0 : t * 0.18
    tree.rotation.y = spin + scroll * 1.4 + mouse.x * 0.35
    tiers.forEach((m) => {
      m.position.y = m.userData.baseY + (reduced ? 0 : Math.sin(t * 1.3 + m.userData.phase) * 0.03)
    })
    ring.rotation.z = reduced ? 0 : t * 0.4

    arrow.position.y = 4.4 + (reduced ? 0 : Math.sin(t * 1.4) * 0.18) + scroll * 1.2
    arrow.rotation.y = reduced ? 0 : Math.sin(t * 0.8) * 0.5
    sparks.forEach((s) => {
      if (reduced) return
      // titila: casi siempre encendido, de vez en cuando se encoge y gira un poco
      const k = 0.75 + 0.25 * Math.pow(Math.abs(Math.sin(t * 0.7 + s.userData.phase)), 6)
      s.scale.setScalar(s.userData.size * k)
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
        <span className="chrome-mask block aspect-[273/480] h-3/4" style={{ "--mask": "url(/brand/hyperion-mark.png)" }} />
      </div>
    )
  }
  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />
}
