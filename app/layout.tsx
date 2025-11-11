import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumique - 企画案管理プラットフォーム",
  description: "様々な企画案を格納・閲覧できるプラットフォーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
        <script src="https://d3js.org/d3.v7.min.js" async></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
