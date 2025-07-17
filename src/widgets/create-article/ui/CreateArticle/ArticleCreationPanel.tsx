"use client";

import { Breadcrumbs } from "@/widgets/breadcrumbs/ui/Breadcrumbs/Breadcrumbs";
import { BreadcrumbsItem } from "@/widgets/breadcrumbs/ui/BreadcrumbsItem/BreadcrumbsItem";
import { ReadNowArticles } from "@/widgets/read-now-articles/ui/ReadNowArticles/ReadNowArticles";
import { ArticleCreationForm } from "@/features/article-edit/ui/ArticleCreationForm/ArticleCreationForm";
import { UpgradeBanner } from "@/shared/ui/UpgradeBanner/UpgradeBanner";

import styles from "./ArticleCreationPanel.module.scss";
import { ArticleCount } from "@/entities/article/ui/ArticleCount/ArticleCount";

const ArticleCreationPanel = () => {
  return (
    <section className={`container ${styles.container}`}>
      <ArticleCount className={styles.articleCreationPanelCounter} />

      <Breadcrumbs separator="-">
        <BreadcrumbsItem href="/me">Аккаунт</BreadcrumbsItem>
        <BreadcrumbsItem href="/me/articles">Мои статьи</BreadcrumbsItem>
        <BreadcrumbsItem href="/" isCurrent>
          Создать
        </BreadcrumbsItem>
      </Breadcrumbs>

      <ArticleCreationForm />

      <aside className={styles.sidebar}>
        <UpgradeBanner className={styles.upgradeBanner} />
        <ReadNowArticles />
      </aside>
    </section>
  );
};

export default ArticleCreationPanel;
