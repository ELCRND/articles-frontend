import { ArticleFeed } from "@/widgets/articles-feed/ui/ArticleFeed/ArticleFeed";

import { articleService } from "@/entities/article/api/article.service";

export default async function HomePage() {
  const data =
    (await articleService.getArticles(1, articleService.limit)) || [];

  return (
    <>
      <ArticleFeed data={data} />
    </>
  );
}
