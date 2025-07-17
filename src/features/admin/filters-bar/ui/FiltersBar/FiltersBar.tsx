"use client";

import { type FormEvent } from "react";
import { toast } from "react-toastify";

import Filter from "@/shared/ui/Filter/Filter";

import { filtersData } from "@/features/admin/filters-bar/model/consts/filtersData";

import { type ArticlePreview } from "@/entities/article/model/types";

import styles from "./FiltersBar.module.scss";

type Props = {
  applyFilters: (newData: ArticlePreview[]) => void;
};

export const FiltersBar = ({ applyFilters }: Props) => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const query = new URLSearchParams();

    formData.entries().forEach(([key, value]) => {
      query.append(key, value.toString());
    });

    try {
      const res = await fetch(
        `/api/proxy/admin/request-article?${query.toString()}`,
        { method: "GET" }
      );

      if (res.status === 401) {
        return toast.error((await res.json()).error);
      }

      const data = await res.json();

      applyFilters(data);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} id="filters-form" onSubmit={handleSubmit}>
        <h3 className={styles.title}>Фильтры</h3>
        <ul className={styles.filtersList}>
          {filtersData.map((filter) => (
            <li key={filter.label}>
              <Filter {...filter} />
            </li>
          ))}
        </ul>
      </form>
      <button className={styles.reset} type="reset" form="filters-form">
        Сбросить
      </button>
      <button className={styles.apply} form="filters-form">
        Применить
      </button>
    </div>
  );
};
