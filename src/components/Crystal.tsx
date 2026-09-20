'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// ── deterministic seeded RNG ──
function seeded(seed: number) {
  let s = Math.abs(seed | 0) || 1;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}
function hash(s: string) { let h = 0; for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; } return Math.abs(h); }

interface CrystalProps {
  name?: string;
}

export default function Crystal({ name = '' }: CrystalProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const seed = name ? hash(name) : Date.now();
    const rand = seeded(seed);

    // ── scene ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.8, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(400, 400);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // ── randomised crystal parameters ──
    const hue = rand() * 360;
    const hueOffset = 30 + rand() * 60;
    const sat = 0.3 + rand() * 0.3;
    const light = 0.45 + rand() * 0.25;
    const detail = Math.floor(1 + rand() * 2); // 1–3 icosahedron subdivisions
    const crystalSize = 1.2 + rand() * 0.6;
    const roughnessVal = 0.1 + rand() * 0.3;
    const metalnessVal = 0.3 + rand() * 0.5;
    const emissiveStr = 0.15 + rand() * 0.25;
    const rotSpeed = 0.12 + rand() * 0.1;
    const sparkleCount = Math.floor(80 + rand() * 120);

    const baseColor = new THREE.Color().setHSL(hue / 360, sat, light);
    const accentColor = new THREE.Color().setHSL(((hue + hueOffset) % 360) / 360, sat * 0.8, light * 0.6);
    const glowColor = new THREE.Color().setHSL(((hue + hueOffset * 0.5) % 360) / 360, 0.5, 0.3);

    // ── crystal geometry ──
    const geo = new THREE.IcosahedronGeometry(crystalSize, detail);
    const mat = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      emissive: glowColor,
      emissiveIntensity: emissiveStr,
      transparent: true,
      opacity: 0.85,
      roughness: roughnessVal,
      metalness: metalnessVal,
      clearcoat: 0.6,
      clearcoatRoughness: 0.3,
      flatShading: true,          // key: faceted look
      side: THREE.DoubleSide,
      envMapIntensity: 1.2,
    });
    const crystal = new THREE.Mesh(geo, mat);
    scene.add(crystal);

    // ── edges (crystal line structure) ──
    const edges = new THREE.EdgesGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.25,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    crystal.add(wireframe);

    // ── inner glow core ──
    const coreGeo = new THREE.IcosahedronGeometry(crystalSize * 0.5, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    crystal.add(core);

    // ── outer glow aura ──
    const auraGeo = new THREE.IcosahedronGeometry(crystalSize * 1.3, 0);
    const auraMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(((hue + hueOffset * 0.3) % 360) / 360, 0.3, 0.2),
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      wireframe: true,
    });
    const aura = new THREE.Mesh(auraGeo, auraMat);
    crystal.add(aura);

    // ── sparkle particles ──
    const pCount = sparkleCount;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pSizes = new Float32Array(pCount);
    for (let i = 0; i < pCount; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 2.5 + rand() * 3.5;
      pPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      pPos[i * 3 + 2] = Math.cos(phi) * r;
      pSizes[i] = 0.02 + rand() * 0.06;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pColor = new THREE.Color().setHSL(((hue + hueOffset * 0.7) % 360) / 360, 0.6, 0.7);
    const pMat = new THREE.PointsMaterial({
      color: pColor,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── lights ──
    const ambient = new THREE.AmbientLight(0x334466, 0.4);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(4, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x4488cc, 0.5);
    fill.position.set(-4, 1, -3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x8888ff, 0.8);
    rim.position.set(-2, -3, -5);
    scene.add(rim);

    // ── mouse tracking ──
    let targetRotX = 0, targetRotY = 0;
    const smoothRot = { x: 0, y: 0 };

    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetRotY = (e.clientX - cx) / (rect.width / 2) * 0.4;
      targetRotX = (e.clientY - cy) / (rect.height / 2) * 0.3;
    };
    // Only add listener if container has non-zero size
    const timer = setTimeout(() => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0) {
        container.addEventListener('pointermove', onPointer, { passive: true });
      }
    }, 200);

    // ── resize ──
    const onResize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height, 500);
      if (size < 10) return;
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    requestAnimationFrame(onResize);

    // ── animation loop ──
    const clock = new THREE.Clock();
    function animate() {
      animRef.current = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // mouse-following rotation with smoothing
      smoothRot.x += (targetRotX - smoothRot.x) * 0.04;
      smoothRot.y += (targetRotY - smoothRot.y) * 0.04;

      crystal.rotation.x = smoothRot.x;
      crystal.rotation.y = smoothRot.y + t * rotSpeed * 0.5;

      // core pulse
      coreMat.opacity = 0.15 + 0.12 * Math.sin(t * 0.6 + seed * 0.1);
      core.scale.setScalar(1 + 0.05 * Math.sin(t * 0.4 + seed * 0.2));

      // aura rotation
      aura.rotation.x = t * 0.08;
      aura.rotation.y = t * 0.12;
      auraMat.opacity = 0.06 + 0.05 * Math.sin(t * 0.3);

      // sparkle orbit
      particles.rotation.y = t * 0.02;
      particles.rotation.x = Math.sin(t * 0.015) * 0.05;

      // subtle emissive variation
      mat.emissiveIntensity = emissiveStr * (0.8 + 0.2 * Math.sin(t * 0.5 + seed));

      renderer.render(scene, camera);
    }
    animate();

    // ── cleanup ──
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
      pGeo.dispose(); pMat.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [name]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        maxWidth: 480,
        aspectRatio: '1 / 1',
        margin: '0 auto',
        position: 'relative',
      }}
    />
  );
}