import styles from "./Controls.module.scss";

type Props = {
  handleCLick: VoidFunction;
};

export const BoldControl = ({ handleCLick }: Props) => {
  return (
    <button onClick={handleCLick} className={styles.bold} type="button">
      B
    </button>
  );
};
