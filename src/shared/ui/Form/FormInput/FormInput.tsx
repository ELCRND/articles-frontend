"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./FormInput.module.scss";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={`${styles.formGroup} ${className}`}>
        {label && <label htmlFor={props.id}>{label}</label>}
        <input
          ref={ref}
          {...props}
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
