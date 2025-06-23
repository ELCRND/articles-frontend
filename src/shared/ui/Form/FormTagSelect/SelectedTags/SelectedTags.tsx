import { TagOption } from "../FormTagSelect";
import styles from "./SelectedTags.module.scss";

type Props = {
  tags: TagOption[];
  maxTags: number;
  handleRemoveTag: (v: string) => void;
};

export const SelectedTags = ({ tags, maxTags, handleRemoveTag }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.count}>
        Выбранные теги ({tags.length}/{maxTags})
      </div>

      {tags.length === 0 ? (
        <div className={styles.empty}>Теги не выбраны</div>
      ) : (
        <ul className={styles.selectedTags}>
          {tags.map((tag) => (
            <li key={tag.value} className={styles.tag}>
              {tag.label}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.value)}
                className={styles.remove}
              ></button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
