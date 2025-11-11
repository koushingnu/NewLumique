# Lumique - 企画案管理プラットフォーム

HTMLスライドをそのまま表示して管理できる、シンプルな企画案プラットフォームです。

## 機能

- 📄 **HTMLをそのまま表示**: 変換不要!HTMLファイルを配置するだけ
- 🖼️ **リアルタイムプレビュー**: 一覧画面で最初のスライドをプレビュー表示
- 🎨 **美しいUI**: モダンなグラデーションとアニメーションを使用したデザイン
- 🖱️ **簡単なナビゲーション**: キーボードショートカット（矢印キー、ESC）でスムーズに操作
- 📱 **レスポンシブ対応**: 様々な画面サイズに対応
- 🚀 **超簡単追加**: フォルダを置いてコマンド1つで完了

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで `http://localhost:3000` を開くと、プロジェクト一覧が表示されます。

## 新しい企画案を追加する（超簡単!）

### ステップ1: HTMLフォルダをプロジェクトに配置

企画案のHTMLファイルが入ったフォルダを、NewLumique（現プロジェクト）のルートディレクトリに配置します。

```
NewLumique/
├── my-new-project/       ← ここに配置
│   ├── page_1.html
│   ├── page_2.html
│   └── page_3.html
├── app/
├── components/
└── ...
```

### ステップ2: コマンド実行

```bash
npm run add my-new-project
```

たったこれだけ!自動的に:

- ✅ `public/slides/` に HTMLファイルがコピーされます
- ✅ `data/projects.ts` にプロジェクト情報が追加されます
- ✅ ルーティング設定が更新されます

### ステップ3: 開発サーバーを再起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開けば、新しいプロジェクトが表示されます!

## HTMLファイルの命名規則

フォルダ内のHTMLファイルは、以下のいずれかの形式で命名してください:

- `page_1.html`, `page_2.html`, `page_3.html` ...
- `slide_1.html`, `slide_2.html`, `slide_3.html` ...
- `1.html`, `2.html`, `3.html` ...

数字があればスクリプトが自動的にソートします。

## プロジェクト構造

```
NewLumique/
├── public/
│   └── slides/
│       ├── idol-produce/      # プロジェクトごとのフォルダ
│       │   ├── page_1.html
│       │   ├── page_2.html
│       │   └── ...
│       └── my-project/
│           ├── page_1.html
│           └── ...
├── data/
│   └── projects.ts            # プロジェクト情報
├── scripts/
│   └── add-from-folder.js     # 追加スクリプト
└── app/
    └── projects/
        └── [projectId]/
            └── [pageNumber]/
                └── page.tsx   # スライド表示ページ
```

## キーボードショートカット

スライド表示中に以下のキーが使えます:

- `←` : 前のスライドへ
- `→` : 次のスライドへ
- `Esc` : プロジェクト一覧へ戻る

## プロジェクト情報のカスタマイズ

`data/projects.ts` を編集して、タイトルや説明をカスタマイズできます:

```typescript
{
  id: "my-project",
  title: "素晴らしいアイデア",           // ← カスタマイズ
  description: "革新的な企画案です",      // ← カスタマイズ
  thumbnail: "/thumbnails/my-project.jpg",
  category: "テクノロジー",              // ← カスタマイズ
  createdAt: "2025-11-11",
  pages: 5,
}
```

## よくある質問

### Q: プロジェクトを削除したい

A: 以下を削除してください:

1. `public/slides/[project-id]/` フォルダ
2. `data/projects.ts` の該当エントリ

### Q: スライドの順番を変えたい

A: `public/slides/[project-id]/` 内のファイル名を変更してください。`page_1.html`, `page_2.html` の順に表示されます。

### Q: HTMLを修正したい

A: `public/slides/[project-id]/` 内のHTMLファイルを直接編集してください。ブラウザをリフレッシュすれば反映されます。

### Q: 一覧のプレビューが表示されない

A: `public/slides/[project-id]/page_1.html` が存在することを確認してください。

## HTMLの要件

特別な要件はありません!普通のHTMLファイルがそのまま動作します:

- CDNからのライブラリ読み込み（D3.js、Tailwind CSS等）も問題なし
- `<script>`タグも動作します
- スタイルもそのまま適用されます
- インタラクティブな要素も動作します

## 技術スタック

- **Next.js 14**: Reactフレームワーク
- **TypeScript**: 型安全性
- **Tailwind CSS**: スタイリング
- **Font Awesome**: アイコン
- **iframe**: HTMLファイルの表示

## デプロイ

```bash
# ビルド
npm run build

# 本番環境で起動
npm run start
```

Vercel、Netlify等のプラットフォームへのデプロイも簡単です。

## ライセンス

© 2025 Lumique. All rights reserved.
