"use client";

import { InputHTMLAttributes, forwardRef } from "react";

import styles from "./FormFileInput.module.scss";

export type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  preview?: string | null;
};

export const FormFileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, className = "", preview, ...props }, ref) => {
    return (
      <div className={`${styles.formGroup} ${className}`}>
        {label && <label htmlFor={props.id}>{label}</label>}

        {preview && (
          <div className={styles.previewContainer}>
            <img src={preview} alt="Preview" className={styles.previewImage} />
          </div>
        )}

        <input
          ref={ref}
          type="file"
          accept="image/*"
          {...props}
          className={`${styles.input} ${error ? styles.errorInput : ""}`}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);
