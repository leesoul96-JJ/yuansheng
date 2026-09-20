'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function seededRandom(seed: number): () => number {
  let s = Math.abs(seed | 0);
  if (s === 0) s = 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

interface WaterSphereProps {
  name?: string;
  className?: string;
}

export default function WaterSphere({ name = '', className = '' }: WaterSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const seed = name ? hashString(name) : Math.floor(Date.now() / 3600000);
    const rand = seededRandom(seed);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(400, 400);
    container.appendChild(renderer.domElement);

    const hue = 190 + rand() * 50;
    const hueVar = rand() * 20 - 10;
    const waveFreq = 1.8 + rand() * 2.2;
    const waveAmp = 0.04 + rand() * 0.08;
    const emissiveStrength = 0.08 + rand() * 0.15;
    const roughnessVal = 0.1 + rand() * 0.25;
    const particleSize = 0.02 + rand() * 0.04;
    const particleSpread = 1.8 + rand() * 1.2;
    const rotateSpeed = 0.08 + rand() * 0.12;

    const geometry = new THREE.SphereGeometry(1.5, 64, 64);
    const origPos = new Float32Array(geometry.attributes.position.array);

    const baseColor = new THREE.Color().setHSL(hue / 360, 0.4, 0.45);
    const emissiveColor = new THREE.Color().setHSL((hue + hueVar) / 360, 0.5, 0.15);

    const material = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      emissive: emissiveColor,
      emissiveIntensity: emissiveStrength,
      transparent: true,
      opacity: 0.75,
      roughness: roughnessVal,
      metalness: 0.05,
      clearcoat: 0.35,
      clearcoatRoughness: 0.3,
      ior: 1.33,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const glowGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: emissiveColor,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    const ringGeo = new THREE.RingGeometry(1.52, 1.68, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(hue / 360, 0.3, 0.3),
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    const pCount = Math.floor(150 + rand() * 100);
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pSizes = new Float32Array(pCount);
    for (let i = 0; i < pCount; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = particleSpread + rand() * 1.5;
      pPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      pPos[i * 3 + 2] = Math.cos(phi) * r;
      pSizes[i] = particleSize * (0.5 + rand() * 1.0);
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particleColor = new THREE.Color().setHSL(hue / 360, 0.3, 0.6);
    const pMat = new THREE.PointsMaterial({
      color: particleColor,
      size: particleSize,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    const ambient = new THREE.AmbientLight(0x446688, 0.3);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x4488bb, 0.4);
    fillLight.position.set(-3, -1, -3);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0x88ccff, 0.6);
    rimLight.position.set(-2, 3, -4);
    scene.add(rimLight);

    const targetRot = { x: 0, y: 0 };
    const smoothRot = { x: 0, y: 0 };

    const onMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const max = Math.max(rect.width / 2, rect.height / 2, 200);
      targetRot.y = dx / max * 0.5;
      targetRot.x = dy / max * 0.3;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    const onResize = () => {
      const rect = container.getBoundingClientRect();
      const size = Math.min(rect.width, rect.height, 500);
      renderer.setSize(size, size);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    requestAnimationFrame(onResize);

    const clock = new THREE.Clock();

    function animate() {
      animRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      smoothRot.x += (targetRot.x - smoothRot.x) * 0.04;
      smoothRot.y += (targetRot.y - smoothRot.y) * 0.04;

      const pos = geometry.attributes.position.array as Float32Array;
      const f1 = waveFreq * 0.9, f2 = waveFreq * 1.3, f3 = waveFreq * 0.7;
      const a1 = waveAmp, a2 = waveAmp * 0.7, a3 = waveAmp * 0.5;
      const speed = 0.8 + rotateSpeed * 0.5;

      for (let i = 0; i < pos.length; i += 3) {
        const ox = origPos[i], oy = origPos[i + 1], oz = origPos[i + 2];
        const dist = Math.sqrt(ox * ox + oy * oy + oz * oz) || 1;
        const nx = ox / dist, ny = oy / dist, nz = oz / dist;
        const w1 = Math.sin(ox * f1 + oy * f2 + time * speed) * a1;
        const w2 = Math.sin(oy * f2 - oz * f3 + time * speed * 1.3) * a2;
        const w3 = Math.sin(ox * f3 + oz * f1 + time * speed * 0.8) * a3;
        const d = w1 + w2 + w3;
        pos[i] = ox + nx * d;
        pos[i + 1] = oy + ny * d;
        pos[i + 2] = oz + nz * d;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();

      mesh.rotation.x += (smoothRot.x - mesh.rotation.x) * 0.05;
      mesh.rotation.y += (smoothRot.y - mesh.rotation.y) * 0.05;
      mesh.rotation.y += rotateSpeed * 0.01;

      glowMesh.rotation.x = mesh.rotation.x;
      glowMesh.rotation.y = mesh.rotation.y;
      ring.rotation.z = time * 0.06;
      ring.scale.setScalar(1 + Math.sin(time * 0.4) * 0.03);
      particles.rotation.y = time * 0.03;
      particles.rotation.x = Math.sin(time * 0.02) * 0.1;
      material.emissiveIntensity = emissiveStrength * (0.85 + 0.15 * Math.sin(time * 0.5));
      glowMat.opacity = 0.15 + 0.1 * Math.sin(time * 0.4);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [name]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: '100%',
        maxWidth: 420,
        aspectRatio: '1 / 1',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
}