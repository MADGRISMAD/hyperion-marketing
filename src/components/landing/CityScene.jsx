"use client"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// Ciudad de noche detrás de toda la página. Es el parallax real: la cámara sobrevuela los edificios según el scroll
// (de la portada al pie) y se inclina con el cursor; la lluvia y las luces desenfocadas del frente se mueven más rápido.
// Todo es procedural: las ventanas se dibujan en el shader, sin texturas ni modelos que descargar.

const FOG = new THREE.Color("#04100b")

const buildingVertex = /* glsl */ `
  attribute float aSeed;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vSeed;
  void main() {
    vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vNormal = normal;
    vSeed = aSeed;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const buildingFragment = /* glsl */ `
  uniform vec3 uFog;
  uniform float uTime;
  varying vec3 vWorld;
  varying vec3 vNormal;
  varying float vSeed;
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main() {
    float dist = distance(vWorld, cameraPosition);
    vec3 col = vec3(0.012, 0.024, 0.02);
    // se aclara hacia arriba: el resplandor de la ciudad sobre las fachadas
    col += vec3(0.01, 0.03, 0.022) * clamp(vWorld.y / 60.0, 0.0, 1.0);
    if (abs(vNormal.y) < 0.5) {
      float u = abs(vNormal.x) > 0.5 ? vWorld.z : vWorld.x;
      vec2 cell = floor(vec2(u / 1.15, vWorld.y / 1.9));
      vec2 f = fract(vec2(u / 1.15, vWorld.y / 1.9));
      float inWin = step(0.22, f.x) * step(f.x, 0.78) * step(0.3, f.y) * step(f.y, 0.72);
      float r = hash(cell + vSeed * 17.0);
      float lit = step(0.8, r) * step(2.0, vWorld.y);
      // la mayoría cálidas, algunas verdes como monitores; unas pocas parpadean
      vec3 warm = mix(vec3(1.0, 0.72, 0.42), vec3(1.0, 0.86, 0.6), hash(cell + 3.1));
      vec3 green = vec3(0.35, 1.0, 0.62);
      vec3 win = mix(warm, green, step(0.93, hash(cell + vSeed)));
      float flick = r > 0.985 ? 0.6 + 0.4 * sin(uTime * 3.0 + r * 50.0) : 1.0;
      // se apagan a lo lejos y también muy cerca, para no hacer ruido detrás del texto
      float fade = smoothstep(420.0, 90.0, dist) * smoothstep(10.0, 70.0, dist);
      col += win * inWin * lit * (0.35 + 0.4 * hash(cell * 1.7)) * flick * fade;
    } else if (vNormal.y > 0.5) {
      // azotea: borde apenas visible y la luz roja de aviso en las torres altas
      col = vec3(0.02, 0.04, 0.033);
    }
    // neblina: espesa a lo lejos y a ras de suelo
    float fog = 1.0 - exp(-dist * 0.0085);
    fog = max(fog, smoothstep(14.0, 0.0, vWorld.y) * 0.55);
    gl_FragColor = vec4(mix(col, uFog, clamp(fog, 0.0, 1.0)), 1.0);
  }
`

function softDot(inner = "rgba(255,255,255,1)") {
  const c = document.createElement("canvas")
  c.width = c.height = 64
  const g = c.getContext("2d")
  const r = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  r.addColorStop(0, inner)
  r.addColorStop(0.35, "rgba(255,255,255,0.45)")
  r.addColorStop(1, "rgba(255,255,255,0)")
  g.fillStyle = r
  g.fillRect(0, 0, 64, 64)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  return t
}

function setup(canvas, parent, onFail) {
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" })
  } catch {
    onFail()
    return null
  }
  const small = window.innerWidth < 768
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.5))
  renderer.setClearColor(FOG)
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, 1, 0.5, 900)
  const disposables = []
  const track = (x) => (disposables.push(x), x)

  // ── Edificios: una sola malla instanciada en una cuadrícula de manzanas, con una avenida al centro ──
  let seed = 7
  const rand = () => ((seed = (seed * 16807) % 2147483647), (seed - 1) / 2147483646)
  const geo = track(new THREE.BoxGeometry(1, 1, 1))
  geo.translate(0, 0.5, 0)
  const spots = []
  const SPAN_X = small ? 150 : 210
  for (let z = 60; z > -620; z -= 11) {
    for (let x = -SPAN_X; x <= SPAN_X; x += 11) {
      if (Math.abs(x) < 16) continue // avenida por donde vuela la cámara
      if (rand() < 0.12) continue // terrenos vacíos
      const near = Math.abs(x) < 60
      const tower = rand() < (near ? 0.06 : 0.1)
      const h = tower ? 70 + rand() * 90 : 8 + Math.pow(rand(), 1.6) * (near ? 34 : 60)
      spots.push([x + (rand() - 0.5) * 2, z + (rand() - 0.5) * 2, 6 + rand() * 4, h, 6 + rand() * 4])
    }
  }
  const mat = track(
    new THREE.ShaderMaterial({
      vertexShader: buildingVertex,
      fragmentShader: buildingFragment,
      uniforms: { uFog: { value: FOG }, uTime: { value: 0 } },
    })
  )
  const city = new THREE.InstancedMesh(geo, mat, spots.length)
  const seeds = new Float32Array(spots.length)
  const m = new THREE.Matrix4()
  spots.forEach(([x, z, w, h, d], i) => {
    m.makeScale(w, h, d).setPosition(x, 0, z)
    city.setMatrixAt(i, m)
    seeds[i] = rand() * 100
  })
  geo.setAttribute("aSeed", new THREE.InstancedBufferAttribute(seeds, 1))
  scene.add(city)

  // Luces rojas de aviso en las azoteas de las torres
  const beaconPos = []
  spots.forEach(([x, z, , h]) => h > 70 && beaconPos.push(x, h + 1.2, z))
  const beaconGeo = track(new THREE.BufferGeometry())
  beaconGeo.setAttribute("position", new THREE.Float32BufferAttribute(beaconPos, 3))
  const dot = track(softDot())
  const beaconMat = track(
    new THREE.PointsMaterial({ size: 3.2, map: dot, color: "#ff4d4d", transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })
  )
  scene.add(new THREE.Points(beaconGeo, beaconMat))

  // Alumbrado de la avenida y de las calles: puntos cálidos que se vuelven bokeh de cerca
  const lampPos = []
  for (let z = 60; z > -620; z -= 9) {
    lampPos.push(-13, 6, z, 13, 6, z)
    if (z % 33 === 0) for (let x = -SPAN_X; x <= SPAN_X; x += 14) lampPos.push(x, 5, z + 5.5)
  }
  const lampGeo = track(new THREE.BufferGeometry())
  lampGeo.setAttribute("position", new THREE.Float32BufferAttribute(lampPos, 3))
  const lampMat = track(
    new THREE.PointsMaterial({ size: 2.6, map: dot, color: "#ffc56b", transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending })
  )
  scene.add(new THREE.Points(lampGeo, lampMat))

  // Suelo: asfalto mojado casi negro
  const ground = new THREE.Mesh(track(new THREE.PlaneGeometry(1400, 1400)), track(new THREE.MeshBasicMaterial({ color: "#020604" })))
  ground.rotation.x = -Math.PI / 2
  ground.position.z = -250
  scene.add(ground)

  // ── Capas que viajan con la cámara (son las que más se mueven en el parallax) ──
  const rig = new THREE.Group()
  scene.add(rig)
  // Lluvia: segmentos que caen; el shader los recicla de arriba abajo
  const DROPS = small ? 700 : 1600
  const rain = new Float32Array(DROPS * 6)
  for (let i = 0; i < DROPS; i++) {
    const x = (rand() - 0.5) * 90
    const y = rand() * 60
    const z = -rand() * 80
    rain.set([x, y, z, x - 0.25, y - 1.6, z], i * 6)
  }
  const rainGeo = track(new THREE.BufferGeometry())
  rainGeo.setAttribute("position", new THREE.BufferAttribute(rain, 3))
  const rainMat = track(
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: { uTime: { value: 0 } },
      vertexShader: /* glsl */ `
        uniform float uTime;
        varying float vA;
        void main() {
          vec3 p = position;
          p.y = mod(p.y - uTime * 38.0, 60.0) - 22.0;
          vA = smoothstep(-80.0, -6.0, p.z);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main() { gl_FragColor = vec4(0.62, 0.9, 0.78, 0.22 * vA); }`,
    })
  )
  rig.add(new THREE.LineSegments(rainGeo, rainMat))
  // Luces desenfocadas muy cerca de la cámara
  const bokehPos = []
  const BOKEH = small ? 10 : 18
  for (let i = 0; i < BOKEH; i++) bokehPos.push((rand() - 0.5) * 40, (rand() - 0.5) * 22, -8 - rand() * 14)
  const bokehGeo = track(new THREE.BufferGeometry())
  bokehGeo.setAttribute("position", new THREE.Float32BufferAttribute(bokehPos, 3))
  const bokehMat = track(
    new THREE.PointsMaterial({ size: 4.5, map: track(softDot("rgba(255,255,255,0.7)")), color: "#9dffc6", transparent: true, opacity: 0.16, depthWrite: false, blending: THREE.AdditiveBlending })
  )
  rig.add(new THREE.Points(bokehGeo, bokehMat))

  const resize = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener("resize", resize)

  const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
  const onMove = (e) => {
    mouse.tx = (e.clientX / window.innerWidth) * 2 - 1
    mouse.ty = (e.clientY / window.innerHeight) * 2 - 1
  }
  window.addEventListener("pointermove", onMove, { passive: true })

  let progress = 0 // 0 en la portada, 1 en el pie
  let raf
  const t0 = performance.now()
  const frame = () => {
    raf = requestAnimationFrame(frame)
    if (document.hidden) return
    const t = (performance.now() - t0) / 1000
    const max = document.documentElement.scrollHeight - window.innerHeight
    const target = max > 0 ? window.scrollY / max : 0
    progress += (target - progress) * (reduced ? 1 : 0.08) // el vuelo alcanza al scroll con suavidad
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05

    // de lo alto sobre la avenida, bajando entre los edificios hasta ras de la calle
    const z = 40 - progress * 520
    const y = 74 - progress * 46 + (reduced ? 0 : Math.sin(t * 0.4) * 0.6)
    camera.position.set(mouse.x * 6, y - mouse.y * 3, z)
    camera.lookAt(mouse.x * 14, y - 22 + progress * 16, z - 160)
    camera.rotation.z += mouse.x * -0.02
    rig.position.copy(camera.position)
    rig.quaternion.copy(camera.quaternion)

    mat.uniforms.uTime.value = t
    rainMat.uniforms.uTime.value = reduced ? 0 : t
    beaconMat.opacity = 0.55 + 0.45 * Math.max(0, Math.sin(t * 2.2))
    renderer.render(scene, camera)
  }
  frame()

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener("resize", resize)
    window.removeEventListener("pointermove", onMove)
    disposables.forEach((d) => d.dispose?.())
    city.dispose()
    renderer.dispose()
  }
}

export default function CityScene() {
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // Se monta después de la animación de entrada: compilar la escena traba un instante el navegador
    let cleanup = null
    let cancelled = false
    const root = document.documentElement
    const go = () => {
      if (cleanup || cancelled) return
      cleanup = setup(canvas, canvas.parentElement, () => setFailed(true)) || (() => {})
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

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(120%_70%_at_50%_30%,#0b2418_0%,#030806_70%)]" aria-hidden="true">
      {!failed && <canvas ref={canvasRef} className="flicker block h-full w-full" />}
      <div className="vignette absolute inset-0" />
    </div>
  )
}
