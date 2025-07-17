"use client";
import { type ReactNode, Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { generateHTML } from "@tiptap/react";

import { LoadMore } from "../LoadMore/LoadMore";
import { getExtensions } from "@/features/article-edit/config/tiptapExtensions";
import { articleService } from "@/entities/article/api/article.service";
import { ArticleCard } from "@/entities/article/ui/ArticleCard/ArticleCard";
import { ArticleIcons } from "@/shared/ui/SpriteIcons/ArticleIcons";

import { type IArticle } from "@/entities/article/model/types";

import styles from "./ArticleList.module.scss";

type Props = {
  data: IArticle[];
  children?: ReactNode;
};

export const formatArticleContent = (content: any, text: string): string => {
  if (content && typeof content === "object") {
    return generateHTML(content, getExtensions());
  }
  return typeof content === "string" ? content : text || "";
};

let page = 1;

export const ArticleList = ({ data, children }: Props) => {
  const [articles, setArticles] = useState<IArticle[]>(data);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    setArticles(
      articles.map((article) => ({
        ...article,
        formattedContent: formatArticleContent(
          article.content,
          article.plainText
        ),
      }))
    );
  }, []);

  const loadMoreArticles = async () => {
    const res = await articleService.getArticles(++page);
    const newData = res.map((article) => ({
      ...article,
      formattedContent: formatArticleContent(
        article.content,
        article.plainText
      ),
    }));

    setArticles((p) => [...p, ...newData]);
  };

  useEffect(() => {
    if (query === null) return;
    const applySearchFilter = async () => {
      if (query) {
        const res = await articleService.getArticleByKeywords(query);
        const newData = res.map((article) => ({
          ...article,
          formattedContent: formatArticleContent(
            article.content,
            article.plainText
          ),
        }));

        setArticles(newData);
      } else {
        setArticles(
          data.map((article) => ({
            ...article,
            formattedContent: formatArticleContent(
              article.content,
              article.plainText
            ),
          }))
        );
      }
    };
    applySearchFilter();
  }, [query, data]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={`${styles.articles}`}>
        {articles.length === 0 &&
          (!query ? (
            <div>Не удалось получить список статей. Ошибка сервера</div>
          ) : (
            <div>Нет статей с подхоядщим содержимым</div>
          ))}

        {articles.map((article) => (
          <ArticleCard key={article._id} {...article} highlightQuery={query} />
        ))}

        {children}

        {articles.length > 0 && !query && (
          <LoadMore loadMore={loadMoreArticles} />
        )}

        <ArticleIcons />
      </div>
    </Suspense>
  );
};
