import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./AdBanner.module.scss";

type Props = {
  children: ReactNode;
  type: "1x1" | "1x2";
  position: "y1-x2" | "y3-x2";
  image?: string;
};

export const AdBanner = ({ children, type, position, image }: Props) => {
  return (
    <Link
      href={"/"}
      className={`${styles.container} ${styles.container}--${type} ${styles.container}--${position}`}
    >
      {children}
      {image && (
        <Image
          src={image}
          alt=""
          fill
          sizes="100%"
          className={styles.imageBg}
          priority
        />
      )}
    </Link>
  );
};
