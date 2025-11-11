# 🚀 クイックスタートガイド

## 新しいプロジェクトを30秒で追加する方法

### ステップ1: HTMLフォルダをプロジェクトに配置

企画案のHTMLファイルが入ったフォルダを、NewLumiqueのルートに置きます。

```
NewLumique/
├── my-awesome-project/    ← ここに配置
│   ├── page_1.html
│   ├── page_2.html
│   └── page_3.html
├── app/
├── components/
└── ...
```

### ステップ2: コマンド実行

```bash
npm run add my-awesome-project
```

### ステップ3: 完了!

開発サーバーを再起動すれば、新しいプロジェクトが一覧に表示されます!

```bash
npm run dev
```

---

## 実例

### 例1: フォルダ名が `idol-produce-v2` の場合

```bash
# 1. フォルダを配置
NewLumique/
├── idol-produce-v2/
│   ├── page_1.html
│   ├── page_2.html
│   └── ...

# 2. コマンド実行
npm run add idol-produce-v2

# 3. 完了!
# → プロジェクトID: idol-produce-v2
# → タイトル: Idol Produce V2
```

### 例2: フォルダ名が `新企画_2025` の場合

```bash
# 1. フォルダを配置
NewLumique/
├── 新企画_2025/
│   ├── 1.html
│   ├── 2.html
│   └── ...

# 2. コマンド実行
npm run add 新企画_2025

# 3. 完了!
# → プロジェクトID: 2025
# → タイトル: 新企画 2025
```

---

## カスタマイズ

追加後、`data/projects.ts` を編集してタイトルや説明をカスタマイズできます:

```typescript
{
  id: "my-awesome-project",
  title: "素晴らしい企画案",        // ← カスタマイズ
  description: "詳細な説明文",      // ← カスタマイズ
  category: "カテゴリー",          // ← カスタマイズ
  pages: 3,
}
```

---

## HTMLファイルの命名

フォルダ内のHTMLファイルは以下の形式で:

- ✅ `page_1.html`, `page_2.html`, ...
- ✅ `slide_1.html`, `slide_2.html`, ...
- ✅ `1.html`, `2.html`, `3.html`, ...

数字があれば自動的にソートされます!

---

## トラブルシューティング

### フォルダが見つからない

```bash
❌ フォルダが見つかりません: my-project
```

→ フォルダ名を確認してください。NewLumiqueのルートディレクトリに配置されている必要があります。

### HTMLファイルが見つからない

```bash
❌ フォルダ内にHTMLファイルが見つかりません
```

→ フォルダ内に `.html` 拡張子のファイルがあることを確認してください。

### プレビューが表示されない

→ `page_1.html` が正しく配置されているか確認してください。

---

## 便利なコマンド

```bash
# 開発サーバー起動
npm run dev

# 新しいプロジェクトを追加
npm run add [フォルダ名]

# ビルド
npm run build

# 本番環境起動
npm run start
```

---

## ワークフロー例

1. クライアントから企画案のHTMLフォルダを受け取る
2. NewLumiqueのルートに配置
3. `npm run add フォルダ名` を実行
4. `data/projects.ts` でタイトルや説明を編集（オプション）
5. 開発サーバーを再起動
6. ブラウザで確認・共有!

**これだけで完了!** 🎉

---

## 次のステップ

- 💡 プロジェクト情報をカスタマイズ
- 🎨 サムネイル画像を追加（オプション）
- 🚀 デプロイして共有!

**楽しい企画案管理ライフを!** ✨
