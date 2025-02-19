import "./globals.css";
import { Layout } from "@/components/Layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <title>Wishio</title>
        <meta
          name="description"
          content="Описание страницы или проекта для SEO"
        />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
