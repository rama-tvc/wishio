import "./globals.css";
import { Layout } from "@/components/Layout";

import { FilterProvider } from "@/hooks/useFilter";

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
        <FilterProvider>
          <Layout>{children}</Layout>
        </FilterProvider>
      </body>
    </html>
  );
}
