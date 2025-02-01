'use client';

import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import * as THREE from 'three';
import { useDebounceValue } from 'usehooks-ts';

import HTMLComment from '@/components/ui/html-comment';
import GlobeTexture from '@/public/assets/images/globe.png';
import GlobeMobileTexture from '@/public/assets/images/globe_mobile.png';

import { mediaQueryMatches } from '@/lib/dom';
import { cn } from '@/lib/utils';
import { useScheme, useTheme } from '@/hooks/theme';

type GlobeUtils = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  globe: THREE.Mesh;
};

type RenderParams = {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  globe: THREE.Mesh | null;
  rendered: boolean;
  renderedPalette: string;
};

const renderParamsInitialState: RenderParams = {
  renderer: null,
  camera: null,
  globe: null,
  scene: null,
  rendered: false,
  renderedPalette: '',
};

const Globe: FC<{ className?: string }> = memo(function Globe({
  className = '',
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useScheme();

  const {
    palette: { hex: palette },
    hexCode,
    fullfiled: paletteIsFullfiled,
  } = useTheme();

  const [debouncedPaletteColor] = useDebounceValue(hexCode, 2000);
  const [debouncedScheme] = useDebounceValue(resolvedTheme, 500);

  // Current state of render
  const [{ renderedPalette, rendered, renderer }, setRenderParams] =
    useState<RenderParams>(renderParamsInitialState);

  const setGlobeColor = useCallback(
    (renderer: RenderParams['renderer']) => {
      if (!renderer || !paletteIsFullfiled) return;

      renderer.setClearColor(palette[100], 0.9);
    },
    [palette, paletteIsFullfiled],
  );

  const renderScene = useCallback(async (): Promise<GlobeUtils | void> => {
    const container = containerRef.current;

    if (!container) return;

    const props = await new Promise<GlobeUtils>((resolve) => {
      // #region Initialize ThreeJs utils

      // Create the WebGL renderer with transparency (alpha: true)
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });

      // Initialize the Three.js scene
      const scene = new THREE.Scene();

      // Configure the camera with a perspective projection
      const camera = new THREE.PerspectiveCamera(73, 1, 0.1, 1000);
      camera.position.z = 165; // Adjust the z-position for the desired view

      const material = new THREE.MeshBasicMaterial({ transparent: true });

      // Initialize the sphere globe
      const geometry = new THREE.SphereGeometry(100, 32, 16);
      const globe = new THREE.Mesh(geometry, material);

      const textureLoader = new THREE.TextureLoader();
      // #endregion

      // Ensure smooth rendering on high-DPI screens
      renderer.setPixelRatio(window.devicePixelRatio);

      setGlobeColor(renderer);

      container.appendChild(renderer.domElement);

      scene.add(globe);

      const isMobile = mediaQueryMatches('(max-width: 768px)');

      // Load and apply the texture to the globe
      textureLoader.load(
        // Get smaller texture source to smaller devices
        !isMobile ? GlobeTexture.src : GlobeMobileTexture.src,
        (texture) => {
          // Desktop tweaks
          if (!isMobile) {
            // Set texture properties for improved rendering
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

            // Disable mipmaps for sharper look at the cost of performance
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;

            globe.material.blending = THREE.SubtractiveBlending;
          }

          globe.material.map = texture;

          globe.material.needsUpdate = true;

          resolve({ renderer, scene, camera, globe });
        },
        undefined,
        (error) => console.error('Failed to load texture:', error),
      );
    });

    // Resize renderer and update camera aspect ratio
    const resizeRenderer = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      props.renderer.setSize(width, height);
      props.camera.aspect = width / height;
      props.camera.updateProjectionMatrix();
    };

    // Initialize renderer size on mount
    resizeRenderer();

    // Animation loop
    const animate = () => {
      props.globe.rotation.y += 0.002; // Control rotation speed
      props.renderer.render(props.scene, props.camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Store globe construction params
    setRenderParams({
      ...props,
      rendered: true,
      renderedPalette: hexCode,
    });

    return props;
  }, [hexCode, setGlobeColor]);

  // DOM and renderer cleanup
  const cleanup = useCallback(() => {
    if (!containerRef.current || !renderer) return;

    const container = containerRef?.current;

    renderer?.dispose();

    setRenderParams(renderParamsInitialState);

    container.removeChild(renderer.domElement);
  }, [renderer]);

  // First render
  useEffect(() => {
    if (rendered || !containerRef?.current) return;

    renderScene();

    return () => cleanup();
  }, [renderScene, cleanup, rendered]);

  // Re render management
  useEffect(() => {
    const hasToReRender = renderer && renderedPalette !== debouncedPaletteColor;

    if (hasToReRender) setGlobeColor(renderer);
  }, [
    renderedPalette,
    debouncedPaletteColor,
    debouncedScheme,
    renderer,
    setGlobeColor,
  ]);

  return (
    <div
      ref={containerRef}
      id='globe'
      className={cn('aspect-square size-full rounded-full', className)}
    >
      <HTMLComment text='Props to sohrabzia https://codepen.io/sohrabzia' />
    </div>
  );
});

export default Globe;
