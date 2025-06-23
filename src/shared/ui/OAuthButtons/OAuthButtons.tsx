import Link from "next/link";

import { GoogleIcon } from "../GoogleIcon/GoogleIcon";
import { YandexIcon } from "../YandexIcon/YandexIcon";

import styles from "./OAuthButtons.module.scss";

export const OAuthButtons = () => {
  return (
    <div className={styles.oauth}>
      <p className={styles.oauthTitle}>Войти с помощью</p>
      <div className={styles.oauthButtons}>
        <Link href="/auth/google" passHref className={styles.oauthButton}>
          <GoogleIcon />
        </Link>
        <Link href="/auth/yandex" passHref className={styles.oauthButton}>
          <YandexIcon />
        </Link>
      </div>
    </div>
  );
};
