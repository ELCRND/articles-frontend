import Link from "next/link";

import styles from "./DashboardLink.module.scss";

type Props = {
  path: string;
  text: string;
  className?: string;
};

export const DashboardLink = ({ path, text, className }: Props) => {
  return (
    <Link href={path} className={`${styles.link} ${className}`}>
      <span>{text}</span>
      <svg
        width="130"
        height="74"
        viewBox="0 0 130 74"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 32C2.23858 32 -2.394e-07 34.2386 0 37C2.394e-07 39.7614 2.23858 42 5 42L5 32ZM128.536 40.5355C130.488 38.5829 130.488 35.4171 128.536 33.4645L96.7157 1.64465C94.7631 -0.307968 91.5973 -0.307968 89.6447 1.64465C87.692 3.59728 87.692 6.7631 89.6447 8.71572L117.929 37L89.6447 65.2843C87.692 67.2369 87.692 70.4027 89.6447 72.3553C91.5973 74.308 94.7631 74.308 96.7157 72.3553L128.536 40.5355ZM5 37L5 42L125 42L125 37L125 32L5 32L5 37Z"
          fill="black"
        />
      </svg>
    </Link>
  );
};
