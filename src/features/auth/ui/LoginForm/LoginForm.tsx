"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { EyeIcon } from "@/shared/ui/EyeIcon/EyeIcon";
import { GoogleIcon } from "@/shared/ui/GoogleIcon/GoogleIcon";
import { YandexIcon } from "@/shared/ui/YandexIcon/YandexIcon";
import {
  loginSchema,
  LoginFormData,
} from "@/shared/lib/zod/auth-validation-schemas";

import { authService } from "../../api/auth.service";

import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await authService.login(data);

      user && router.replace("/profile");
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${styles.container}`}>
      <h1 className={styles.title}>Вход</h1>
      <p className={styles.subtitle}>Рады видеть вас!</p>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.formGroup}>
          <label htmlFor="email">Email / Login</label>
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
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
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
            <span className={styles.errorMessage}>
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? "Вход..." : "Войти"}
        </button>

        <button type="button" className={styles.forgotPasswordButton}>
          Забыли пароль?
        </button>

        <div className={styles.oauth}>
          <p className={styles.oauthTitle}>Войти с помощью</p>
          <div className={styles.oauthButtons}>
            <Link href="/auth/google" passHref className={styles.oauthButton}>
              <GoogleIcon />
            </Link>
            <Link href="/auth/yandex" passHref className={styles.oauthButton}>
              <YandexIcon />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
