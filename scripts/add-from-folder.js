#!/usr/bin/env node

/**
 * フォルダから新しいプロジェクトを追加するスクリプト
 *
 * 使用方法:
 * node scripts/add-from-folder.js <フォルダ名>
 *
 * 例:
 * node scripts/add-from-folder.js my-project-folder
 */

const fs = require("fs");
const path = require("path");

function main() {
  const folderName = process.argv[2];

  if (!folderName) {
    console.error("❌ 使用方法: node scripts/add-from-folder.js <フォルダ名>");
    console.error("例: node scripts/add-from-folder.js my-project");
    process.exit(1);
  }

  const sourcePath = path.join(process.cwd(), folderName);

  // フォルダの存在確認
  if (!fs.existsSync(sourcePath)) {
    console.error(`❌ フォルダが見つかりません: ${folderName}`);
    process.exit(1);
  }

  if (!fs.statSync(sourcePath).isDirectory()) {
    console.error(`❌ ${folderName} はフォルダではありません`);
    process.exit(1);
  }

  // HTMLファイルを取得
  const files = fs.readdirSync(sourcePath);
  const htmlFiles = files
    .filter((f) => f.endsWith(".html"))
    .sort((a, b) => {
      // page_1.html, page_2.html のような命名を想定してソート
      const numA = parseInt(a.match(/\d+/)?.[0] || "0");
      const numB = parseInt(b.match(/\d+/)?.[0] || "0");
      return numA - numB;
    });

  if (htmlFiles.length === 0) {
    console.error(`❌ ${folderName} 内にHTMLファイルが見つかりません`);
    process.exit(1);
  }

  console.log(`\n🚀 プロジェクトを追加: ${folderName}`);
  console.log(`📄 見つかったHTMLファイル: ${htmlFiles.length}件\n`);

  // プロジェクトIDはフォルダ名から生成
  const projectId = folderName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // public/slides/にフォルダを作成
  const destDir = path.join(process.cwd(), "public", "slides", projectId);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`✓ フォルダ作成: public/slides/${projectId}`);
  } else {
    console.log(`⚠ フォルダは既に存在します: public/slides/${projectId}`);
  }

  // HTMLファイルをコピー
  htmlFiles.forEach((file, index) => {
    const sourceFile = path.join(sourcePath, file);
    const destFile = path.join(destDir, `page_${index + 1}.html`);
    fs.copyFileSync(sourceFile, destFile);
    console.log(`✓ コピー: ${file} → page_${index + 1}.html`);
  });

  // data/projects.tsを更新
  const projectsPath = path.join(process.cwd(), "data", "projects.ts");
  let projectsContent = fs.readFileSync(projectsPath, "utf-8");

  const today = new Date().toISOString().split("T")[0];
  const title = folderName
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const newProject = `  {
    id: "${projectId}",
    title: "${title}",
    description: "${title}の企画案",
    thumbnail: "/thumbnails/${projectId}.jpg",
    category: "企画案",
    createdAt: "${today}",
    pages: ${htmlFiles.length},
  },`;

  // projects配列の先頭に追加
  if (projectsContent.includes("export const projects: Project[] = [")) {
    projectsContent = projectsContent.replace(
      /(export const projects: Project\[\] = \[)/,
      `$1\n${newProject}`
    );
    fs.writeFileSync(projectsPath, projectsContent, "utf-8");
    console.log(`✓ プロジェクト情報を追加: data/projects.ts`);
  } else {
    console.error("❌ projects.tsのフォーマットが想定と異なります");
    process.exit(1);
  }

  // app/projects/[projectId]/[pageNumber]/page.tsxのgenerateStaticParamsを更新
  const pagePath = path.join(
    process.cwd(),
    "app",
    "projects",
    "[projectId]",
    "[pageNumber]",
    "page.tsx"
  );
  let pageContent = fs.readFileSync(pagePath, "utf-8");

  const newStaticParams = `
  // ${projectId}プロジェクトの全ページ
  for (let i = 1; i <= ${htmlFiles.length}; i++) {
    params.push({
      projectId: "${projectId}",
      pageNumber: i.toString(),
    });
  }`;

  pageContent = pageContent.replace(
    /(return params;\s*})/,
    `${newStaticParams}\n  \n  $1`
  );

  fs.writeFileSync(pagePath, pageContent, "utf-8");
  console.log(`✓ 静的パス生成を更新: page.tsx`);

  console.log("\n✨ プロジェクトの追加が完了しました!\n");
  console.log("📋 プロジェクト情報:");
  console.log(`  ID: ${projectId}`);
  console.log(`  タイトル: ${title}`);
  console.log(`  ページ数: ${htmlFiles.length}`);
  console.log("");
  console.log("次のステップ:");
  console.log(
    "1. data/projects.ts でタイトルや説明を編集してください（オプション）"
  );
  console.log("2. 開発サーバーを再起動してください");
  console.log("   npm run dev");
  console.log("3. ブラウザで http://localhost:3000 を開いてください\n");
}

main();
