'use client';

import Spline from '@splinetool/react-spline';

export default function SplineScene() {
  return (
    <div className="relative w-full h-full">
      <Spline scene="https://prod.spline.design/1aP8j5q6F2tFndKy/scene.splinecode" />
      {/* covers Spline watermark logo bottom-right */}
      <div
        className="absolute bottom-5 right-5 bg-white"
        style={{ width: 170, height: 40, zIndex: 9999 }}
        aria-hidden="true"
      />
    </div>
  );
}
