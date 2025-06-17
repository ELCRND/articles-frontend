import styles from "./Controls.module.scss";

type Props = {
  handleCLick: VoidFunction;
};

export const ItalicControl = ({ handleCLick }: Props) => {
  return (
    <button onClick={handleCLick} className={styles.italic}>
      I
    </button>
  );
};
