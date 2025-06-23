"use client";

import { SelectHTMLAttributes, forwardRef, useState } from "react";

import styles from "./Select.module.scss";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  setSelectValue?: (
    category:
      | "articleName"
      | "email"
      | "category"
      | "theme"
      | "subtheme"
      | "image"
      | "tags"
      | `image.${string}`
      | `tags.${number}`,
    value: string
  ) => void;
};

let a = "123";
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      className = "",
      name,
      options,
      defaultValue,
      setSelectValue,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultValue);

    return (
      <div className={`${styles.formGroup} ${className}`}>
        <button
          type="button"
          className={`${styles.dropdownToggle} ${
            error ? styles.errorInput : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedValue}
          <span
            className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
          ></span>
        </button>

        {isOpen && (
          <ul className={styles.dropdownMenu}>
            {options.map((option) => (
              <li
                key={option.value}
                className={styles.dropdownItem}
                onClick={() => {
                  setSelectedValue(option.value);
                  setIsOpen(false);
                  setSelectValue && setSelectValue("category", option.value);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}

        {label && <label htmlFor={props.id}>{label}</label>}
        <select
          ref={ref}
          {...props}
          className={`${styles.select} ${error ? styles.errorSelect : ""}`}
          // defaultValue={defaultValue}
          value={selectedValue}
          // onChange={(e) => {
          //   const selectedOption = e.target.options[e.target.selectedIndex];
          //   setSelectedValue(selectedOption.textContent || defaultValue);
          // }}
          // style={{ opacity: "0" }}
        >
          {defaultValue && (
            <option value={defaultValue} disabled>
              {defaultValue}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              data-text={option.label}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
