import { notFound } from "next/navigation";
import { getProjectById } from "@/data/projects";
import SlideLayout from "@/components/SlideLayout";
import { Metadata } from "next";

type Props = {
  params: { projectId: string; pageNumber: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectById(params.projectId);

  if (!project) {
    return {
      title: "プロジェクトが見つかりません",
    };
  }

  return {
    title: `${project.title} - ページ ${params.pageNumber}`,
    description: project.description,
  };
}

export default function ProjectSlidePage({ params }: Props) {
  const { projectId, pageNumber } = params;
  const project = getProjectById(projectId);
  const page = parseInt(pageNumber, 10);

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
      <iframe
        src={htmlPath}
        className="w-full h-full border-0"
        title={`${project.title} - ページ ${page}`}
      />
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
