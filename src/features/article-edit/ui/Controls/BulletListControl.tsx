import styles from "./Controls.module.scss";

type Props = {
  handleCLick: VoidFunction;
};

export const BulletListControl = ({ handleCLick }: Props) => {
  return (
    <button onClick={handleCLick} className={styles.order}>
      <svg
        width="24"
        height="24"
        viewBox="-2 -2 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="1" cy="5" r="1" fill="#E3E7D4" />
        <circle cx="1" cy="1" r="1" fill="#E3E7D4" />
        <circle cx="1" cy="9" r="1" fill="#E3E7D4" />
        <path d="M4 5L8 5" stroke="#E3E7D4" strokeLinecap="round" />
        <path d="M4 1L8 1" stroke="#E3E7D4" strokeLinecap="round" />
        <path d="M4 9L8 9" stroke="#E3E7D4" strokeLinecap="round" />
      </svg>
    </button>
  );
};
