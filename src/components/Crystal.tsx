'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function seeded(seed: number) {
  let s = Math.abs(seed | 0) || 1;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}
function hash(s: string) { let h = 0; for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; } return Math.abs(h); }

interface CrystalProps {
  name?: string;
  className?: string;
}

export default function Crystal({ name = '', className = '' }: CrystalProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const seed = name ? hash(name) : Date.now();
    const rand = seeded(seed);

    // ── scene ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.2, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(400, 400);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ── crystal palette ──
    const baseHue = rand() * 360;
    const accentHue = (baseHue + 40 + rand() * 60) % 360;
    const sat = 0.5 + rand() * 0.35;       // more saturated
    const light = 0.5 + rand() * 0.2;
    const detail = 2 + Math.floor(rand() * 2); // 2–3
    const size = 1.1 + rand() * 0.5;
    const roughnessVal = 0.05 + rand() * 0.2;
    const metalnessVal = 0.4 + rand() * 0.4;
    const emissiveStr = 0.3 + rand() * 0.4;

    const baseColor = new THREE.Color().setHSL(baseHue / 360, sat, light);
    const accentColor = new THREE.Color().setHSL(accentHue / 360, sat * 0.9, light * 0.55);
    const glowColor = new THREE.Color().setHSL(accentHue / 360, 0.7, 0.35);
    const edgeColor = new THREE.Color().setHSL(((baseHue + accentHue) / 2) / 360, 0.6, 0.7);

    // ═══════════ MAIN CRYSTAL ═══════════
    const geo = new THREE.IcosahedronGeometry(size, detail);
    const mat = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      emissive: glowColor,
      emissiveIntensity: emissiveStr,
      transparent: true,
      opacity: 0.82,
      roughness: roughnessVal,
      metalness: metalnessVal,
      clearcoat: 0.7,
      clearcoatRoughness: 0.25,
      flatShading: true,
      side: THREE.DoubleSide,
      envMapIntensity: 1.5,
      premultipliedAlpha: true,
    });
    const mainCrystal = new THREE.Mesh(geo, mat);
    scene.add(mainCrystal);

    // ── edges ──
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({
      color: edgeColor,
      transparent: true,
      opacity: 0.35,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    mainCrystal.add(wireframe);

    // ── inner glow ──
    const coreGeo = new THREE.SphereGeometry(size * 0.35, 12, 12);
    const coreMat = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainCrystal.add(core);

    // ── outer aura wireframe ──
    const auraGeo = new THREE.IcosahedronGeometry(size * 1.4, 0);
    const auraMat = new THREE.MeshBasicMaterial({
      color: edgeColor,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
      wireframe: true,
      depthWrite: false,
    });
    const aura = new THREE.Mesh(auraGeo, auraMat);
    mainCrystal.add(aura);

    // ═══════════ SATELLITE CRYSTALS ═══════════
    const satellites: THREE.Mesh[] = [];
    const satCount = 2 + Math.floor(rand() * 3); // 2–4
    for (let i = 0; i < satCount; i++) {
      const sSize = size * (0.2 + rand() * 0.25);
      const sGeo = new THREE.IcosahedronGeometry(sSize, 1);
      const sMat = new THREE.MeshPhysicalMaterial({
        color: accentColor,
        emissive: glowColor,
        emissiveIntensity: emissiveStr * 0.5,
        transparent: true,
        opacity: 0.6,
        roughness: roughnessVal + 0.2,
        metalness: metalnessVal * 0.7,
        clearcoat: 0.3,
        flatShading: true,
        side: THREE.DoubleSide,
      });
      const sat = new THREE.Mesh(sGeo, sMat);
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = size * (1.5 + rand() * 0.8);
      sat.position.set(
        Math.sin(phi) * Math.cos(theta) * r,
        Math.sin(phi) * Math.sin(theta) * r * 0.6,
        Math.cos(phi) * r
      );
      sat.userData = {
        theta, phi, r,
        rotSpeed: 0.2 + rand() * 0.3,
        orbitSpeed: 0.1 + rand() * 0.15,
        phase: rand() * Math.PI * 2,
      };
      scene.add(sat);
      satellites.push(sat);
    }

    // ═══════════ SPARKLE PARTICLES ═══════════
    const pCount = 150 + Math.floor(rand() * 150);
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pSizes = new Float32Array(pCount);
    for (let i = 0; i < pCount; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 2.2 + rand() * 4.5;
      pPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.7;
      pPos[i * 3 + 2] = Math.cos(phi) * r;
      pSizes[i] = 0.015 + rand() * 0.08;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pColor = new THREE.Color().setHSL(accentHue / 360, 0.6, 0.75);
    const pMat = new THREE.PointsMaterial({
      color: pColor,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ═══════════ LIGHTS ═══════════
    const ambient = new THREE.AmbientLight(0x222244, 0.5);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 2.5);
    key.position.set(5, 6, 7);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x4488cc, 0.8);
    fill.position.set(-4, 2, -4);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x8866ff, 1.2);
    rim.position.set(-3, -4, -6);
    scene.add(rim);
    const bottom = new THREE.DirectionalLight(0xff8844, 0.5);
    bottom.position.set(0, -5, 2);
    scene.add(bottom);

    // ═══════════ MOUSE ═══════════
    let targetRotX = 0, targetRotY = 0;
    const smoothRot = { x: 0, y: 0 };

    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetRotY = (e.clientX - cx) / (rect.width / 2) * 0.5;
      targetRotX = (e.clientY - cy) / (rect.height / 2) * 0.35;
    };

    const timer = setTimeout(() => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0) {
        container.addEventListener('pointermove', onPointer, { passive: true });
      }
    }, 300);

    // ═══════════ RESIZE ═══════════
    const onResize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height, 550);
      if (size < 10) return;
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    requestAnimationFrame(onResize);

    // ═══════════ ANIMATION LOOP ═══════════
    const clock = new THREE.Clock();
    function animate() {
      animRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      smoothRot.x += (targetRotX - smoothRot.x) * 0.035;
      smoothRot.y += (targetRotY - smoothRot.y) * 0.035;

      mainCrystal.rotation.x = smoothRot.x;
      mainCrystal.rotation.y = smoothRot.y + t * 0.2;

      // core pulse
      coreMat.opacity = 0.18 + 0.15 * Math.sin(t * 0.5 + seed);
      core.scale.setScalar(1 + 0.08 * Math.sin(t * 0.4 + seed * 1.1));

      // aura rotation
      aura.rotation.x = t * 0.06;
      aura.rotation.y = t * 0.1;
      auraMat.opacity = 0.05 + 0.05 * Math.sin(t * 0.25);

      // satellite orbits
      for (const sat of satellites) {
        const d = sat.userData;
        const angle = d.orbitSpeed * t + d.phase;
        const x = Math.sin(angle + d.theta) * Math.cos(d.phi) * d.r;
        const y = Math.sin(angle + d.phi) * d.r * 0.5;
        const z = Math.cos(angle + d.theta) * Math.cos(d.phi) * d.r;
        sat.position.set(x, y, z);
        sat.rotation.x = t * d.rotSpeed;
        sat.rotation.y = t * d.rotSpeed * 1.3;
      }

      // sparkle rotation
      particles.rotation.y = t * 0.015;
      particles.rotation.x = Math.sin(t * 0.01) * 0.03;
      pMat.opacity = 0.4 + 0.2 * Math.sin(t * 0.2 + seed * 0.3);

      // emissive shimmer
      mat.emissiveIntensity = emissiveStr * (0.8 + 0.2 * Math.sin(t * 0.4 + seed));

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointer);
      renderer.dispose();
      geo.dispose(); mat.dispose();
      edges.dispose(); lineMat.dispose();
      coreGeo.dispose(); coreMat.dispose();
      auraGeo.dispose(); auraMat.dispose();
      satellites.forEach(s => { s.geometry.dispose(); (s.material as THREE.Material).dispose(); });
      pGeo.dispose(); pMat.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [name]);

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        width: '100%',
        maxWidth: 500,
        aspectRatio: '1 / 1',
        margin: '0 auto',
        position: 'relative',
      }}
    />
  );
}