"use client";

import { useState } from "react";

import styles from "./Filter.module.scss";

type Props = {
  label: string;
  name: string;
  disabled: boolean;
  items: {
    value: string;
    text: string;
  }[];
  className?: string;
};

const Filter = ({ name, label, items, disabled }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div
        className={`${styles.label} ${isOpen ? styles.open : ""}`}
        onClick={() => setIsOpen((p) => !p)}
      >
        <span>{label}</span>
        <svg
          width="18"
          height="9"
          viewBox="0 0 18 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 1L10.6496 7.56205C9.88121 8.35609 8.61447 8.37652 7.82084 7.60769L1 1"
            stroke="#E3E7D4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {isOpen && (
        <ul className={styles.filter}>
          {items.map((item) => (
            <li key={item.value} className={styles.filter__item}>
              <input
                type="checkbox"
                name={name}
                value={item.value}
                id={item.value + name}
                disabled={disabled}
              />
              <label htmlFor={item.value + name}>
                <div className={styles.filter__checkbox}></div>
                <span>{item.text}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Filter;
