"use client";

import Link from "next/link";
import { getAllProjects, Project } from "@/data/projects";
import { useEffect, useRef, useState } from "react";

function ProjectCard({ project }: { project: Project }) {
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

  return (
    <Link
      href={`/projects/${project.id}/1`}
      className="group bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-opacity-70 transition-all duration-300 border border-gray-700 hover:border-pink-500 hover:shadow-xl hover:shadow-pink-500/20 hover:-translate-y-1"
    >
      {/* サムネイル領域 */}
      <div
        ref={containerRef}
        className="aspect-video bg-gray-900 relative overflow-hidden"
      >
        <iframe
          src={`/slides/${project.id}/page_1.html`}
          className="absolute border-0 pointer-events-none"
          style={{
            width: "1280px",
            height: "720px",
            transformOrigin: "0 0",
            transform: `scale(${scale})`,
            maxWidth: "none",
          }}
          title={`${project.title} - プレビュー`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all pointer-events-none" />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded z-10">
          {project.pages} スライド
        </div>
      </div>

      {/* コンテンツ */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-pink-500 bg-opacity-20 text-pink-300 text-xs font-medium rounded-full">
            {project.category}
          </span>
          <span className="text-gray-500 text-xs">
            {new Date(project.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors line-clamp-2">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex items-center text-pink-400 font-medium text-sm group-hover:translate-x-2 transition-transform">
          詳細を見る
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const projects = getAllProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900">
      {/* ヘッダー */}
      <header className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 text-center">
            Lumique
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 text-center">
            企画案管理プラットフォーム
          </p>
        </div>
      </header>

      {/* プロジェクト一覧 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            プロジェクト一覧
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            登録されている企画案を閲覧できます
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              まだプロジェクトがありません
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </main>

      {/* フッター */}
      <footer className="py-6 sm:py-8 text-center text-gray-500 text-xs sm:text-sm">
        <p>© 2025 Lumique. All rights reserved.</p>
      </footer>
    </div>
  );
}
