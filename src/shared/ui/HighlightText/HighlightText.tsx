import styles from "./HighlightText.module.scss";

import { useMemo } from "react";

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

export const HTMLHighlightText = ({
  html,
  query,
}: {
  html: string;
  query?: string | null;
}) => {
  const highlightedHtml = useMemo(() => {
    if (!query) return html;

    const regex = new RegExp(`(${escapeRegExp(query)})`, "gi");
    return html.replace(regex, '<span class="highlight">$1</span>');
  }, [html, query]);

  return <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />;
};
