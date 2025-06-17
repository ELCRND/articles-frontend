import styles from "./Controls.module.scss";

type Props = {
  handleCLick: VoidFunction;
};

export const UnderlineControl = ({ handleCLick }: Props) => {
  return (
    <button onClick={handleCLick} className={styles.underline}>
      U
    </button>
  );
};
