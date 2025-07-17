"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { FormInput } from "@/shared/ui/Form/FormInput/FormInput";
import { PasswordInput } from "@/shared/ui/PasswordInput/PasswordInput";
import { OAuthButtons } from "@/shared/ui/OAuthButtons/OAuthButtons";
import {
  loginSchema,
  LoginFormData,
} from "@/shared/lib/zod/auth-validation-schemas";

import { authService } from "../../api/auth.service";

import styles from "./LoginForm.module.scss";

export const LoginForm = () => {
  const router = useRouter();
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

      if (!user) {
        toast.error("Ошибка сервера, попробуйте позже.", {
          hideProgressBar: true,
          className: styles.toast,
          position: "bottom-right",
        });
        return;
      }

      if (user.role === "ADMIN") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/profile");
      }
    } catch (error) {
      console.error("Ошибка входа:", error);
    }
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
        <FormInput
          label="Email"
          id="email"
          type="email"
          placeholder="example@gmail.com"
          error={errors.email?.message}
          {...register("email")}
          className={styles.input}
          defaultValue={"admin@mail.com"}
        />

        <PasswordInput
          label="Password"
          id="password"
          error={errors.password?.message}
          {...register("password")}
          className={styles.input}
          defaultValue={"Admin123"}
        />

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

        <OAuthButtons />
      </form>
    </div>
  );
};
