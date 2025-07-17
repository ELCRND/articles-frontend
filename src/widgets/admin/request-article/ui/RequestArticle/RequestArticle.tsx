"use client";
import { useState } from "react";

import { ArticleList } from "../ArticleList/ArticleList";
import { FiltersBar } from "@/features/admin/filters-bar/ui/FiltersBar/FiltersBar";

import { type ArticlePreview } from "@/entities/article/model/types";

import styles from "./RequestArticle.module.scss";

type Props = {
  data: ArticlePreview[];
};

export const RequestArticle = ({ data }: Props) => {
  const [articles, setArticles] = useState(data);

  const applyFilters = (newData: ArticlePreview[]) => {
    setArticles(newData);
  };

  return (
    <section className={`container ${styles.container}`}>
      <FiltersBar applyFilters={applyFilters} />
      <ArticleList articles={articles} />
    </section>
  );
};
