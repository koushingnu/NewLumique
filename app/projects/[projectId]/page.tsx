import { redirect } from 'next/navigation';

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  // プロジェクトのトップページは自動的に最初のページにリダイレクト
  redirect(`/projects/${params.projectId}/1`);
}

