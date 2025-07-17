import Link from "next/link";
import Image from "next/image";

import { ArticlePreview } from "@/entities/article/model/types";

import styles from "./ArticleList.module.scss";

export type Props = {
  articles: ArticlePreview[];
};

export const ArticleList = ({ articles }: Props) => {
  return (
    <ul className={styles.articleList}>
      {articles.map((article) => {
        const date = new Date(article.createdAt);
        const localDateString = date.toLocaleString("ru-RU", {
          year: "numeric",
          month: "2-digit",
          day: "numeric",
        });
        return (
          <li key={article._id}>
            <Link href={`/articles/${article._id}`}>
              <div className={styles.atricle}>
                <h2 className={styles.atricle__title}>{article.title}</h2>
                <time
                  className={styles.atricle__publishedTime}
                  dateTime={localDateString}
                >
                  {localDateString}
                </time>
                <address className={styles.atricle__authorName}>
                  {article.author.username}
                </address>
                <Image
                  className={styles.atricle__authorImg}
                  src={"/user/no-avatar.svg"}
                  alt={article.author.username}
                  width={56}
                  height={56}
                />
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
