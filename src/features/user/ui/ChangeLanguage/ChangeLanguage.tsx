"use client";
import React, { useState } from "react";

import { useFilterLanguages } from "../../lib/useFilterLanguages";

import styles from "./ChangeLanguage.module.scss";

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "fr", name: "French" },
  { code: "gr", name: "German" },
  { code: "text1", name: "text1" },
  { code: "text2", name: "text2" },
  { code: "text4", name: "text4" },
  { code: "text5", name: "text5" },
  { code: "text6", name: "text6" },
  { code: "text7", name: "text7" },
  { code: "text8", name: "text8" },
  { code: "text9", name: "text9" },
  { code: "text10", name: "text10" },
];

export const ChangeLanguage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredLanguages: { code: string; name: string }[] =
    useFilterLanguages(languages, searchQuery);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Выбор языка</h2>

      <div className={styles.wrap}>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск языка..."
          className={`${styles.searchInput}`}
        />

        <div className={styles.languagesList}>
          {filteredLanguages.map((language) => (
            <div
              key={language.code}
              className={styles.languageItem}
              onClick={() => setSearchQuery(language.name)}
            >
              {language.name}
            </div>
          ))}
        </div>
      </div>

      <button className={styles.saveButton}>Сохранить</button>
    </div>
  );
};
