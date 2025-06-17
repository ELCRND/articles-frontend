"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { EyeIcon } from "@/shared/ui/EyeIcon/EyeIcon";
import { GoogleIcon } from "@/shared/ui/GoogleIcon/GoogleIcon";
import { YandexIcon } from "@/shared/ui/YandexIcon/YandexIcon";
import {
  registerSchema,
  RegisterFormData,
} from "@/shared/lib/zod/auth-validation-schemas";

import styles from "./RegisterForm.module.scss";
import { authService } from "../../api/auth.service";
import { toast } from "react-toastify";

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    const { accept, ...registerData } = data;
    const res = await authService.register(registerData);

    if (res)
      toast.success("Регистрация прошла успешно!", { position: "top-center" });

    console.log(res);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`${styles.container}`}>
      <h1 className={styles.title}>Регистрация</h1>
      <p className={styles.subtitle}>Спасибо, что выбрали нас!</p>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className={styles.formGroup}>
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
            <span className={styles.errorMessage}>
              {errors.username.message}
            </span>
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
          {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
        </button>

        <div className={styles.accept}>
          <input type="checkbox" id="accept" {...register("accept")} />
          <label htmlFor="accept">Я принимаю условия </label>
          <Link href={"/"}>Пользовательского соглашения</Link>
          {errors.accept && (
            <span className={styles.errorMessage}>{errors.accept.message}</span>
          )}
        </div>

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
