"use client";

import { forwardRef, useState } from "react";
import { EyeIcon } from "@/shared/ui/EyeIcon/EyeIcon";

import { FormInput, InputProps } from "../Form/FormInput/FormInput";

import styles from "./PasswordInput.module.scss";

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className={styles.passwordInputWrapper}>
        <FormInput
          ref={ref}
          type={showPassword ? "text" : "password"}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.showPasswordButton}
        >
          <EyeIcon isVisible={showPassword} />
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
