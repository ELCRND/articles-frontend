"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { GoogleIcon } from "@/shared/ui/GoogleIcon/GoogleIcon";
import { YandexIcon } from "@/shared/ui/YandexIcon/YandexIcon";
import { FormInput } from "@/shared/ui/Form/FormInput/FormInput";
import { PasswordInput } from "@/shared/ui/PasswordInput/PasswordInput";
import {
  registerSchema,
  RegisterFormData,
} from "@/shared/lib/zod/auth-validation-schemas";

import styles from "./RegisterForm.module.scss";
import { authService } from "../../api/auth.service";
import { OAuthButtons } from "@/shared/ui/OAuthButtons/OAuthButtons";

export const RegisterForm = () => {
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

    if (res) {
      toast.success("Регистрация прошла успешно!", { position: "top-center" });
      console.log(res);
    } else {
      toast.error("Ошибка сервера, попробуйте позже.", {
        hideProgressBar: true,
        className: styles.toast,
        position: "bottom-right",
      });
    }
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
        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="example@gmail.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <FormInput
          label="Username"
          id="username"
          type="text"
          placeholder="user"
          error={errors.username?.message}
          {...register("username")}
        />

        <PasswordInput
          label="Password"
          id="password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          label="Re-entry password"
          id="confirmPassword"
          error={errors.passwordRepeat?.message}
          {...register("passwordRepeat")}
        />

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

        <OAuthButtons />
      </form>
    </div>
  );
};
