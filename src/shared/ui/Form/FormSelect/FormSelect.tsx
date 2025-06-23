"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";

import styles from "./FormSelect.module.scss";

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
};

export const FormSelect = ({
  options,
  value,
  onChange,
  onBlur,
  label,
  placeholder = "Выберите опцию",
  error,
  disabled = false,
  name,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className={styles.formGroup}>
      {label && <label>{label}</label>}
      <div ref={selectRef} className={styles.dropdown}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`${styles.dropdownButton} ${isOpen ? styles.open : ""}`}
        >
          <span className={`${selectedOption?.label ? styles.selected : ""}`}>
            {selectedOption?.label || placeholder}
          </span>
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 9L9 1L0.999999 9"
              stroke="#E3E7D4"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {isOpen && (
          <div className={styles.dropdownListWrapper}>
            <ul ref={listRef} className={styles.dropdownList}>
              {options.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
