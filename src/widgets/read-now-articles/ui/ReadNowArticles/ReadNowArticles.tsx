"use client";

import { useEffect, useState } from "react";

import { articleService } from "@/entities/article/api/article.service";

import { IArticle } from "@/entities/article/model/types";

import styles from "./ReadNowArticles.module.scss";

export const ReadNowArticles = () => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  useEffect(() => {
    (async () => {
      setArticles(await articleService.getReadNowArticles());
    })();
  }, []);

  return articles.length ? (
    <ul className={styles.list}>
      {articles.map((article) => (
        <li key={article._id} className={styles.item}>
          <h2>ЧИТАЮТ СЕЙЧАС</h2>
          <h3>{article.title}</h3>
          <p>{article.plainText}</p>
          <div className={styles.attr}>
            <div className={styles.views}>
              <svg
                width="24"
                height="16"
                viewBox="0 0 24 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2.13333C14.0059 2.12681 15.973 2.6739 17.675 3.71171C19.3771 4.74951 20.7451 6.2359 21.6218 8C19.8218 11.5947 16.1455 13.8667 12 13.8667C7.85455 13.8667 4.17818 11.5947 2.37818 8C3.25486 6.2359 4.62287 4.74951 6.32496 3.71171C8.02705 2.6739 9.99411 2.12681 12 2.13333ZM12 0C6.54545 0 1.88727 3.31733 0 8C1.88727 12.6827 6.54545 16 12 16C17.4545 16 22.1127 12.6827 24 8C22.1127 3.31733 17.4545 0 12 0ZM12 5.33333C12.7233 5.33333 13.417 5.61428 13.9285 6.11438C14.4399 6.61448 14.7273 7.29276 14.7273 8C14.7273 8.70724 14.4399 9.38552 13.9285 9.88562C13.417 10.3857 12.7233 10.6667 12 10.6667C11.2767 10.6667 10.583 10.3857 10.0715 9.88562C9.56006 9.38552 9.27273 8.70724 9.27273 8C9.27273 7.29276 9.56006 6.61448 10.0715 6.11438C10.583 5.61428 11.2767 5.33333 12 5.33333ZM12 3.2C9.29455 3.2 7.09091 5.35467 7.09091 8C7.09091 10.6453 9.29455 12.8 12 12.8C14.7055 12.8 16.9091 10.6453 16.9091 8C16.9091 5.35467 14.7055 3.2 12 3.2Z"
                  fill="#B33D01"
                />
              </svg>
              <span>{article.views}</span>
            </div>
            <div className={styles.comments}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.4 12.136L13.464 11.2H1.6V1.6H14.4V12.136ZM14.4 0H1.6C0.72 0 0 0.72 0 1.6V11.2C0 12.08 0.72 12.8 1.6 12.8H12.8L16 16V1.6C16 0.72 15.28 0 14.4 0Z"
                  fill="#B33D01"
                />
              </svg>
              <span>{article.comments}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <ul className={styles.list}>
      <li key={"0"} className={styles.item}>
        <h2>ЧИТАЮТ СЕЙЧАС</h2>
        <div className={styles.dotsContainer}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </li>
      <li key={"1"} className={styles.item}>
        <h2>ЧИТАЮТ СЕЙЧАС</h2>
        <div className={styles.dotsContainer}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </li>
    </ul>
  );
};
