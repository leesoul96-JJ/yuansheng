'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, Sparkles } from 'lucide-react';

type Element = { name: string; english: string; color: string; secondary: string; meaning: string };

const elements: Element[] = [
  { name: '木', english: 'WOOD', color: '#6f9b78', secondary: '#c6a16b', meaning: '生长、连接与远见' },
  { name: '火', english: 'FIRE', color: '#cf7657', secondary: '#e5bd78', meaning: '热望、表达与行动' },
  { name: '土', english: 'EARTH', color: '#b28b68', secondary: '#d7c2a3', meaning: '稳定、承载与滋养' },
  { name: '金', english: 'METAL', color: '#c5bda8', secondary: '#8e9a9a', meaning: '判断、秩序与边界' },
  { name: '水', english: 'WATER', color: '#5f8fa0', secondary: '#b7d1d0', meaning: '直觉、流动与深度' },
];

function hashSeed(value: string) {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619);
  return hash >>> 0;
}

function CrystalScene({ element, seed }: { element: Element; seed: number }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(420, 420);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const hue = new THREE.Color(element.color);
    const crystal = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.18, 1),
      new THREE.MeshPhysicalMaterial({ color: hue, roughness: 0.2, metalness: 0.28, transmission: 0.12, transparent: true, opacity: 0.88, flatShading: true }),
    );
    group.add(crystal);
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.23, 1),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(element.secondary), wireframe: true, transparent: true, opacity: 0.42 }),
    );
    group.add(wire);

    const orbitMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(element.secondary), transparent: true, opacity: 0.66 });
    for (let i = 0; i < 3; i++) {
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(1.62 + i * 0.08, 0.006, 8, 96), orbitMaterial);
      orbit.rotation.set(0.65 + i * 0.35, i * 0.8, i * 0.2);
      group.add(orbit);
    }
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(240 * 3);
    let random = seed;
    const next = () => { random = (random * 1664525 + 1013904223) >>> 0; return random / 4294967296; };
    for (let i = 0; i < 240; i++) {
      const radius = 2.0 + next() * 1.1;
      const angle = next() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (next() - 0.5) * 3.3;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    scene.add(new THREE.Points(particles, new THREE.PointsMaterial({ color: new THREE.Color(element.secondary), size: 0.018, transparent: true, opacity: 0.75 })));
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const key = new THREE.PointLight(hue, 6, 8); key.position.set(2, 2, 4); scene.add(key);
    const fill = new THREE.PointLight(new THREE.Color(element.secondary), 4, 8); fill.position.set(-3, -1, 2); scene.add(fill);

    let frame = 0;
    const animate = () => { frame = requestAnimationFrame(animate); group.rotation.y += 0.003; group.rotation.x = Math.sin(Date.now() * 0.00045) * 0.08; renderer.render(scene, camera); };
    animate();
    return () => { cancelAnimationFrame(frame); renderer.dispose(); mount.removeChild(renderer.domElement); };
  }, [element, seed]);

  return <div ref={mountRef} className="crystal-canvas" aria-label={`${element.name}元素晶体`} />;
}

export default function ElementPortal({ onEnter }: { onEnter: (name: string, element: Element) => void }) {
  const [name, setName] = useState('');
  const [activeName, setActiveName] = useState('');
  const seed = hashSeed(activeName || '源生万象');
  const element = useMemo(() => elements[seed % elements.length], [seed]);

  const reveal = () => { const value = name.trim() || '无名'; setActiveName(value); };

  return (
    <section className="element-portal">
      <div className="portal-grid" aria-hidden="true" />
      <div className="portal-copy">
        <p className="portal-eyebrow"><Sparkles size={13} /> YUANSHENG / ORIGIN INSIGHT</p>
        <h1>你的元素，<br /><span>正在形成。</span></h1>
        <p className="portal-description">输入你的名字，让一枚属于你的五行晶体在星图中显现。</p>
        <div className="portal-form">
          <input value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && reveal()} placeholder="输入名字" maxLength={24} aria-label="输入名字" />
          <button onClick={reveal} aria-label="生成我的元素"><ArrowRight size={18} /></button>
        </div>
        <p className="portal-note">你的名字只用于生成本次星图 · 不保存</p>
      </div>
      <div className="portal-object">
        <CrystalScene element={element} seed={seed} />
        <div className="element-label"><span>{element.name}</span><div><strong>{element.english}</strong><small>{element.meaning}</small></div></div>
        <button className="enter-button" onClick={() => onEnter(activeName || name.trim() || '无名', element)} disabled={!activeName && !name.trim()}>进入我的星图 <ArrowRight size={15} /></button>
      </div>
      <div className="portal-footer"><span>五行 · 晶石 · 星体</span><span>SCROLL TO DISCOVER</span></div>
    </section>
  );
}

