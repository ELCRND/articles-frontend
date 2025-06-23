"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";

import styles from "./FormTagSelect.module.scss";
import { SelectedTags } from "./SelectedTags/SelectedTags";

export type TagOption = {
  value: string;
  label: string;
};

type Props = {
  options: TagOption[];
  value?: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
  maxTags?: number;
};

export const FormTagSelect = ({
  options,
  value = [],
  onChange,
  onBlur,
  label,
  placeholder = "Выберите теги",
  error,
  disabled = false,
  name,
  maxTags = 5,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const selectRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Фильтруем опции по поисковому запросу и исключаем уже выбранные
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !value.includes(option.value)
  );

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );
  const canAddMore = value.length < maxTags;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onBlur]);

  // useEffect(() => {
  //   if (isOpen && searchRef.current) {
  //     searchRef.current.focus();
  //   }
  // }, [isOpen]);

  // useEffect(() => {
  //   if (isOpen && focusedIndex >= 0 && listRef.current) {
  //     const focusedElement = listRef.current.children[
  //       focusedIndex
  //     ] as HTMLElement;
  //     focusedElement?.scrollIntoView({ block: "nearest" });
  //   }
  // }, [focusedIndex, isOpen]);

  const handleToggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else if (canAddMore) {
      onChange([...value, optionValue]);
    }
  };

  const handleRemoveTag = (tagValue: string) => {
    onChange(value.filter((v) => v !== tagValue));
  };

  return (
    <div className={styles.wrap}>
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
            <span className={`${value.length > 0 ? styles.selected : ""}`}>
              {value.length > 0
                ? `Выбрано тегов: ${value.length}/${maxTags}`
                : placeholder}
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
              <input
                ref={searchRef}
                placeholder="Поиск тегов..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setFocusedIndex(0);
                }}
                className={styles.search}
              />

              <ul ref={listRef} className={styles.dropdownList}>
                {filteredOptions.length === 0 ? (
                  <li className={styles.warning}>
                    {searchTerm
                      ? "Теги не найдены"
                      : canAddMore
                      ? "Все теги выбраны"
                      : "Достигнут лимит тегов"}
                  </li>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = value.includes(option.value);
                    const canSelect = canAddMore || isSelected;

                    return (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() =>
                          canSelect && handleToggleOption(option.value)
                        }
                        onMouseEnter={() => setFocusedIndex(index)}
                      >
                        {option.label}
                        {!canSelect && !isSelected && (
                          <span className={styles.warning}>Лимит</span>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}

          {error && <p className={styles.errorMessage}>{error}</p>}
        </div>
      </div>
      <SelectedTags
        tags={selectedOptions}
        maxTags={maxTags}
        handleRemoveTag={handleRemoveTag}
      />
    </div>
  );
};
