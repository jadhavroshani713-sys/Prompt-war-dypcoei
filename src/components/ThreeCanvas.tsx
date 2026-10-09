"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export type RealmType = "earth" | "mind" | "domestic";

interface ThreeCanvasProps {
  realm: RealmType;
  onNodeClick?: (nodeId: string, nodeTitle: string, description: string) => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ realm, onNodeClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const currentObjectsRef = useRef<THREE.Group | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 15));
  const mousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    mount.appendChild(renderer.domElement);

    // AMBIENT & POINT LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight1.position.set(10, 15, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf59e0b, 2, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    // STARFIELD BACKGROUND PARTICLES
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starCoords[i] = (Math.random() - 0.5) * 80;
      starCoords[i + 1] = (Math.random() - 0.5) * 80;
      starCoords[i + 2] = (Math.random() - 0.5) * 80;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starCoords, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.15,
      transparent: true,
      opacity: 0.7,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // RAYCASTER FOR INTERACTIVITY
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mousePos.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mousePos.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.x = mousePos.current.x;
      mouse.y = mousePos.current.y;
    };

    const handleClick = () => {
      if (!currentObjectsRef.current) return;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        currentObjectsRef.current.children,
        true
      );
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.id && onNodeClick) {
          onNodeClick(hit.userData.id, hit.userData.title, hit.userData.desc);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    mount.addEventListener("click", handleClick);

    const handleResize = () => {
      if (!mount || !renderer) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ANIMATION LOOP
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera gentle parallax
      camera.position.x += (mousePos.current.x * 2.5 - camera.position.x) * 0.05;
      camera.position.y += (-mousePos.current.y * 2.0 + 2 - camera.position.y) * 0.05;
      camera.position.z += (targetCamPos.current.z - camera.position.z) * 0.05;
      camera.lookAt(0, 0, 0);

      // Rotate starfield slowly
      starField.rotation.y = elapsedTime * 0.02;

      // Animate current realm group
      if (currentObjectsRef.current) {
        currentObjectsRef.current.rotation.y = elapsedTime * 0.15;
        
        // Custom animation per realm
        if (realm === "earth") {
          currentObjectsRef.current.rotation.x = Math.sin(elapsedTime * 0.2) * 0.1;
        } else if (realm === "mind") {
          currentObjectsRef.current.rotation.z = Math.cos(elapsedTime * 0.3) * 0.1;
        } else if (realm === "domestic") {
          currentObjectsRef.current.rotation.y = Math.sin(elapsedTime * 0.2) * 0.25;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      mount.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onNodeClick, realm]);

  // BUILD REALM SPECIFIC 3D ASSETS
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (currentObjectsRef.current) {
      scene.remove(currentObjectsRef.current);
      currentObjectsRef.current.clear();
    }

    const group = new THREE.Group();
    currentObjectsRef.current = group;

    if (realm === "earth") {
      targetCamPos.current.set(0, 1, 16);
      buildEarthRealm(group);
    } else if (realm === "mind") {
      targetCamPos.current.set(0, 1, 15);
      buildMindRealm(group);
    } else if (realm === "domestic") {
      targetCamPos.current.set(0, 2, 17);
      buildDomesticRealm(group);
    }

    scene.add(group);
  }, [realm]);

  // REALM BUILDER 1: THE COSMIC PLANET
  const buildEarthRealm = (group: THREE.Group) => {
    // Planet core sphere
    const sphereGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0c2444,
      roughness: 0.4,
      metalness: 0.8,
      emissive: 0x051329,
      wireframe: false,
    });
    const planet = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(planet);

    // Atmosphere wireframe glow
    const wireGeo = new THREE.SphereGeometry(3.6, 24, 24);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const atmosphere = new THREE.Mesh(wireGeo, wireMat);
    group.add(atmosphere);

    // Orbital Ring
    const ringGeo = new THREE.RingGeometry(4.8, 6.2, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    group.add(ring);

    // Interactive Landmark Points of Earth's Chaos & Harmony
    const landmarks = [
      {
        id: "earth-storm",
        title: "Atmospheric Corridors",
        desc: "The relentless weather engines of Earth — churning monsoons and trade winds that circulate life across continents.",
        pos: new THREE.Vector3(2.5, 2.0, 1.8),
        color: 0x38bdf8,
      },
      {
        id: "earth-cities",
        title: "Bioluminescent Megacities",
        desc: "Billions of windows glowing in unison — human hives trading stories, dreams, and caffeine beneath the night sky.",
        pos: new THREE.Vector3(-2.2, -1.8, 2.2),
        color: 0xf59e0b,
      },
      {
        id: "earth-ocean",
        title: "The Abyssal Cradle",
        desc: "Vast sapphire depths holding 97% of Earth's water, absorbing chaos and breathing quiet equilibrium into our climate.",
        pos: new THREE.Vector3(1.2, -2.8, 1.9),
        color: 0x10b981,
      },
      {
        id: "earth-aurora",
        title: "Magnetic Aurora Shields",
        desc: "Solar winds colliding with Earth's magnetosphere, painting shimmering green curtains across polar skies.",
        pos: new THREE.Vector3(0.0, 3.8, 0.0),
        color: 0xa855f7,
      },
    ];

    landmarks.forEach((item) => {
      const pinGeo = new THREE.SphereGeometry(0.32, 16, 16);
      const pinMat = new THREE.MeshStandardMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 0.8,
        roughness: 0.1,
      });
      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.copy(item.pos);
      pin.userData = item;
      group.add(pin);

      // Light beam to surface
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        item.pos,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);
    });
  };

  // REALM BUILDER 2: THE INNER MIND PALACE
  const buildMindRealm = (group: THREE.Group) => {
    // Central Crystalline Neural Core
    const coreGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x4c1d95,
      wireframe: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Inner Glowing Core
    const innerGeo = new THREE.SphereGeometry(1.5, 24, 24);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      emissive: 0xdb2777,
      emissiveIntensity: 0.7,
      roughness: 0.3,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // Orbital Thought Nodes
    const thoughts = [
      {
        id: "mind-memories",
        title: "The Nostalgia Vault",
        desc: "Old melodies, forgotten afternoon sunlight, and the warmth of hands held long ago. The foundations of your identity.",
        pos: new THREE.Vector3(-3.5, 2.0, 1.5),
        color: 0xf43f5e,
      },
      {
        id: "mind-anxiety",
        title: "The Overthinking Nebula",
        desc: "Swirling clouds of 'what-ifs' and future deadlines. When viewed with compassion, it transforms from fear into foresight.",
        pos: new THREE.Vector3(3.8, -1.5, 2.0),
        color: 0x06b6d4,
      },
      {
        id: "mind-zen",
        title: "The Inner Quiet Room",
        desc: "The sacred stillness between thoughts. Where the storm pauses and you remember who you are beneath the noise.",
        pos: new THREE.Vector3(0.5, 3.8, -1.2),
        color: 0x10b981,
      },
      {
        id: "mind-dreams",
        title: "The Creation Spark",
        desc: "Wild inspirations and bedtime epiphanies that defy gravity, building castles out of abstract longing.",
        pos: new THREE.Vector3(-2.2, -3.2, -1.0),
        color: 0xf59e0b,
      },
    ];

    thoughts.forEach((item) => {
      const nodeGeo = new THREE.DodecahedronGeometry(0.45);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.copy(item.pos);
      node.userData = item;
      group.add(node);

      // Connecting synapse line
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        item.pos,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.5,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);
    });
  };

  // REALM BUILDER 3: THE DOMESTIC SANCTUARY
  const buildDomesticRealm = (group: THREE.Group) => {
    // Hearth Room Platform / Base
    const baseGeo = new THREE.CylinderGeometry(4.2, 4.8, 0.6, 8);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x271911,
      roughness: 0.8,
      metalness: 0.1,
    });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -2.5;
    group.add(base);

    // Warm Hearth Fireplace Crystal
    const fireGeo = new THREE.OctahedronGeometry(1.6);
    const fireMat = new THREE.MeshStandardMaterial({
      color: 0xf97316,
      emissive: 0xea580c,
      emissiveIntensity: 1.2,
      wireframe: true,
    });
    const fire = new THREE.Mesh(fireGeo, fireMat);
    fire.position.y = -0.6;
    group.add(fire);

    // Domestic Haven Artifacts
    const artifacts = [
      {
        id: "domestic-kettle",
        title: "The Steaming Kettle",
        desc: "The ritual of boiling water and pouring tea — a universal pause button for human hurriedness.",
        pos: new THREE.Vector3(-2.8, 0.2, 1.8),
        color: 0xf59e0b,
      },
      {
        id: "domestic-desk",
        title: "The Cluttered Workbench",
        desc: "Sketches, half-read books, coffee stains, and sticky notes. The glorious chaos where creativity brews.",
        pos: new THREE.Vector3(2.9, 0.8, 1.2),
        color: 0x38bdf8,
      },
      {
        id: "domestic-window",
        title: "The Rain-Streaked Window",
        desc: "Watching downpours from inside a warm blanket. The contrast that gives home its profound sense of safety.",
        pos: new THREE.Vector3(0.0, 3.2, -2.4),
        color: 0xa855f7,
      },
      {
        id: "domestic-vinyl",
        title: "The Spinning Record Player",
        desc: "Analog warmth crackling through the room, filling empty corners with old melodies and quiet company.",
        pos: new THREE.Vector3(-1.8, -1.2, 2.5),
        color: 0xec4899,
      },
    ];

    artifacts.forEach((item) => {
      const artGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const artMat = new THREE.MeshStandardMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 0.8,
        roughness: 0.3,
      });
      const art = new THREE.Mesh(artGeo, artMat);
      art.position.copy(item.pos);
      art.userData = item;
      group.add(art);

      // Pedestal line
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(item.pos.x, -2.2, item.pos.z),
        item.pos,
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.4,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);
    });
  };

  return (
    <div className="relative w-full h-full min-h-[420px] lg:min-h-[560px] select-none">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      
      {/* Interactive Helper Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs text-slate-300 pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span>Click glowing nodes to reveal stories • Drag to shift perspective</span>
      </div>
    </div>
  );
};
