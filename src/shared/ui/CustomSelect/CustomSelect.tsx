"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  name?: string;
};

export function CustomSelect({
  options,
  value,
  onChange,
  onBlur,
  placeholder = "Выберите опцию",
  error,
  disabled = false,
  name,
}: Props) {
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

  //     if (disabled) return;

  //     switch (event.key) {
  //       case "Enter":
  //       case " ":
  //         event.preventDefault();
  //         if (!isOpen) {
  //           setIsOpen(true);
  //           setFocusedIndex(
  //             value ? options.findIndex((opt) => opt.value === value) : 0
  //           );
  //         } else if (focusedIndex >= 0) {
  //           onChange(options[focusedIndex].value);
  //           setIsOpen(false);
  //           buttonRef.current?.focus();
  //         }
  //         break;
  //       case "ArrowDown":
  //         event.preventDefault();
  //         if (!isOpen) {
  //           setIsOpen(true);
  //           setFocusedIndex(
  //             value ? options.findIndex((opt) => opt.value === value) : 0
  //           );
  //         } else {
  //           setFocusedIndex((prev) => (prev + 1) % options.length);
  //         }
  //         break;
  //       case "ArrowUp":
  //         event.preventDefault();
  //         if (!isOpen) {
  //           setIsOpen(true);
  //           setFocusedIndex(
  //             value
  //               ? options.findIndex((opt) => opt.value === value)
  //               : options.length - 1
  //           );
  //         } else {
  //           setFocusedIndex((prev) =>
  //             prev <= 0 ? options.length - 1 : prev - 1
  //           );
  //         }
  //         break;
  //       case "Escape":
  //         setIsOpen(false);
  //         buttonRef.current?.focus();
  //         break;
  //       case "Tab":
  //         setIsOpen(false);
  //         onBlur?.();
  //         break;
  //     }
  //   };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={name ? `${name}-label` : undefined}
      >
        <span>{selectedOption?.label || placeholder}</span>
      </button>

      {isOpen && (
        <ul ref={listRef} role="listbox">
          {options.map((option, index) => (
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
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
