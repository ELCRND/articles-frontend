"use client";

import { useEffect, useState } from "react";

import { articleService } from "@/entities/article/api/article.service";

import styles from "./ArticleCount.module.scss";

type Props = {
  count?: number;
  className?: string;
};

export const ArticleCount = ({ count, className }: Props) => {
  const [state, setState] = useState(count);

  useEffect(() => {
    if (count) return;
    (async () => {
      setState(await articleService.getCount());
    })();
  }, []);
  return (
    <div className={`${styles.counter} ${className}`}>
      <span className={styles.text}>Все статьи</span>
      <span className={styles.count}> + {state}</span>
    </div>
  );
};
