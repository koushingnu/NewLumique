"use client";

import { useEffect, useRef, useState } from "react";

type SlideViewerProps = {
  htmlPath: string;
  title: string;
};

export default function SlideViewer({ htmlPath, title }: SlideViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // 1280pxのスライドをコンテナ幅に合わせてスケーリング
        setScale(width / 1280);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      <iframe
        src={htmlPath}
        className="absolute border-0"
        style={{
          width: "1280px",
          height: "720px",
          transformOrigin: "0 0",
          transform: `scale(${scale})`,
          maxWidth: "none",
          left: 0,
          top: 0,
        }}
        title={title}
      />
    </div>
  );
}
