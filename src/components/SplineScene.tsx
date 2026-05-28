'use client';

import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';

function onLoad(app: Application) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controls = (app as any)._camera?.controls;
  if (controls) {
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = false;
  }

  // Hide "Built with Spline" watermark DOM overlay
  setTimeout(() => {
    document.querySelectorAll('a[href*="spline.design"], [class*="logo"], [id*="logo"]').forEach((el) => {
      const anchor = el.closest('a') ?? el;
      if (anchor instanceof HTMLElement) anchor.style.display = 'none';
    });
  }, 500);
}

export default function SplineScene() {
  return (
    <div className="relative w-full h-full" style={{ pointerEvents: 'none' }}>
      <Spline
        scene="https://prod.spline.design/1aP8j5q6F2tFndKy/scene.splinecode"
        onLoad={onLoad}
      />
      
      {/* covers Spline watermark logo bottom-right */}
      <div
        className="absolute bottom-5 right-5 bg-white"
        style={{ width: 170, height: 40, zIndex: 9999 }}
        aria-hidden="true"
      />
    </div>
  );
}
