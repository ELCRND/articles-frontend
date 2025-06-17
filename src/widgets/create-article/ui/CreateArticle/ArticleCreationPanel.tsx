"use client";

import { Breadcrumbs } from "@/widgets/breadcrumbs/ui/Breadcrumbs/Breadcrumbs";
import { BreadcrumbsItem } from "@/widgets/breadcrumbs/ui/BreadcrumbsItem/BreadcrumbsItem";
import { ArticleEditor } from "@/features/article-edit/ui/ArticleEditor/ArticleEditor";

import styles from "./ArticleCreationPanel.module.scss";

const ArticleCreationPanel = () => {
  return (
    <section className={`container`}>
      <Breadcrumbs separator="-">
        <BreadcrumbsItem href="/me">Аккаунт</BreadcrumbsItem>
        <BreadcrumbsItem href="/me/articles">Мои статьи</BreadcrumbsItem>
        <BreadcrumbsItem href="/" isCurrent>
          Создать
        </BreadcrumbsItem>
      </Breadcrumbs>

      <ArticleEditor />
    </section>
  );
};

export default ArticleCreationPanel;
