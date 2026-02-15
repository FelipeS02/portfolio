'use client';

import { FC, memo, useEffect, useEffectEvent, useRef } from 'react';

import * as THREE from 'three';
import { useDebounceValue } from 'usehooks-ts';

import HTMLComment from '@/components/common/html-comment';
import GlobeTexture from '@/public/assets/images/globe.png';
import GlobeMobileTexture from '@/public/assets/images/globe_mobile.png';

import { getOptimalPixelRatio, mediaQueryMatches } from '@/lib/dom';
import { cn } from '@/lib/utils';
import { useScheme, useTheme } from '@/hooks/theme';

type GlobeRefs = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  globe: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  animationFrameId: number;
};

const Globe: FC<{ className?: string }> = memo(function Globe({
  className = '',
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeRefs | null>(null);

  const { resolvedTheme } = useScheme();

  const {
    palette: { hex: palette },
    hexCode,
    fullfiled: paletteIsFullfiled,
  } = useTheme();

  const [debouncedPaletteColor] = useDebounceValue(hexCode, 2000);
  const [debouncedScheme] = useDebounceValue(resolvedTheme, 500);

  // Stable event handler that always reads the latest palette without being a dependency
  const applyGlobeColor = useEffectEvent(() => {
    const refs = globeRef.current;
    if (!refs || !paletteIsFullfiled) return;

    refs.renderer.setClearColor(palette[100], 1);
  });

  // Main initialization effect — runs once when palette is ready
  useEffect(() => {
    if (!containerRef.current || !paletteIsFullfiled) return;

    const container = containerRef.current;
    let cancelled = false;

    const renderScene = async () => {
      try {
        const props = await new Promise<Omit<GlobeRefs, 'animationFrameId'>>(
          (resolve, reject) => {
            try {
              const renderer = new THREE.WebGLRenderer({
                antialias: true,
              });

              const scene = new THREE.Scene();

              const camera = new THREE.PerspectiveCamera(73, 1, 0.1, 1000);
              camera.position.z = 165;

              const material = new THREE.MeshBasicMaterial({
                transparent: true,
              });
              const geometry = new THREE.SphereGeometry(100, 32, 16);
              const globe = new THREE.Mesh(geometry, material);

              const textureLoader = new THREE.TextureLoader();

              renderer.setPixelRatio(getOptimalPixelRatio(2));

              const isMobile = mediaQueryMatches('(max-width: 768px)');

              textureLoader.load(
                !isMobile ? GlobeTexture.src : GlobeMobileTexture.src,
                (texture) => {
                  // Bail out if component unmounted during load
                  if (cancelled) {
                    renderer.dispose();
                    geometry.dispose();
                    material.dispose();
                    texture.dispose();
                    return;
                  }

                  if (!isMobile) {
                    texture.anisotropy =
                      renderer.capabilities.getMaxAnisotropy();
                    texture.generateMipmaps = false;
                    texture.minFilter = THREE.LinearFilter;
                    texture.magFilter = THREE.LinearFilter;
                    material.blending = THREE.SubtractiveBlending;
                  }

                  material.map = texture;
                  material.needsUpdate = true;

                  scene.add(globe);

                  resolve({ renderer, scene, camera, globe });
                },
                undefined,
                (error) => {
                  renderer.dispose();
                  geometry.dispose();
                  material.dispose();
                  reject(error);
                },
              );
            } catch (error) {
              reject(error);
            }
          },
        );

        if (cancelled) {
          props.renderer.dispose();
          return;
        }

        container.appendChild(props.renderer.domElement);

        // Apply initial color
        applyGlobeColor();

        // Size renderer to container
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        props.renderer.setSize(width, height);
        props.camera.aspect = width / height;
        props.camera.updateProjectionMatrix();

        // Animation loop with cancellation
        const animate = () => {
          props.globe.rotation.y += 0.002;
          props.renderer.render(props.scene, props.camera);
          const id = requestAnimationFrame(animate);
          if (globeRef.current) globeRef.current.animationFrameId = id;
        };

        const firstFrameId = requestAnimationFrame(animate);

        globeRef.current = { ...props, animationFrameId: firstFrameId };
      } catch (error) {
        console.error('Globe render error:', error);
      }
    };

    renderScene();

    return () => {
      cancelled = true;

      const refs = globeRef.current;
      if (!refs) return;

      cancelAnimationFrame(refs.animationFrameId);

      // Dispose GPU resources
      const material = refs.globe.material;
      material.map?.dispose();
      material.dispose();
      refs.globe.geometry.dispose();
      refs.renderer.dispose();

      // Remove canvas from DOM
      if (container.contains(refs.renderer.domElement)) {
        container.removeChild(refs.renderer.domElement);
      }

      globeRef.current = null;
    };
  }, [paletteIsFullfiled]);

  // Re-apply color when palette/scheme changes
  useEffect(() => {
    if (!globeRef.current) return;
    applyGlobeColor();
  }, [debouncedPaletteColor, debouncedScheme]);

  return (
    <>
      <HTMLComment text='Props to sohrabzia https://codepen.io/sohrabzia' />
      <div
        ref={containerRef}
        id='globe'
        className={cn(
          'aspect-square size-full overflow-hidden rounded-full [&_canvas]:size-full',
          className,
        )}
      ></div>
    </>
  );
});

export default Globe;
