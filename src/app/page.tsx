import { generateText } from "@tiptap/react";

import { ArticleFeed } from "@/widgets/articles-feed/ui/ArticleFeed/ArticleFeed";

import { articleService } from "@/entities/article/api/article.service";

import { getExtensions } from "@/features/article-edit/config/tiptapExtensions";

export default async function HomePage() {
  const data = await articleService.getArticles(1, articleService.limit);
  // console.log(data, "homepage");
  const ssrData = data.map((article) => ({
    ...article,
    text: generateText(data[0].content, getExtensions()),
  }));

  return (
    <>
      <ArticleFeed data={ssrData || []} />
    </>
  );
}
