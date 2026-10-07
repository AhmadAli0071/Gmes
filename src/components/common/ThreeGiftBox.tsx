import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type BgThemeId =
  | 'cosmic'
  | 'midnight-gold'
  | 'romantic-rose'
  | 'festive-emerald'
  | 'sunset-dream'
  | 'sapphire-sky'
  | 'pearl-glow';

export interface BgThemeConfig {
  id: BgThemeId;
  name: string;
  emoji: string;
  cssBg: string;
  particleColor: number;
  fogColor: number;
  lightKey: number;
  lightRim: number;
  isDark: boolean;
}

export const BG_THEMES: BgThemeConfig[] = [
  {
    id: 'cosmic',
    name: 'Cosmic Violet',
    emoji: '🌌',
    cssBg: 'radial-gradient(ellipse at 50% 35%, #2e1065 0%, #15062c 55%, #090214 100%)',
    particleColor: 0xd8b4fe,
    fogColor: 0x15062c,
    lightKey: 0xf5d0fe,
    lightRim: 0xa855f7,
    isDark: true,
  },
  {
    id: 'midnight-gold',
    name: 'Midnight Gold',
    emoji: '✨',
    cssBg: 'radial-gradient(ellipse at 50% 35%, #27272a 0%, #18181b 55%, #09090b 100%)',
    particleColor: 0xfde047,
    fogColor: 0x18181b,
    lightKey: 0xfef08a,
    lightRim: 0xf59e0b,
    isDark: true,
  },
  {
    id: 'romantic-rose',
    name: 'Romantic Rose',
    emoji: '🌸',
    cssBg: 'radial-gradient(ellipse at 50% 35%, #831843 0%, #4c0519 55%, #1f030a 100%)',
    particleColor: 0xf472b6,
    fogColor: 0x4c0519,
    lightKey: 0xfce7f3,
    lightRim: 0xf43f5e,
    isDark: true,
  },
  {
    id: 'festive-emerald',
    name: 'Festive Emerald',
    emoji: '🌲',
    cssBg: 'radial-gradient(ellipse at 50% 35%, #064e3b 0%, #022c22 55%, #01140e 100%)',
    particleColor: 0x34d399,
    fogColor: 0x022c22,
    lightKey: 0xd1fae5,
    lightRim: 0x10b981,
    isDark: true,
  },
  {
    id: 'sunset-dream',
    name: 'Sunset Dream',
    emoji: '🌅',
    cssBg: 'radial-gradient(ellipse at 50% 35%, #581c87 0%, #3b0764 45%, #18032e 100%)',
    particleColor: 0xfb923c,
    fogColor: 0x3b0764,
    lightKey: 0xffedd5,
    lightRim: 0xf97316,
    isDark: true,
  },
  {
    id: 'sapphire-sky',
    name: 'Royal Sapphire',
    emoji: '💎',
    cssBg: 'radial-gradient(ellipse at 50% 35%, #1e3a8a 0%, #0f172a 55%, #020617 100%)',
    particleColor: 0x60a5fa,
    fogColor: 0x0f172a,
    lightKey: 0xbfdbfe,
    lightRim: 0x3b82f6,
    isDark: true,
  },
  {
    id: 'pearl-glow',
    name: 'Pearl Elegance',
    emoji: '☁️',
    cssBg: 'radial-gradient(ellipse at 50% 35%, #FAF5FF 0%, #EDE9FE 55%, #DDD6FE 100%)',
    particleColor: 0x7c3aed,
    fogColor: 0xede9fe,
    lightKey: 0xffffff,
    lightRim: 0x8b5cf6,
    isDark: false,
  },
];

export interface ThreeGiftBoxProps {
  boxColor?: string;
  ribbonColor?: string;
  isOpened?: boolean;
  onOpen?: () => void;
  interactive?: boolean;
  effect?: 'sparkles' | 'hearts' | 'confetti' | 'snow';
  recipientName?: string;
  senderName?: string;
  message?: string;
  photos?: string[];
  voiceNoteUrl?: string;
  voiceNoteDuration?: number;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
  activeCardIdx?: number;
  onSelectCard?: (idx: number) => void;
  fontStyle?: 'modern' | 'handwritten' | 'editorial';
  className?: string;
  bgThemeId?: BgThemeId;
  onBgThemeChange?: (themeId: BgThemeId) => void;
}

export const ThreeGiftBox: React.FC<ThreeGiftBoxProps> = ({
  boxColor = '#6D28D9',
  ribbonColor = '#F59E0B',
  isOpened = false,
  onOpen,
  interactive = true,
  effect = 'sparkles',
  recipientName = 'Sarah',
  senderName = 'Ahmad',
  message = 'Wishing you moments of pure happiness, laughter with friends, and peace in your heart.',
  photos = [],
  voiceNoteUrl,
  voiceNoteDuration = 24,
  isPlayingAudio = false,
  onToggleAudio,
  activeCardIdx = 0,
  onSelectCard,
  fontStyle = 'editorial',
  className = '',
  bgThemeId = 'cosmic',
  onBgThemeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Total cards in deck: Card 0 is the Story/Message Card, Cards 1..N are Photo Cards
  const totalDeckCards = 1 + (photos?.length || 0);

  // Sync state reference to prevent teardown in 60fps loop
  const stateRef = useRef({
    isOpened,
    boxColor,
    ribbonColor,
    effect,
    recipientName,
    senderName,
    message,
    photos,
    hasVoice: !!voiceNoteUrl,
    isPlayingAudio,
    activeCardIdx,
    fontStyle,
    bgThemeId,
  });

  useEffect(() => {
    stateRef.current = {
      isOpened,
      boxColor,
      ribbonColor,
      effect,
      recipientName,
      senderName,
      message,
      photos,
      hasVoice: !!voiceNoteUrl,
      isPlayingAudio,
      activeCardIdx,
      fontStyle,
      bgThemeId,
    };
  }, [
    isOpened,
    boxColor,
    ribbonColor,
    effect,
    recipientName,
    senderName,
    message,
    photos,
    voiceNoteUrl,
    isPlayingAudio,
    activeCardIdx,
    fontStyle,
    bgThemeId,
  ]);

  // Sequential 3D card auto-cycle timer ("ak k bad an image bari ho k nazar ay")
  useEffect(() => {
    if (!isOpened || totalDeckCards <= 1) return;
    const interval = setInterval(() => {
      if (onSelectCard) {
        const next = (stateRef.current.activeCardIdx + 1) % totalDeckCards;
        onSelectCard(next);
      }
    }, 4200);
    return () => clearInterval(interval);
  }, [isOpened, totalDeckCards, onSelectCard]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 380;
    let height = container.clientHeight || 340;

    // 1. Three.js Scene, Camera & Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 5.2);
    camera.lookAt(0, 0.3, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 2. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7e6, 2.4);
    keyLight.position.set(3.5, 6, 4.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xbfa5ff, 1.8);
    rimLight.position.set(-4, 3.5, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffeedb, 0.9);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    const innerLight = new THREE.PointLight(0xffd54f, 0, 10);
    innerLight.position.set(0, 0.5, 0);
    rootGroup.add(innerLight);

    // 3. Materials
    const getBoxColor = () => new THREE.Color(stateRef.current.boxColor);
    const getRibbonColor = () => new THREE.Color(stateRef.current.ribbonColor);

    const boxMat = new THREE.MeshPhysicalMaterial({
      color: getBoxColor(),
      roughness: 0.22,
      metalness: 0.15,
      clearcoat: 0.65,
      clearcoatRoughness: 0.14,
      reflectivity: 0.8,
      transparent: true,
      opacity: 1,
    });

    const ribbonMat = new THREE.MeshStandardMaterial({
      color: getRibbonColor(),
      roughness: 0.16,
      metalness: 0.88,
      transparent: true,
      opacity: 1,
    });

    const goldMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xffdf78),
      roughness: 0.12,
      metalness: 0.95,
      transparent: true,
      opacity: 1,
    });

    // 4. Gift Box Base (Will disappear completely when opened!)
    const boxGroup = new THREE.Group();
    rootGroup.add(boxGroup);

    const boxSize = 1.45;
    const boxHeight = 1.25;

    const baseGeo = new THREE.BoxGeometry(boxSize, boxHeight, boxSize);
    const baseMesh = new THREE.Mesh(baseGeo, boxMat);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    boxGroup.add(baseMesh);

    const liningMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x221338),
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
    });
    const liningGeo = new THREE.BoxGeometry(boxSize * 0.94, 0.05, boxSize * 0.94);
    const liningMesh = new THREE.Mesh(liningGeo, liningMat);
    liningMesh.position.y = boxHeight * 0.42;
    boxGroup.add(liningMesh);

    const ribbonW = 0.26;
    const ribbonThick = 0.02;

    const ribVGeo = new THREE.BoxGeometry(ribbonW, boxHeight + 0.008, boxSize + ribbonThick);
    const ribVMesh = new THREE.Mesh(ribVGeo, ribbonMat);
    boxGroup.add(ribVMesh);

    const ribHGeo = new THREE.BoxGeometry(boxSize + ribbonThick, boxHeight + 0.008, ribbonW);
    const ribHMesh = new THREE.Mesh(ribHGeo, ribbonMat);
    boxGroup.add(ribHMesh);

    // 5. Lid Group (Will disappear completely when opened!)
    const lidGroup = new THREE.Group();
    const lidSize = boxSize + 0.09;
    const lidHeight = 0.28;

    const lidGeo = new THREE.BoxGeometry(lidSize, lidHeight, lidSize);
    const lidMesh = new THREE.Mesh(lidGeo, boxMat);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    const lidRibVGeo = new THREE.BoxGeometry(ribbonW, lidHeight + 0.01, lidSize + ribbonThick);
    const lidRibVMesh = new THREE.Mesh(lidRibVGeo, ribbonMat);
    lidGroup.add(lidRibVMesh);

    const lidRibHGeo = new THREE.BoxGeometry(lidSize + ribbonThick, lidHeight + 0.01, ribbonW);
    const lidRibHMesh = new THREE.Mesh(lidRibHGeo, ribbonMat);
    lidGroup.add(lidRibHMesh);

    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, lidHeight / 2 + 0.02, 0);

    const loopGeo = new THREE.TorusGeometry(0.24, 0.055, 12, 32, Math.PI * 1.5);
    const bowAngles = [
      { rx: Math.PI / 2, ry: 0.4, rz: Math.PI / 4, px: -0.16, py: 0.12, pz: 0 },
      { rx: Math.PI / 2, ry: -0.4, rz: -Math.PI / 4, px: 0.16, py: 0.12, pz: 0 },
      { rx: Math.PI / 2, ry: 0.4, rz: -Math.PI / 4, px: 0, py: 0.12, pz: -0.16 },
      { rx: Math.PI / 2, ry: -0.4, rz: Math.PI / 4, px: 0, py: 0.12, pz: 0.16 },
    ];

    bowAngles.forEach(({ rx, ry, rz, px, py, pz }) => {
      const loop = new THREE.Mesh(loopGeo, ribbonMat);
      loop.rotation.set(rx, ry, rz);
      loop.position.set(px, py, pz);
      bowGroup.add(loop);
    });

    const knotGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const knotMesh = new THREE.Mesh(knotGeo, goldMat);
    knotMesh.position.set(0, 0.1, 0);
    bowGroup.add(knotMesh);

    lidGroup.add(bowGroup);

    const closedLidY = boxHeight / 2 + lidHeight / 2;
    lidGroup.position.set(0, closedLidY, 0);
    rootGroup.add(lidGroup);

    // 6. Dynamic 3D Story Card with Integrated Moving Text ("test b ak image card k ander move kry")
    const createStoryCardTexture = (name: string, sender: string, msg: string, style: string) => {
      const finalRecipient = (name && name.trim()) || 'Sarah';
      const finalSender = (sender && sender.trim()) || 'Ahmad';
      const finalMsg =
        (msg && msg.trim()) ||
        'Wishing you moments of pure happiness, laughter with friends, and peace in your heart.';

      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1280;
      const ctx = canvas.getContext('2d')!;

      // Premium card background: Dark luxury parchment with subtle gold sheen
      const grad = ctx.createLinearGradient(0, 0, 1024, 1280);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.3, '#FAF7F2');
      grad.addColorStop(0.7, '#F7F2EA');
      grad.addColorStop(1, '#EDE6D8');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 1280);

      // Outer gold filigree frame
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 16;
      ctx.strokeRect(32, 32, 960, 1216);

      ctx.strokeStyle = '#F3E5AB';
      ctx.lineWidth = 4;
      ctx.strokeRect(52, 52, 920, 1176);

      // Decorative corner flourishes
      ctx.fillStyle = '#D4AF37';
      ctx.font = '36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨', 80, 95);
      ctx.fillText('✨', 944, 95);
      ctx.fillText('✨', 80, 1205);
      ctx.fillText('✨', 944, 1205);

      // Top Tag Badge
      ctx.fillStyle = '#6D28D9';
      ctx.beginPath();
      ctx.roundRect(312, 110, 400, 60, 30);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 26px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`✨ FOR ${finalRecipient.toUpperCase()} ✨`, 512, 150);

      // Recipient Large Greeting
      ctx.fillStyle = '#18181B';
      ctx.font = 'bold 46px Georgia, serif';
      ctx.fillText(`Dearest ${finalRecipient}`, 512, 240);

      // Gold divider with heart
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(250, 280);
      ctx.lineTo(470, 280);
      ctx.moveTo(554, 280);
      ctx.lineTo(774, 280);
      ctx.stroke();

      ctx.font = '28px sans-serif';
      ctx.fillText('❤️', 512, 290);

      // Message Body (Auto-wrapped with high legibility)
      const font =
        style === 'handwritten'
          ? 'italic 44px "Caveat", cursive, Georgia, serif'
          : style === 'editorial'
          ? 'italic 38px "Playfair Display", Georgia, serif'
          : '36px system-ui, -apple-system, sans-serif';

      ctx.font = font;
      ctx.fillStyle = '#18181B';
      ctx.textAlign = 'center';

      const words = finalMsg.split(' ');
      let line = '';
      let y = 380;
      const lineHeight = 62;
      const maxLineWidth = 820;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxLineWidth && n > 0) {
          ctx.fillText(line.trim(), 512, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line.trim(), 512, y);

      // Lower decorative seal
      ctx.font = 'bold 30px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#52525B';
      ctx.fillText('With all my love,', 512, 1080);

      ctx.font = 'bold 44px Georgia, serif';
      ctx.fillStyle = '#6D28D9';
      ctx.fillText(finalSender, 512, 1145);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    let storyCardTexture = createStoryCardTexture(
      stateRef.current.recipientName,
      stateRef.current.senderName,
      stateRef.current.message,
      stateRef.current.fontStyle
    );

    // Card 0: The Story / Message Card (Double-sided so front and back are identical & non-mirrored!)
    const storyCardGroup = new THREE.Group();
    storyCardGroup.name = 'card_0';
    rootGroup.add(storyCardGroup);

    const cardW = 1.35;
    const cardH = 1.7;
    const cardPlaneGeo = new THREE.PlaneGeometry(cardW, cardH);
    const cardMat = new THREE.MeshStandardMaterial({
      map: storyCardTexture,
      roughness: 0.3,
      metalness: 0.05,
      side: THREE.FrontSide,
    });

    // Front face
    const cardMeshFront = new THREE.Mesh(cardPlaneGeo, cardMat);
    cardMeshFront.position.z = 0.015;
    cardMeshFront.castShadow = true;
    storyCardGroup.add(cardMeshFront);

    // Back face with flipped UV coordinates so the text is fully legible and not mirrored!
    const backPlaneGeo = cardPlaneGeo.clone();
    const uvAttr = backPlaneGeo.attributes.uv;
    for (let i = 0; i < uvAttr.count; i++) {
      uvAttr.setX(i, 1 - uvAttr.getX(i));
    }
    uvAttr.needsUpdate = true;

    const cardMeshBack = new THREE.Mesh(backPlaneGeo, cardMat);
    cardMeshBack.position.z = -0.015;
    cardMeshBack.rotation.y = Math.PI;
    storyCardGroup.add(cardMeshBack);

    // Gold Bevel Edge Frame
    const cardBevelGeo = new THREE.BoxGeometry(cardW + 0.03, cardH + 0.03, 0.026);
    const cardBevelMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.2,
      metalness: 0.9,
    });
    const cardBevelMesh = new THREE.Mesh(cardBevelGeo, cardBevelMat);
    cardBevelMesh.position.z = 0;
    storyCardGroup.add(cardBevelMesh);

    storyCardGroup.scale.set(0.01, 0.01, 0.01);
    storyCardGroup.position.set(0, 0, 0);

    // 7. 3D Photo Memory Cards
    const photosGroup = new THREE.Group();
    rootGroup.add(photosGroup);

    interface PhotoMeshObject {
      group: THREE.Group;
      idx: number;
    }

    const photoMeshes: PhotoMeshObject[] = [];

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const rebuildPhotoCards = (urls: string[]) => {
      while (photosGroup.children.length > 0) {
        photosGroup.remove(photosGroup.children[0]);
      }
      photoMeshes.length = 0;

      if (!urls || urls.length === 0) return;

      urls.forEach((url, i) => {
        const pGroup = new THREE.Group();
        pGroup.name = `card_${i + 1}`;

        // Create fallback texture
        const createFbTex = () => {
          const c = document.createElement('canvas');
          c.width = 512;
          c.height = 512;
          const ctx = c.getContext('2d')!;
          const g = ctx.createLinearGradient(0, 0, 512, 512);
          g.addColorStop(0, i % 2 === 0 ? '#8B5CF6' : '#EC4899');
          g.addColorStop(1, i % 2 === 0 ? '#3B82F6' : '#F59E0B');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, 512, 512);
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 40px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('✨ Cherished Memory', 256, 230);
          ctx.font = 'bold 30px sans-serif';
          ctx.fillText(`#${i + 1}`, 256, 290);
          const t = new THREE.CanvasTexture(c);
          t.colorSpace = THREE.SRGBColorSpace;
          return t;
        };

        const initialTex = createFbTex();
        const pMat = new THREE.MeshStandardMaterial({
          map: initialTex,
          roughness: 0.35,
          metalness: 0.05,
          side: THREE.FrontSide,
        });

        try {
          loader.load(
            url,
            (loadedTex) => {
              loadedTex.colorSpace = THREE.SRGBColorSpace;
              pMat.map = loadedTex;
              pMat.needsUpdate = true;
            },
            undefined,
            () => {
              // fallback is already assigned
            }
          );
        } catch {
          // fallback is already assigned
        }

        // Polaroid Frame Mesh
        const pFrameW = 1.35;
        const pFrameH = 1.7;
        const pFrameGeo = new THREE.BoxGeometry(pFrameW, pFrameH, 0.025);
        const pFrameMat = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.2,
          metalness: 0.05,
        });
        const pFrameMesh = new THREE.Mesh(pFrameGeo, pFrameMat);
        pFrameMesh.castShadow = true;
        pGroup.add(pFrameMesh);

        // Front Photo Mesh
        const pGeo = new THREE.PlaneGeometry(1.2, 1.25);
        const pMeshFront = new THREE.Mesh(pGeo, pMat);
        pMeshFront.position.set(0, 0.12, 0.015);
        pGroup.add(pMeshFront);

        // Back Photo Mesh (Identical photo visible from back, non-mirrored UVs!)
        const pGeoBack = pGeo.clone();
        const pBackUv = pGeoBack.attributes.uv;
        for (let u = 0; u < pBackUv.count; u++) {
          pBackUv.setX(u, 1 - pBackUv.getX(u));
        }
        pBackUv.needsUpdate = true;

        const pMeshBack = new THREE.Mesh(pGeoBack, pMat);
        pMeshBack.position.set(0, 0.12, -0.015);
        pMeshBack.rotation.y = Math.PI;
        pGroup.add(pMeshBack);

        // Memory caption text bar on polaroid bottom
        const capCanvas = document.createElement('canvas');
        capCanvas.width = 512;
        capCanvas.height = 128;
        const capCtx = capCanvas.getContext('2d')!;
        capCtx.fillStyle = '#FFFFFF';
        capCtx.fillRect(0, 0, 512, 128);
        capCtx.fillStyle = '#18181B';
        capCtx.font = 'bold 30px system-ui, -apple-system, sans-serif';
        capCtx.textAlign = 'center';
        capCtx.fillText(`❤️ Memory #${i + 1}`, 256, 75);
        const capTex = new THREE.CanvasTexture(capCanvas);
        capTex.colorSpace = THREE.SRGBColorSpace;

        const capGeo = new THREE.PlaneGeometry(1.15, 0.22);
        const capMat = new THREE.MeshBasicMaterial({ map: capTex, side: THREE.FrontSide });
        
        // Front caption
        const capMeshFront = new THREE.Mesh(capGeo, capMat);
        capMeshFront.position.set(0, -0.66, 0.015);
        pGroup.add(capMeshFront);

        // Back caption (Identical caption on back with flipped UVs!)
        const capGeoBack = capGeo.clone();
        const capBackUv = capGeoBack.attributes.uv;
        for (let u = 0; u < capBackUv.count; u++) {
          capBackUv.setX(u, 1 - capBackUv.getX(u));
        }
        capBackUv.needsUpdate = true;

        const capMeshBack = new THREE.Mesh(capGeoBack, capMat);
        capMeshBack.position.set(0, -0.66, -0.015);
        capMeshBack.rotation.y = Math.PI;
        pGroup.add(capMeshBack);

        // Gold Heart Pin at top
        const pinGeo = new THREE.SphereGeometry(0.045, 12, 12);
        const pinMesh = new THREE.Mesh(pinGeo, goldMat);
        pinMesh.position.set(0, 0.74, 0.03);
        pGroup.add(pinMesh);

        pGroup.scale.set(0.01, 0.01, 0.01);
        pGroup.position.set(0, 0, 0);

        photosGroup.add(pGroup);
        photoMeshes.push({ group: pGroup, idx: i + 1 });
      });
    };

    rebuildPhotoCards(stateRef.current.photos);

    // 8. 3D Audio Visualizer Record / Disc
    const audioGroup = new THREE.Group();
    rootGroup.add(audioGroup);

    const discRadius = 0.52;
    const discGeo = new THREE.CylinderGeometry(discRadius, discRadius, 0.025, 36);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x1f1929,
      roughness: 0.2,
      metalness: 0.9,
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.rotation.x = Math.PI / 2;
    audioGroup.add(discMesh);

    const labelGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.03, 24);
    const labelMesh = new THREE.Mesh(labelGeo, goldMat);
    labelMesh.rotation.x = Math.PI / 2;
    audioGroup.add(labelMesh);

    const waveCount = 18;
    const waveBars: THREE.Mesh[] = [];
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      roughness: 0.2,
      metalness: 0.7,
      emissive: new THREE.Color(0x6d28d9),
      emissiveIntensity: 0.6,
    });

    for (let w = 0; w < waveCount; w++) {
      const angle = (w / waveCount) * Math.PI * 2;
      const barGeo = new THREE.BoxGeometry(0.035, 0.15, 0.03);
      const barMesh = new THREE.Mesh(barGeo, waveMat);
      barMesh.position.set(Math.cos(angle) * (discRadius + 0.11), Math.sin(angle) * (discRadius + 0.11), 0);
      barMesh.rotation.z = angle + Math.PI / 2;
      audioGroup.add(barMesh);
      waveBars.push(barMesh);
    }

    audioGroup.position.set(0, 0, 0);
    audioGroup.scale.set(0.01, 0.01, 0.01);

    // 9. Dynamic Themed Particles
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 4.5;
      particlePositions[i * 3 + 1] = Math.random() * 4.0 - 0.8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.007,
        y: Math.random() * 0.014 + 0.005,
        z: (Math.random() - 0.5) * 0.007,
      });
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd8b4fe,
      size: 0.095,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 10. Pointer Drag & Orbit Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      if (isDragging) {
        const deltaX = clientX - prevPointerX;
        const deltaY = clientY - prevPointerY;
        targetRotY += deltaX * 0.012;
        targetRotX += deltaY * 0.008;
        targetRotX = Math.max(-0.55, Math.min(0.55, targetRotX));
        prevPointerX = clientX;
        prevPointerY = clientY;
      } else {
        const rect = container.getBoundingClientRect();
        mouseX = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouseCoord, camera);
      const intersects = raycaster.intersectObjects(rootGroup.children, true);

      if (intersects.length > 0) {
        if (!stateRef.current.isOpened) {
          if (onOpen) onOpen();
          return;
        }

        // Raycasting against cards
        for (const hit of intersects) {
          if (storyCardGroup.children.includes(hit.object as any)) {
            if (onSelectCard) onSelectCard(0);
            return;
          }
          for (const pm of photoMeshes) {
            if (pm.group.children.includes(hit.object as any)) {
              if (onSelectCard) onSelectCard(pm.idx);
              return;
            }
          }
          if (audioGroup.children.includes(hit.object as any) && onToggleAudio) {
            onToggleAudio();
            return;
          }
        }
      }
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', onPointerDown);
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
    canvas.addEventListener('click', handleClick);

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      width = container.clientWidth || 380;
      height = container.clientHeight || 340;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(container);

    // 11. Physics & Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    let lidCurrentY = closedLidY;
    let lidCurrentRotX = 0;
    let lidCurrentRotZ = 0;

    let prevPhotosList = stateRef.current.photos;
    let prevMsg = stateRef.current.message;
    let prevRecipient = stateRef.current.recipientName;
    let prevSender = stateRef.current.senderName;
    let prevBgTheme = stateRef.current.bgThemeId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const current = stateRef.current;

      // Update Theme Colors reactively
      const activeTheme = BG_THEMES.find((t) => t.id === current.bgThemeId) || BG_THEMES[0];
      if (current.bgThemeId !== prevBgTheme) {
        prevBgTheme = current.bgThemeId;
        particleMat.color.setHex(activeTheme.particleColor);
        keyLight.color.setHex(activeTheme.lightKey);
        rimLight.color.setHex(activeTheme.lightRim);
      }

      boxMat.color.lerp(new THREE.Color(current.boxColor), 0.1);
      ribbonMat.color.lerp(new THREE.Color(current.ribbonColor), 0.1);

      if (current.photos !== prevPhotosList) {
        prevPhotosList = current.photos;
        rebuildPhotoCards(current.photos);
      }

      if (
        current.message !== prevMsg ||
        current.recipientName !== prevRecipient ||
        current.senderName !== prevSender
      ) {
        prevMsg = current.message;
        prevRecipient = current.recipientName;
        prevSender = current.senderName;
        storyCardTexture.dispose();
        storyCardTexture = createStoryCardTexture(
          current.recipientName,
          current.senderName,
          current.message,
          current.fontStyle
        );
        const updatedMat = new THREE.MeshStandardMaterial({
          map: storyCardTexture,
          roughness: 0.3,
          metalness: 0.05,
          side: THREE.FrontSide,
        });
        cardMeshFront.material = updatedMat;
        cardMeshBack.material = updatedMat;
      }

      // Smooth camera orbit
      if (!isDragging) {
        if (!current.isOpened) {
          targetRotY += 0.0035;
        } else {
          // When opened: keep cards facing the viewer! Do not continuously spin to the back!
          // Smoothly settle towards front-facing angle with subtle gentle floating
          targetRotY += (0 - targetRotY) * 0.05;
          targetRotX += (0 - targetRotX) * 0.05;
        }
      }
      rootGroup.rotation.y += (targetRotY + mouseX * 0.22 - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (targetRotX - mouseY * 0.14 - rootGroup.rotation.x) * 0.08;

      // A. GIFT BOX REMOVAL ON OPEN ("jb box open ho to box remove ho jay")
      const levitate = Math.sin(elapsedTime * 2.2) * 0.08;

      if (current.isOpened) {
        // Box & Lid smoothly shrink to 0 and sink down, completely disappearing!
        boxGroup.scale.lerp(new THREE.Vector3(0.0001, 0.0001, 0.0001), 0.12);
        boxGroup.position.y += (-4.0 - boxGroup.position.y) * 0.12;
        if (boxGroup.scale.x < 0.04) {
          boxGroup.visible = false;
        }

        lidGroup.scale.lerp(new THREE.Vector3(0.0001, 0.0001, 0.0001), 0.12);
        lidGroup.position.y += (-4.0 - lidGroup.position.y) * 0.12;
        if (lidGroup.scale.x < 0.04) {
          lidGroup.visible = false;
        }

        innerLight.intensity += (0 - innerLight.intensity) * 0.1;
      } else {
        boxGroup.visible = true;
        lidGroup.visible = true;
        // Box & Lid smoothly scale back in when wrapped!
        boxGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        boxGroup.position.y += (levitate - boxGroup.position.y) * 0.1;

        lidGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
        lidGroup.position.y = closedLidY + levitate;
        lidGroup.rotation.set(0, 0, 0);

        innerLight.intensity += (0 - innerLight.intensity) * 0.1;
      }

      // B. UNIFIED 3D CARDS DECK ANIMATION ("just images card move kry r test b ak image card k ander move kry")
      // Total cards in deck: Card 0 = Story Card with text, Cards 1..N = Photo cards
      const activeIdx = current.activeCardIdx;
      const totalCards = 1 + photoMeshes.length;

      // Card 0 (Story Message Card)
      if (!current.isOpened) {
        storyCardGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.12);
        storyCardGroup.position.set(0, 0, 0);
      } else {
        const isStoryActive = activeIdx === 0;
        let sTargetX = 0;
        let sTargetY = 0.35 + Math.sin(elapsedTime * 1.8) * 0.06;
        let sTargetZ = 1.45;
        let sTargetScale = 1.35; // Larger hero size!
        let sTargetRotY = Math.sin(elapsedTime * 1.3) * 0.05;

        if (totalCards > 1) {
          if (isStoryActive) {
            // Front & center hero!
            sTargetX = 0;
            sTargetY = 0.35 + Math.sin(elapsedTime * 2.0) * 0.06;
            sTargetZ = 1.5;
            sTargetScale = 1.35;
            sTargetRotY = 0;
          } else {
            // Stepped back into the carousel arc
            const offset = 0 - activeIdx;
            sTargetX = offset * 1.35;
            sTargetY = 0.15 - Math.abs(offset) * 0.12;
            sTargetZ = 0.35 - Math.abs(offset) * 0.35;
            sTargetScale = 0.85;
            sTargetRotY = -offset * 0.3;
          }
        }

        storyCardGroup.position.x += (sTargetX - storyCardGroup.position.x) * 0.09;
        storyCardGroup.position.y += (sTargetY - storyCardGroup.position.y) * 0.09;
        storyCardGroup.position.z += (sTargetZ - storyCardGroup.position.z) * 0.09;
        storyCardGroup.scale.lerp(new THREE.Vector3(sTargetScale, sTargetScale, sTargetScale), 0.09);
        storyCardGroup.rotation.y += (sTargetRotY - storyCardGroup.rotation.y) * 0.09;
      }

      // Cards 1..N (Photo Cards)
      photoMeshes.forEach((pm) => {
        const i = pm.idx; // 1, 2, 3...
        const isPhotoActive = i === activeIdx;

        if (!current.isOpened) {
          pm.group.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.12);
          pm.group.position.set(0, 0, 0);
        } else {
          let pTargetX = 0;
          let pTargetY = 0.35 + Math.sin(elapsedTime * 1.8 + i) * 0.06;
          let pTargetZ = 1.45;
          let pTargetScale = 1.35;
          let pTargetRotY = 0;

          if (isPhotoActive) {
            pTargetX = 0;
            pTargetY = 0.35 + Math.sin(elapsedTime * 2.0 + i) * 0.06;
            pTargetZ = 1.5;
            pTargetScale = 1.35; // Enlarged in 3D!
            pTargetRotY = 0;
          } else {
            const offset = i - activeIdx;
            pTargetX = offset * 1.35;
            pTargetY = 0.15 - Math.abs(offset) * 0.12;
            pTargetZ = 0.35 - Math.abs(offset) * 0.35;
            pTargetScale = 0.85;
            pTargetRotY = -offset * 0.3;
          }

          pm.group.position.x += (pTargetX - pm.group.position.x) * 0.09;
          pm.group.position.y += (pTargetY - pm.group.position.y) * 0.09;
          pm.group.position.z += (pTargetZ - pm.group.position.z) * 0.09;
          pm.group.scale.lerp(new THREE.Vector3(pTargetScale, pTargetScale, pTargetScale), 0.09);
          pm.group.rotation.y += (pTargetRotY - pm.group.rotation.y) * 0.09;
        }
      });

      // C. 3D Audio Visualizer Disc & Waves Animation
      if (current.hasVoice && current.isOpened) {
        const targetAudioScale = 0.8;
        const targetAudioX = -1.65;
        const targetAudioY = 0.1 + Math.sin(elapsedTime * 2.5) * 0.05;
        const targetAudioZ = 0.7;

        audioGroup.scale.lerp(new THREE.Vector3(targetAudioScale, targetAudioScale, targetAudioScale), 0.08);
        audioGroup.position.x += (targetAudioX - audioGroup.position.x) * 0.08;
        audioGroup.position.y += (targetAudioY - audioGroup.position.y) * 0.08;
        audioGroup.position.z += (targetAudioZ - audioGroup.position.z) * 0.08;

        if (current.isPlayingAudio) {
          discMesh.rotation.z += 0.04;
          labelMesh.rotation.z += 0.04;
        }

        waveBars.forEach((bar, bIdx) => {
          const h = current.isPlayingAudio
            ? 0.15 + (Math.sin(elapsedTime * 12 + bIdx * 0.8) + 1) * 0.25
            : 0.12;
          bar.scale.y += (h - bar.scale.y) * 0.18;
        });
      } else {
        audioGroup.scale.lerp(new THREE.Vector3(0.001, 0.001, 0.001), 0.1);
      }

      // D. Themed Particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const speedMult = current.isOpened ? 2.0 : 1.0;

      for (let p = 0; p < particleCount; p++) {
        posArray[p * 3 + 1] += particleVelocities[p].y * speedMult;
        posArray[p * 3] += Math.sin(elapsedTime * 1.5 + p) * 0.003;

        if (posArray[p * 3 + 1] > 3.6) {
          posArray[p * 3 + 1] = -0.8;
          posArray[p * 3] = (Math.random() - 0.5) * 4.5;
          posArray[p * 3 + 2] = (Math.random() - 0.5) * 4.5;
        }
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', onPointerDown);
      canvas.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('touchend', onPointerUp);
      canvas.removeEventListener('click', handleClick);

      baseGeo.dispose();
      liningGeo.dispose();
      ribVGeo.dispose();
      ribHGeo.dispose();
      lidGeo.dispose();
      lidRibVGeo.dispose();
      lidRibHGeo.dispose();
      loopGeo.dispose();
      knotGeo.dispose();
      cardPlaneGeo.dispose();
      backPlaneGeo.dispose();
      cardBevelGeo.dispose();
      discGeo.dispose();
      labelGeo.dispose();
      particleGeo.dispose();

      boxMat.dispose();
      liningMat.dispose();
      ribbonMat.dispose();
      goldMat.dispose();
      cardMat.dispose();
      cardBevelMat.dispose();
      discMat.dispose();
      particleMat.dispose();
      storyCardTexture.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
    />
  );
};
