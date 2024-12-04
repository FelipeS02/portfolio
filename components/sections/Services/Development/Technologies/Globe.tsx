'use client'; // Habilita el renderizado en cliente

import { useScheme, useTheme } from '@/hooks/theme';
import { FC, useEffect, useRef } from 'react';
import GlobeDark from '@/public/assets/images/globe-map-dark.webp';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import HTMLComment from '@/components/ui/HTMLComment';

const Globe: FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    palette: { hex: palette },
  } = useTheme();
  const { resolvedTheme } = useScheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark = resolvedTheme === 'dark';

    // Create the WebGL renderer with transparency (alpha: true)
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio); // Ensure smooth rendering on high-DPI screens
    renderer.setClearColor(isDark ? palette[200] : palette[50]);
    container.appendChild(renderer.domElement);

    // Initialize the Three.js scene
    const scene = new THREE.Scene();

    // Determine which texture to use based on the current theme
    const textureUrl = GlobeDark.src;

    // Configure the camera with a perspective projection
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 165; // Adjust the z-position for the desired view

    // Create the sphere geometry (globe) with smooth subdivisions
    const geometry = new THREE.SphereGeometry(100, 64, 32);
    const material = new THREE.MeshBasicMaterial({ transparent: true });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Load and apply the texture to the globe
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      textureUrl,
      (texture) => {
        // Set texture properties for improved rendering
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        globe.material.map = texture;
        globe.material.needsUpdate = true;
      },
      undefined,
      (error) => console.error('Failed to load texture:', error)
    );

    // Resize renderer and update camera aspect ratio
    const resizeRenderer = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // Initialize renderer size on mount
    resizeRenderer();

    // Animation loop
    const animate = () => {
      globe.rotation.y += 0.002; // Control rotation speed
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup function to prevent memory leaks
    return () => {
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [palette, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      id='3d-globe'
      className={cn('size-full aspect-square rounded-full', className)}
    >
      <HTMLComment text='Props to sohrabzia https://codepen.io/sohrabzia' />
    </div>
  );
};

export default Globe;
