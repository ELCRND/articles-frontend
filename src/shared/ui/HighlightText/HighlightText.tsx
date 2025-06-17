import styles from "./HighlightText.module.scss";

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const HighlightText = ({
  text,
  query,
}: {
  text: string;
  query?: string | null;
}) => {
  if (!query || !text) return <>{text}</>;

  const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className={styles.highlight}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
};
