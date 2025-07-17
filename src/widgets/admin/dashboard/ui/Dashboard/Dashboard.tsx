"use client";

import { DashboardLink } from "@/shared/ui/DashboardLink/DashboardLink";
import { LogoutButton } from "@/shared/ui/LogoutButton/LogoutButton";

import styles from "./Dashboard.module.scss";

const basePath = "/admin/dashboard";

const links = [
  {
    path: "/admin/dashboard/request-article",
    text: "ЗАПРОС СТАТЬИ",
  },
  {
    path: "ad",
    text: "ЗАПРОС РЕКЛАМЫ",
  },
  {
    path: "articles",
    text: "РАЗДЕЛ СТАТЬИ",
  },
  {
    path: "ads",
    text: "РЕКЛАМА ЗАКАЗАНАЯ",
  },
  {
    path: "call",
    text: "ОБРАЩЕНИЯ",
  },
  {
    path: "questions",
    text: "ВОПРОСЫ",
  },
  {
    path: "comments",
    text: "КОММЕНТАРИИ",
  },
  {
    path: "complaints",
    text: "ЖАЛОБЫ",
  },
  {
    path: "forbidden-words",
    text: "ЗАПРЕЩЕННЫЕ СЛОВА",
  },
  {
    path: "ad-blocks",
    text: "РЕКЛАМНЫЕ БЛОКИ",
  },
  {
    path: "tarifs",
    text: "ТАРИФЫ",
  },
  {
    path: "account",
    text: "ИНФОРМАЦИЯ ОБ АККАУНТЕ",
  },
  {
    path: "agreement",
    text: "ТЕКСТ СОГЛАШЕНИЯ",
  },
  {
    path: "statistics",
    text: "СТАТИСТИКА",
  },
  {
    path: "setting",
    text: "НАСТРОЙКА САЙТА",
  },
];

export const Dashboard = () => {
  return (
    <div className={`container ${styles.container}`}>
      <ul className={`${styles.list}`}>
        {links.map((link) => (
          <li key={link.path + link.text}>
            <DashboardLink path={link.path} text={link.text} />
          </li>
        ))}
      </ul>

      <LogoutButton className={styles.logout} />
    </div>
  );
};
