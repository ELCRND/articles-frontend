"use client";

import { useState } from "react";

import styles from "./LoadMore.module.scss";

type Props = {
  loadMore: () => Promise<void>;
};

export const LoadMore = ({ loadMore }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await loadMore();
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={styles.loadMore}
      disabled={isLoading}
    >
      {isLoading ? "Загрузка..." : "Загрузить еще"}
    </button>
  );
};
