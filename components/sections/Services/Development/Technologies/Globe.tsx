'use client';

import { useScheme, useTheme } from '@/hooks/theme';
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import GlobeDark from '@/public/assets/images/globe-map-dark.webp';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import HTMLComment from '@/components/ui/HTMLComment';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useUnmount } from '@/hooks/useUnmount';
import { useDebounceValue } from '@/hooks/useDebounceValue';

type GlobeUtils = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  globe: THREE.Mesh;
};

type RenderParams = {
  renderer: THREE.WebGLRenderer | null;
  rendered: boolean;
  renderedScheme: string;
  renderedPalette: string;
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

  const [debouncedPaletteColor] = useDebounceValue(hexCode, 250);
  const [debouncedShade] = useDebounceValue(resolvedTheme, 250);

  // Current state of render
  const [
    { renderedPalette, rendered, renderer, renderedScheme },
    setRenderParams,
  ] = useState<RenderParams>({
    renderer: null,
    rendered: false,
    renderedScheme: '',
    renderedPalette: '',
  });

  const isMobile = useMediaQuery('(max-width: 768px)');

  const renderScene = useCallback(async (): Promise<GlobeUtils | void> => {
    const container = containerRef.current;

    if (!container || !resolvedTheme || !paletteIsFullfiled) return;

    const {
      renderer: newRenderer,
      scene,
      camera,
      globe,
    } = await new Promise<GlobeUtils>((resolve) => {
      // #region Initialize ThreeJs utils

      // Create the WebGL renderer with transparency (alpha: true)
      const renderer = new THREE.WebGLRenderer({ alpha: true });

      // Initialize the Three.js scene
      const scene = new THREE.Scene();

      // Configure the camera with a perspective projection
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = 165; // Adjust the z-position for the desired view

      const material = new THREE.MeshBasicMaterial({ transparent: true });

      // Initialize the sphere globe
      const geometry = new THREE.SphereGeometry(100, 32, 16);
      const globe = new THREE.Mesh(geometry, material);

      const textureLoader = new THREE.TextureLoader();
      // #endregion

      renderer.setPixelRatio(
        isMobile
          ? Math.min(2, window.devicePixelRatio)
          : window.devicePixelRatio
      );
      // Ensure smooth rendering on high-DPI screens
      renderer.setClearColor(
        resolvedTheme === 'dark' ? palette[200] : palette[50]
      );
      container.appendChild(renderer.domElement);

      scene.add(globe);

      // Load and apply the texture to the globe
      textureLoader.load(
        GlobeDark.src, // Texture
        (texture) => {
          // Set texture properties for improved rendering
          if (!isMobile)
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          globe.material.map = texture;

          globe.material.needsUpdate = true;

          resolve({ renderer, scene, camera, globe });
        },
        undefined,
        (error) => console.error('Failed to load texture:', error)
      );
    });

    // Resize renderer and update camera aspect ratio
    const resizeRenderer = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      newRenderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // Initialize renderer size on mount
    resizeRenderer();

    // Animation loop
    const animate = () => {
      globe.rotation.y += 0.002; // Control rotation speed
      newRenderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Store globe construction params
    setRenderParams({
      rendered: true,
      renderedPalette: hexCode,
      renderer: newRenderer,
      renderedScheme: resolvedTheme,
    });

    return { renderer: newRenderer, scene, camera, globe };
  }, [isMobile, palette, hexCode, resolvedTheme, paletteIsFullfiled]);

  // DOM and renderer cleanup
  const cleanup = useCallback(() => {
    if (!containerRef.current || !renderer) return;

    const container = containerRef?.current;

    renderer?.dispose();
    setRenderParams((prev) => ({ ...prev, renderer: null }));
    container.removeChild(renderer.domElement);
  }, [renderer]);

  // First render
  useEffect(() => {
    if (rendered || !containerRef?.current) return;

    renderScene();

    return () => cleanup();
  }, [renderScene, rendered, renderer, cleanup]);

  // Re render management
  useEffect(() => {
    const hasToReRender =
      renderer &&
      rendered &&
      (renderedPalette !== debouncedPaletteColor ||
        renderedScheme !== debouncedShade);

    if (hasToReRender) {
      cleanup();

      renderScene();
    }
  }, [
    renderScene,
    rendered,
    renderedPalette,
    renderedScheme,
    cleanup,
    renderer,
    debouncedPaletteColor,
    debouncedShade,
  ]);

  return (
    <div
      ref={containerRef}
      id='3d-globe'
      className={cn('size-full aspect-square rounded-full', className)}
    >
      <HTMLComment text='Props to sohrabzia https://codepen.io/sohrabzia' />
    </div>
  );
});

export default Globe;
