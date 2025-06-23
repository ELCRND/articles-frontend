"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./FormDurationSelect.module.scss";

export type DurationOption = {
  value: string;
  label: string;
};

interface FormDurationSelectProps {
  options: DurationOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  label?: string;
  error?: string;
  className?: string;
  placeholder?: string;
}

export const FormDurationSelect = ({
  options,
  selectedValue,
  onSelect,
  label,
  error,
  className = "",
  placeholder = "Выберите срок",
}: FormDurationSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || placeholder;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.formGroup} ${className}`}>
      {label && <label htmlFor="duration-dropdown">{label}</label>}

      <div className={styles.dropdownWrapper} ref={dropdownRef}>
        <button
          type="button"
          id="duration-dropdown"
          className={`${styles.dropdownToggle} ${
            error ? styles.errorInput : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedLabel}
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
                  onSelect(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
