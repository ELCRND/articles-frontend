import styles from "./EyeIcon.module.scss";

type Props = {
  isVisible: boolean;
  className?: string;
};

export const EyeIcon = ({ isVisible, className }: Props) => {
  return (
    <svg
      className={`${styles.icon} ${className} ${
        isVisible ? styles.visible : ""
      }`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5C5 5 2 12 2 12C2 12 5 19 12 19C19 19 22 12 22 12C22 12 19 5 12 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <line
        x1="4"
        y1="4"
        x2="20"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={styles.strikeThrough}
      />
    </svg>
  );
};
