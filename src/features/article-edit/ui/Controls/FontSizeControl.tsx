import { useState } from "react";
import styles from "./Controls.module.scss";

type Props = {
  handleChange: (value: string) => void;
  currentSize?: string;
};

export const FontSizeControl = ({
  handleChange,
  currentSize = "default",
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(currentSize);

  const options = [
    { value: "12px", label: "12" },
    { value: "14px", label: "14" },
    { value: "16px", label: "16" },
    { value: "18px", label: "18" },
    { value: "20px", label: "20" },
    { value: "24px", label: "24" },
    { value: "32px", label: "32" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  return (
    <div className={styles.dropdownContainer}>
      <button
        className={styles.dropdownButton}
        onClick={toggleDropdown}
        type="button"
      >
        <span>A</span>
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <ul className={styles.dropdownList} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => {
                handleChange(option.value);
                closeDropdown();
                setCurrent(option.value);
              }}
              role="option"
              aria-selected={current === option.value}
            >
              <span>{option.label}</span>
              <span
                className={`${styles.checkmark} ${
                  current == option.value ? styles.open : ""
                } `}
              >
                ✓
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
