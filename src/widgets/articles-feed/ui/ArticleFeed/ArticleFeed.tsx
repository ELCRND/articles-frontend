"use client";

import { ArticleCount } from "@/entities/article/ui/ArticleCount/ArticleCount";
import { ArticleList } from "@/features/articles-list/ui/ArticleList/ArticleList";
import { UpgradeBanner } from "@/shared/ui/UpgradeBanner/UpgradeBanner";
import { AdBanner } from "@/shared/ui/AdBanner/AdBanner";

import { IArticle } from "@/entities/article/model/types";

import styles from "./ArticleFeed.module.scss";

type Props = {
  data: IArticle[];
};

export const ArticleFeed = ({ data }: Props) => {
  return (
    <section className={`container ${styles.articlesFeed}`}>
      <ArticleCount count={data.length} />

      <ArticleList data={data}>
        <AdBanner
          key={"ad/ad-1x1.png"}
          type="1x1"
          position="y1-x2"
          image="/ad/ad-1x1.png"
        >
          <span>МЕСТО ДЛЯ РЕКЛАМЫ</span>
        </AdBanner>

        <UpgradeBanner />

        <AdBanner
          key={"ad/ad-1x2.png"}
          type="1x2"
          position="y3-x2"
          image="/ad/ad-1x2.png"
        >
          <span style={{ color: "#000" }}>Реклама</span>
        </AdBanner>
      </ArticleList>
    </section>
  );
};
