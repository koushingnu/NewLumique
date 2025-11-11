"use client";

import { notFound } from "next/navigation";
import { getProjectById } from "@/data/projects";
import SlideLayout from "@/components/SlideLayout";
import { useEffect, useRef, useState } from "react";

type Props = {
  params: { projectId: string; pageNumber: string };
};

export default function ProjectSlidePage({ params }: Props) {
  const { projectId, pageNumber } = params;
  const project = getProjectById(projectId);
  const page = parseInt(pageNumber, 10);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setScale(width / 1280);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // プロジェクトが存在しない、またはページ番号が無効な場合
  if (!project || isNaN(page) || page < 1 || page > project.pages) {
    notFound();
  }

  // HTMLファイルのパスを生成
  const htmlPath = `/slides/${projectId}/page_${page}.html`;

  return (
    <SlideLayout
      projectId={projectId}
      currentPage={page}
      totalPages={project.pages}
      projectTitle={project.title}
    >
      <div ref={containerRef} className="w-full h-full relative">
        <iframe
          src={htmlPath}
          className="absolute border-0 pointer-events-auto"
          style={{
            width: "1280px",
            height: "720px",
            transformOrigin: "0 0",
            transform: `scale(${scale})`,
            maxWidth: "none",
          }}
          title={`${project.title} - ページ ${page}`}
        />
      </div>
    </SlideLayout>
  );
}

// 静的パスの生成
export function generateStaticParams() {
  const params: { projectId: string; pageNumber: string }[] = [];

  // idol-produceプロジェクトの全ページ
  for (let i = 1; i <= 9; i++) {
    params.push({
      projectId: "idol-produce",
      pageNumber: i.toString(),
    });
  }

  return params;
}
