"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ReadNowArticles } from "@/widgets/read-now-articles/ui/ReadNowArticles/ReadNowArticles";
import { ChangeInfo } from "@/features/user/ui/ChangeInfo/ChangeInfo";
import { ChangeLanguage } from "@/features/user/ui/ChangeLanguage/ChangeLanguage";
import { logout } from "@/features/auth/api/auth-server-actions";
import { UpgradeBanner } from "@/shared/ui/UpgradeBanner/UpgradeBanner";
import { LogoutIcon } from "@/shared/ui/LogoutIcon/LogoutIcon";

import styles from "./Profile.module.scss";
import { ArticleCount } from "@/entities/article/ui/ArticleCount/ArticleCount";

export const Profile = () => {
  const router = useRouter();
  return (
    <section className={`container ${styles.container}`}>
      <ArticleCount className={styles.profileCounter} />

      <div className={styles.title}>
        <h1>Приветствуем Вас!</h1>
        <button
          onClick={() => {
            logout();
            router.replace("/auth");
          }}
        >
          <LogoutIcon />
        </button>
      </div>

      <ChangeInfo />
      <aside className={styles.sidebar}>
        <UpgradeBanner className={styles.upgradeBanner} />
        <ReadNowArticles />
      </aside>

      <div className={styles.links}>
        <Link href={""}>
          <span>Связаться с администрацией</span>
          <svg
            width="44"
            height="24"
            viewBox="0 0 44 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM43.0607 13.0607C43.6464 12.4749 43.6464 11.5251 43.0607 10.9393L33.5147 1.3934C32.9289 0.807611 31.9792 0.807611 31.3934 1.3934C30.8076 1.97919 30.8076 2.92893 31.3934 3.51472L39.8787 12L31.3934 20.4853C30.8076 21.0711 30.8076 22.0208 31.3934 22.6066C31.9792 23.1924 32.9289 23.1924 33.5147 22.6066L43.0607 13.0607ZM2 12V13.5H42V12V10.5H2V12Z"
              fill="#B23D01"
            />
          </svg>
        </Link>
        <Link href={"/profile/my-articles"}>
          <span>Мои статьи</span>
          <svg
            width="44"
            height="24"
            viewBox="0 0 44 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM43.0607 13.0607C43.6464 12.4749 43.6464 11.5251 43.0607 10.9393L33.5147 1.3934C32.9289 0.807611 31.9792 0.807611 31.3934 1.3934C30.8076 1.97919 30.8076 2.92893 31.3934 3.51472L39.8787 12L31.3934 20.4853C30.8076 21.0711 30.8076 22.0208 31.3934 22.6066C31.9792 23.1924 32.9289 23.1924 33.5147 22.6066L43.0607 13.0607ZM2 12V13.5H42V12V10.5H2V12Z"
              fill="#B23D01"
            />
          </svg>
        </Link>
        <Link href={""}>
          <span>Моя реклама</span>
          <svg
            width="44"
            height="24"
            viewBox="0 0 44 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM43.0607 13.0607C43.6464 12.4749 43.6464 11.5251 43.0607 10.9393L33.5147 1.3934C32.9289 0.807611 31.9792 0.807611 31.3934 1.3934C30.8076 1.97919 30.8076 2.92893 31.3934 3.51472L39.8787 12L31.3934 20.4853C30.8076 21.0711 30.8076 22.0208 31.3934 22.6066C31.9792 23.1924 32.9289 23.1924 33.5147 22.6066L43.0607 13.0607ZM2 12V13.5H42V12V10.5H2V12Z"
              fill="#B23D01"
            />
          </svg>
        </Link>
      </div>

      <div className={styles.languages}>
        <ChangeLanguage />
      </div>
    </section>
  );
};
