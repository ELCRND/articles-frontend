import Link from "next/link";

import styles from "./UpgradeBanner.module.scss";

type Props = {
  className?: string;
};

export const UpgradeBanner = ({ className }: Props) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <h2 className={styles.title}>Обновить до PRO</h2>
      <p className={styles.text}>Читайте статьи без рекламы</p>
      <Link href={""} className={styles.link}>
        Обновить
      </Link>
    </div>
  );
};
