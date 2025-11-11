"use client";

import { useEffect } from "react";

type SlideNavigationProps = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onGoToPage: (page: number) => void;
  onBackToList: () => void;
};

export default function SlideNavigation({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onGoToPage,
  onBackToList,
}: SlideNavigationProps) {
  // キーボードショートカット
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onPrevious();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "Escape") {
        onBackToList();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onPrevious, onNext, onBackToList]);

  return (
    <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
      {/* 戻るボタン */}
      <button
        onClick={onBackToList}
        className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span className="hidden sm:inline">プロジェクト一覧へ</span>
        <span className="sm:hidden">一覧へ</span>
      </button>

      {/* ページネーション */}
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-center">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">前へ</span>
        </button>

        {/* ページ番号 */}
        <div className="flex gap-1 sm:gap-2 overflow-x-auto max-w-[200px] sm:max-w-none">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => onGoToPage(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-medium transition-colors text-sm sm:text-base flex-shrink-0 ${
                page === currentPage
                  ? "bg-pink-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
        >
          <span className="hidden sm:inline">次へ</span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
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
        </button>
      </div>

      {/* キーボードショートカットヒント (デスクトップのみ) */}
      <div className="hidden lg:block text-gray-400 text-sm">
        <div className="flex gap-4">
          <span>← → : ページ移動</span>
          <span>Esc : 一覧へ戻る</span>
        </div>
      </div>
    </div>
  );
}
