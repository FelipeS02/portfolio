'use client';

import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';

import * as THREE from 'three';
import { WebGPURenderer } from 'three/webgpu';
import { useDebounceValue, useMediaQuery } from 'usehooks-ts';

import HTMLComment from '@/components/ui/html-comment';
import GlobeTexture from '@/public/assets/images/globe.png';
import GlobeMobileTexture from '@/public/assets/images/globe_mobile.png';

import { cn } from '@/lib/utils';
import { useScheme, useTheme } from '@/hooks/theme';

type GlobeUtils = {
  renderer: THREE.WebGLRenderer | WebGPURenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  globe: THREE.Mesh;
};

type RenderParams = {
  renderer: THREE.WebGLRenderer | WebGPURenderer | null;
  rendered: boolean;
  renderedScheme: string;
  renderedPalette: string;
};

const renderParamsInitialState = {
  renderer: null,
  rendered: false,
  renderedScheme: '',
  renderedPalette: '',
};

async function isWebGPUSupported() {
  try {
    if (typeof WebGPURenderer !== 'undefined' && navigator.gpu) {
      const adapter = await navigator.gpu.requestAdapter();
      return !!adapter;
    }
    return false;
  } catch {
    return false;
  }
}

const Globe: FC<{ className?: string }> = memo(function Globe({
  className = '',
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useScheme();

  const {
    palette: { hex: palette },
    hexCode,
    fullfiled: isPaletteFullfilled,
  } = useTheme();

  const [debouncedPaletteColor] = useDebounceValue(hexCode, 2000);
  const [debouncedScheme] = useDebounceValue(resolvedTheme, 500);

  // Current state of render
  const [
    { renderedPalette, rendered, renderer, renderedScheme },
    setRenderParams,
  ] = useState<RenderParams>(renderParamsInitialState);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const setGlobeColor = useCallback(
    (renderer: RenderParams['renderer']) => {
      if (!renderer || !isPaletteFullfilled) return;

      renderer.setClearColor(new THREE.Color(palette[100]));
    },
    [palette, isPaletteFullfilled],
  );

  const renderScene = useCallback(async (): Promise<GlobeUtils | void> => {
    const container = containerRef.current;

    if (!container || !resolvedTheme) return;

    const {
      renderer: newRenderer,
      scene,
      camera,
      globe,
    } = await new Promise<GlobeUtils>(async (resolve, reject) => {
      try {
        // 1. Create render by disponibility
        let renderer: THREE.WebGLRenderer | WebGPURenderer;

        if (await isWebGPUSupported()) {
          renderer = new WebGPURenderer({ alpha: true, antialias: true });
          await renderer.init();
        } else {
          renderer = new THREE.WebGLRenderer({ alpha: true });
        }

        // 2. Initial config
        renderer.setPixelRatio(window.devicePixelRatio);

        setGlobeColor(renderer);

        container.appendChild(renderer.domElement);

        // 3. Three.JS Settings
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(73, 1, 0.1, 1000);
        camera.position.z = 165;

        const material = new THREE.MeshBasicMaterial({
          transparent: true,
        });

        const geometry = new THREE.SphereGeometry(100, 32, 16);

        const globe = new THREE.Mesh(geometry, material);

        // 4. Texture loading
        const textureLoader = new THREE.TextureLoader();

        const texture = await new Promise<THREE.Texture>((resolve, reject) => {
          textureLoader.load(
            !isMobile ? GlobeTexture.src : GlobeMobileTexture.src,
            resolve,
            undefined,
            () => reject(new Error('Error loading texture')),
          );
        });

        // 5. Aditional tweakings for faster devices
        if (!isMobile) {
          if (renderer instanceof THREE.WebGLRenderer) {
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            globe.material.blending = THREE.SubtractiveBlending;
          }

          if (renderer instanceof WebGPURenderer) {
            texture.anisotropy = renderer.getMaxAnisotropy();
          }

          texture.generateMipmaps = false;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
        }

        globe.material.map = texture;

        globe.material.needsUpdate = true;

        scene.add(globe);

        resolve({ renderer, scene, camera, globe });
      } catch (error) {
        reject(error);
      }
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

    const animate = () => {
      globe.rotation.y += 0.002;
      if (newRenderer instanceof WebGPURenderer) {
        newRenderer.renderAsync(scene, camera);
      } else {
        newRenderer.render(scene, camera);
      }
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
  }, [isMobile, hexCode, resolvedTheme, setGlobeColor]);

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
    if (rendered || !containerRef?.current || !isPaletteFullfilled) return;

    renderScene();

    return () => cleanup();
  }, [renderScene, cleanup, rendered, isPaletteFullfilled]);

  // Re render management
  useEffect(() => {
    const hasToReRender =
      renderer &&
      (renderedPalette !== debouncedPaletteColor ||
        renderedScheme !== debouncedScheme);

    if (hasToReRender) setGlobeColor(renderer);
  }, [
    renderedPalette,
    renderedScheme,
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
