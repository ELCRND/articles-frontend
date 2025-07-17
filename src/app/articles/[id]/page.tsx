import { Suspense } from "react";

import { articleService } from "@/entities/article/api/article.service";
import { Article } from "@/entities/article/ui/Article/Article";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Получаем `id` из URL

  const atricle = await articleService.getArticleById(id);

  return (
    <Suspense>
      {atricle ? (
        <Article {...atricle} />
      ) : (
        <h1>Статья с id:{id} не найдена</h1>
      )}
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
