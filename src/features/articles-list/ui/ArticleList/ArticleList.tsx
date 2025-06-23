"use client";
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { LoadMore } from "../LoadMore/LoadMore";
import { articleService } from "@/entities/article/api/article.service";
import { ArticleCard } from "@/entities/article/ui/ArticleCard/ArticleCard";
import { ArticleIcons } from "@/shared/ui/SpriteIcons/ArticleIcons";

import { IArticle } from "@/entities/article/model/types";

import styles from "./ArticleList.module.scss";

type Props = {
  data: IArticle[];
  children?: ReactNode;
};

let page = 1;

export const ArticleList = ({ data, children }: Props) => {
  const [articles, setArticles] = useState<IArticle[]>(data);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const loadMoreArticles = async () => {
    const newData = await articleService.getArticles(++page);
    setArticles((p) => [...p, ...newData]);
  };

  useEffect(() => {
    if (query === null) return;
    const applySearchFilter = async () => {
      if (query) {
        const res = await articleService.getArticleByKeywords(query);
        setArticles(res);
      } else {
        setArticles(data);
      }
    };
    applySearchFilter();
  }, [query, data]);

  return (
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
  );
};
