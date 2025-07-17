import Link from "next/link";

import {
  HighlightText,
  HTMLHighlightText,
} from "@/shared/ui/HighlightText/HighlightText";

import { ArticleCategory, ArticleTag, IArticle } from "../../model/types";

import styles from "./ArticleCard.module.scss";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/react";
import { getExtensions } from "@/features/article-edit/config/tiptapExtensions";

interface Props extends IArticle {
  highlightQuery?: string | null;
  formattedContent?: string;
}

export const ArticleCard = ({
  _id,
  title,
  content,
  plainText,
  author,
  tags,
  readingTime,
  views,
  publishedAt,
  comments,
  category,
  image,
  highlightQuery,
  formattedContent,
}: Props) => {
  return (
    <article className={`${styles.article} ${styles.article}--${category}`}>
      <h2 className={styles.article__title}>
        <HighlightText text={title} query={highlightQuery} />
      </h2>
      <div className={styles.article__author}>{author.username}</div>
      <ul className={styles.article__tags}>
        {tags.map((tag) => (
          <li key={tag}>#{ArticleTag[tag]}</li>
        ))}
      </ul>
      <div className={styles.article__attributes}>
        <div className={styles.article__readingTime}>
          <svg aria-label="Время чтения" width="16" height="16">
            <use href={`#reading-time`}></use>
          </svg>
          <span>{readingTime.toLocaleString()} мин</span>
        </div>
        <div className={styles.article__views}>
          <svg aria-label="Количество просмотров" width="24" height="16">
            <use href={`#views-count`}></use>
          </svg>
          <span>{views}</span>
        </div>
        <div className={styles.article__publishedTime}>
          <svg aria-label="Дата публикации" width="16" height="16">
            <use href={`#published-time`}></use>
          </svg>
          <time dateTime={publishedAt?.toString()}>
            {new Intl.DateTimeFormat("ru-RU", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(publishedAt || new Date()))}
          </time>
        </div>
        <div className={styles.article__comments}>
          <svg aria-label="Количество комментариев" width="16" height="16">
            <use href={`#comments-count`}></use>
          </svg>
          <span>{comments}</span>
        </div>
      </div>
      <p className={styles.article__textSsr}>
        {/* <HighlightText text={text || ""} query={highlightQuery} /> */}
        {plainText}
      </p>

      <div className={styles.article__text}>
        {formattedContent && (
          <HTMLHighlightText html={formattedContent} query={highlightQuery} />
        )}
      </div>
      <Link href={`/articles/${_id}`} className={styles.article__readMore}>
        Читать далее
      </Link>

      <div title={ArticleCategory[category]} className={styles.article__icon}>
        <svg width="16" height="16">
          <use href={`#${category}`}></use>
        </svg>
      </div>
    </article>
  );
};
