import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Real-time, depth-sorted stellar disk. No background image or pre-rendered video. */
export default function OrbitScene({ paused }: { paused: boolean }) {
  const host = useRef<HTMLDivElement>(null),
    pause = useRef(paused);
  useEffect(() => {
    pause.current = paused;
  }, [paused]);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x030409, 1);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(48, 1, 0.1, 150);
    camera.position.set(0, 0, 16);
    let seed = 129;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const disk = new THREE.Group();
    scene.add(disk);
    const count = 18000,
      positions = new Float32Array(count * 3),
      colors = new Float32Array(count * 3),
      sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const radius = 0.5 + Math.pow(random(), 0.6) * 7.8,
        arm = i % 3;
      const angle =
        (arm * Math.PI * 2) / 3 +
        radius * 0.78 +
        (random() - 0.5) * (0.45 + radius * 0.07);
      const spread = (random() - 0.5) * 0.4;
      positions.set(
        [
          Math.cos(angle) * radius,
          spread * (1 - radius / 9),
          Math.sin(angle) * radius,
        ],
        i * 3,
      );
      const color = new THREE.Color().setHSL(
        0.6 + random() * 0.13,
        0.25 + random() * 0.4,
        0.48 + random() * 0.45,
      );
      if (radius < 2.5) color.setRGB(0.8, 0.71, 0.58);
      colors.set([color.r, color.g, color.b], i * 3);
      sizes[i] = random() > 0.995 ? 3.5 : random() * 1.3 + 0.35;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uTime: { value: 0 },
        uPixel: { value: Math.min(devicePixelRatio, 1.5) },
      },
      vertexShader: `attribute float size; varying vec3 vColor; uniform float uTime; uniform float uPixel; void main(){vColor=color;vec3 p=position;float a=uTime*.012/(.6+length(p)*.09);p.xz=mat2(cos(a),-sin(a),sin(a),cos(a))*p.xz;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(size*uPixel*(18./-mv.z),.5,6.);}`,
      fragmentShader: `varying vec3 vColor; void main(){float d=length(gl_PointCoord-.5)*2.;float light=exp(-d*d*5.);gl_FragColor=vec4(vColor,light*.8);}`,
    });
    disk.add(new THREE.Points(geo, mat));
    // A low-frequency dust layer shares the stellar disk's geometry and rotation.
    const dustMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
      fragmentShader: `varying vec2 vUv;uniform float uTime;float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}float fbm(vec2 p){float a=.5,v=0.;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.07+3.1;a*=.5;}return v;}void main(){vec2 p=(vUv-.5)*18.;float r=length(p),a=atan(p.y,p.x);float spiral=pow(.5+.5*cos(a*3.-r*2.34-uTime*.035),5.);float cloud=fbm(p*1.5)*fbm(p*4.);float fade=(1.-smoothstep(4.,9.,r))*smoothstep(.2,2.,r);float density=(spiral*.8+.12)*cloud*fade;vec3 color=mix(vec3(.28,.29,.7),vec3(.53,.29,.6),fbm(p));gl_FragColor=vec4(color,density*1.4);}`,
    });
    const dust = new THREE.Mesh(new THREE.PlaneGeometry(18, 18), dustMat);
    dust.rotation.x = -Math.PI / 2;
    disk.add(dust);
    const bgPositions = new Float32Array(1400 * 3);
    for (let i = 0; i < 1400; i++)
      bgPositions.set(
        [(random() - 0.5) * 85, (random() - 0.5) * 60, -random() * 65 - 5],
        i * 3,
      );
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute("position", new THREE.BufferAttribute(bgPositions, 3));
    const bg = new THREE.Points(
      bgGeo,
      new THREE.PointsMaterial({
        color: 0xc4d4ff,
        size: 0.035,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
      }),
    );
    scene.add(bg);

    // The horizon is a lit three-dimensional body; parallax changes its silhouette.
    const planetGeo = new THREE.SphereGeometry(24, 80, 64);
    const planetMat = new THREE.ShaderMaterial({
      vertexShader: `varying vec3 n;varying vec3 p;varying vec3 eye;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);p=position;eye=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 n;varying vec3 p;varying vec3 eye;float hash(vec3 q){return fract(sin(dot(q,vec3(17.1,31.7,71.3)))*43758.5453);}void main(){float light=max(0.,dot(normalize(n),normalize(vec3(-.5,.8,1.))));float rim=pow(1.-abs(dot(normalize(n),normalize(eye))),3.);float clouds=sin(p.x*1.7+sin(p.y*2.))*sin(p.z*1.5+p.x*.4);vec3 c=vec3(.004,.008,.019)+vec3(.022,.05,.09)*light*(.5+clouds*.18);c+=vec3(.18,.4,.9)*rim*rim*.8;gl_FragColor=vec4(c,1.);}`,
    });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.set(2, -25, -23);
    scene.add(planet);
    const atmosphereMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      vertexShader: `varying vec3 n;varying vec3 eye;void main(){vec4 mv=modelViewMatrix*vec4(position,1.);n=normalize(normalMatrix*normal);eye=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`,
      fragmentShader: `varying vec3 n;varying vec3 eye;void main(){float rim=pow(max(0.,1.-abs(dot(normalize(n),normalize(eye)))),7.);gl_FragColor=vec4(vec3(.16,.4,.9),rim*.6);}`,
    });
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(24.18, 80, 64),
      atmosphereMat,
    );
    atmosphere.position.copy(planet.position);
    scene.add(atmosphere);
    let pointerX = 0,
      pointerY = 0,
      orbitX = 0,
      orbitY = 0,
      drag = false,
      lastX = 0,
      lastY = 0,
      frame = 0,
      time = 0,
      last = 0,
      visible = true;
    const area = el.parentElement!;
    const move = (e: PointerEvent) => {
      const rect = area.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / rect.width - 0.5;
      pointerY = (e.clientY - rect.top) / rect.height - 0.5;
      if (drag) {
        orbitY += (e.clientX - lastX) * 0.005;
        orbitX += (e.clientY - lastY) * 0.004;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const down = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest(".hero-art")) return;
      drag = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const up = () => {
      drag = false;
    };
    area.addEventListener("pointermove", move);
    area.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    const key = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).classList.contains("real-icon")) {
        if (e.key === "ArrowLeft") orbitY -= 0.2;
        if (e.key === "ArrowRight") orbitY += 0.2;
        if (e.key === "ArrowUp") orbitX -= 0.15;
        if (e.key === "ArrowDown") orbitX += 0.15;
        if (e.key.startsWith("Arrow")) e.preventDefault();
      }
    };
    area.addEventListener("keydown", key);
    const resize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      disk.position.set(
        el.clientWidth < 700 ? 0 : -4,
        el.clientWidth < 700 ? 2.2 : 0.3,
        -4,
      );
      disk.scale.setScalar(el.clientWidth < 700 ? 0.78 : 1);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible || document.hidden) return;
      if (!pause.current) {
        time += dt;
        camera.position.x += (pointerX * 0.9 - camera.position.x) * 0.035;
        camera.position.y += (-pointerY * 0.6 - camera.position.y) * 0.035;
        disk.rotation.y += (orbitY + time * 0.012 - disk.rotation.y) * 0.025;
        disk.rotation.x +=
          (-0.58 + Math.max(-0.65, Math.min(0.65, orbitX)) - disk.rotation.x) *
          0.025;
        disk.rotation.z = 0.24;
        bg.rotation.y = time * 0.001;
        mat.uniforms.uTime.value = time;
        dustMat.uniforms.uTime.value = time;
      }
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      area.removeEventListener("pointermove", move);
      area.removeEventListener("pointerdown", down);
      area.removeEventListener("keydown", key);
      window.removeEventListener("pointerup", up);
      geo.dispose();
      mat.dispose();
      dust.geometry.dispose();
      dustMat.dispose();
      bgGeo.dispose();
      (bg.material as THREE.Material).dispose();
      planetGeo.dispose();
      planetMat.dispose();
      atmosphere.geometry.dispose();
      atmosphereMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);
  return <div className="universe" ref={host} aria-hidden="true" />;
}
