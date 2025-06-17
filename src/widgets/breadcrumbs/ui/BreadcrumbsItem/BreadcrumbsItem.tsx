import React from "react";
import Link from "next/link";

import styles from "./BreadcrumbsItem.module.scss";

type Props = {
  href: string;
  children: React.ReactNode;
  isCurrent?: boolean;
  className?: string;
};

export const BreadcrumbsItem = ({
  href,
  children,
  isCurrent = false,
  className = "",
}: Props) => {
  return (
    <li className={`${styles.item} ${className}`}>
      {isCurrent ? (
        <span aria-current="page" className={styles.current}>
          {children}
        </span>
      ) : (
        <Link href={href} className={styles.link}>
          {children}
        </Link>
      )}
    </li>
  );
};
