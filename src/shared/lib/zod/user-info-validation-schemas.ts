import { z } from "zod";

export const userInfoSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username должен содержать минимум 3 символа")
      .max(20, "Username не должен превышать 20 символов")
      .refine((value) => /^[a-zA-Zа-яА-Я_]+$/.test(value), {
        message: "Username может содержать только буквы и подчеркивания",
      }),

    email: z
      .string()
      .min(1, "Email обязателен")
      .email(
        `Некорректный email. Email должен содержать "@" и домен - example@gmail.com`
      )
      .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: 'Email должен содержать "@" и домен',
      }),

    password: z
      .string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .max(32, "Пароль не должен превышать 32 символа")
      .refine((value) => /[a-z]/.test(value), {
        message: "Пароль должен содержать хотя бы одну строчную букву",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Пароль должен содержать хотя бы одну цифру",
      }),

    passwordRepeat: z.string().min(1, "Пожалуйста, подтвердите пароль"),

    accept: z.boolean().refine((val) => val === true, {
      message: "Вы должны принять условия",
    }),
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Пароли не совпадают",
    path: ["passwordRepeat"],
  });

export type UserInfoFormData = z.infer<typeof userInfoSchema>;
