"use client";

import { Breadcrumbs } from "@/widgets/breadcrumbs/ui/Breadcrumbs/Breadcrumbs";
import { BreadcrumbsItem } from "@/widgets/breadcrumbs/ui/BreadcrumbsItem/BreadcrumbsItem";
import { ArticleCreationForm } from "@/features/article-edit/ui/ArticleCreationForm/ArticleCreationForm";

import styles from "./ArticleCreationPanel.module.scss";

const ArticleCreationPanel = () => {
  return (
    <section className={`container ${styles.container}`}>
      <Breadcrumbs separator="-">
        <BreadcrumbsItem href="/me">Аккаунт</BreadcrumbsItem>
        <BreadcrumbsItem href="/me/articles">Мои статьи</BreadcrumbsItem>
        <BreadcrumbsItem href="/" isCurrent>
          Создать
        </BreadcrumbsItem>
      </Breadcrumbs>

      <ArticleCreationForm />
    </section>
  );
};

export default ArticleCreationPanel;
