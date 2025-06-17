"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  UserInfoFormData,
  userInfoSchema,
} from "@/shared/lib/zod/user-info-validation-schemas";
import { EyeIcon } from "@/shared/ui/EyeIcon/EyeIcon";

import styles from "./ChangeInfo.module.scss";

export const ChangeInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(userInfoSchema),
  });

  const onSubmit = async (data: UserInfoFormData) => {
    try {
      // const res = await userService.login(data);
      // console.log(res);
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className={errors.email ? styles.errorInput : ""}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div> */}

      <div className={styles.formGroup}>
        <label htmlFor="password">New Password</label>
        <div className={styles.passwordInputWrapper}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={errors.password ? styles.errorInput : ""}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.showPasswordButton}
          >
            <EyeIcon isVisible={showPassword} />
          </button>
        </div>
        {errors.password && (
          <span className={styles.errorMessage}>{errors.password.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="user"
          {...register("username")}
          className={errors.username ? styles.errorInput : ""}
        />
        {errors.username && (
          <span className={styles.errorMessage}>{errors.username.message}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Re-entry password</label>
        <div className={styles.passwordInputWrapper}>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            {...register("passwordRepeat")}
            className={errors.passwordRepeat ? styles.errorInput : ""}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles.showPasswordButton}
          >
            <EyeIcon isVisible={showPassword} />
          </button>
        </div>
        {errors.passwordRepeat && (
          <span className={styles.errorMessage}>
            {errors.passwordRepeat.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.submitButton}
      >
        {isSubmitting ? "Сохранение..." : "Сохранить"}
      </button>
    </form>
  );
};
