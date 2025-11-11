export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  createdAt: string;
  pages: number;
}

export const projects: Project[] = [
  {
    id: 'idol-produce',
    title: 'ファン参加型アイドルプロデュースプラットフォーム',
    description: 'アイドルとファンが共に活動を創る新しいプラットフォーム。推し活×クラウドファンディング×SNS投票を融合したファン共創型プロデュースプラットフォーム。',
    thumbnail: '/thumbnails/idol-produce.jpg',
    category: 'エンターテイメント',
    createdAt: '2025-11-11',
    pages: 9,
  },
  // 今後、他の企画案をここに追加できます
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getAllProjects(): Project[] {
  return projects;
}

