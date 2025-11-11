"use client";

import { useRouter } from "next/navigation";
import SlideNavigation from "./SlideNavigation";

type SlideLayoutProps = {
  projectId: string;
  currentPage: number;
  totalPages: number;
  projectTitle: string;
  children: React.ReactNode;
};

export default function SlideLayout({
  projectId,
  currentPage,
  totalPages,
  projectTitle,
  children,
}: SlideLayoutProps) {
  const router = useRouter();

  const handlePrevious = () => {
    if (currentPage > 1) {
      router.push(`/projects/${projectId}/${currentPage - 1}`);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      router.push(`/projects/${projectId}/${currentPage + 1}`);
    }
  };

  const handleGoToPage = (page: number) => {
    router.push(`/projects/${projectId}/${page}`);
  };

  const handleBackToList = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-7xl">
        {/* プロジェクトタイトル */}
        <div className="mb-3 sm:mb-4 text-center px-2">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
            {projectTitle}
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            ページ {currentPage} / {totalPages}
          </p>
        </div>

        {/* スライドコンテンツ */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            {children}
          </div>
        </div>

        {/* ナビゲーション */}
        <SlideNavigation
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onGoToPage={handleGoToPage}
          onBackToList={handleBackToList}
        />
      </div>
    </div>
  );
}
