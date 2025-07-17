import {
  ArticleCategory,
  ArticleSubtheme,
  ArticleTag,
  ArticleTheme,
} from "@/entities/article/model/types";
import { z } from "zod";

const ArticleTagKeys = Object.keys(ArticleTag).filter(
  (v): v is keyof typeof ArticleTag => isNaN(Number(v))
);

const optionalImageFileSchema = z
  .instanceof(File)
  .optional()
  .refine(
    (file) => !file || file.size <= 1024 * 1024,
    "Максимальный размер файла - 1MB"
  )
  .refine(
    (file) => !file || file.type.startsWith("image/"),
    "Поддерживаются только изображения"
  );

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(3, "Название статьи должно содержать минимум 3 символа")
    .max(50, "Название статьи не должно превышать 50 символов")
    .refine((value) => /^[a-zA-Zа-яА-ЯёЁ0-9\s_\-]+$/.test(value), {
      message:
        "Название статьи может содержать только буквы, цифры, пробелы, дефисы и подчеркивания",
    })
    .refine((value) => !/^\s|\s$/.test(value), {
      message:
        "Название статьи не должно начинаться или заканчиваться пробелом",
    })
    .refine((value) => !/\s{2,}/.test(value), {
      message: "Название статьи не должно содержать несколько пробелов подряд",
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

  category: z
    .string()
    .min(1, "Пожалуйста, выберите категорию")
    .refine((val) => Object.keys(ArticleCategory).includes(val), {
      message: "Недопустимая категория",
    }),

  theme: z
    .string()
    .min(1, "Пожалуйста, выберите тему")
    .refine((val) => Object.keys(ArticleTheme).includes(val), {
      message: "Недопустимая тема",
    }),

  subtheme: z
    .string()
    .min(1, "Пожалуйста, выберите подтему")
    .refine((val) => !val || Object.keys(ArticleSubtheme).includes(val), {
      message: "Недопустимая подтема",
    }),

  duration: z.string().min(1, "Пожалуйста, выберите срок размещения"),

  image: z
    .any()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files.length === 1,
      "Можно загрузить только один файл"
    )
    .refine(
      (files) => !files || files.length === 0 || files[0]?.size <= 1024 * 1024,
      "Максимальный размер файла - 1MB"
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.type?.startsWith("image/"),
      "Поддерживаются только изображения"
    ),

  content: z.record(z.any()).refine(
    (data) => {
      return data?.content?.length > 0;
    },
    { message: "Содержание статьи обязательно" }
  ),

  tags: z
    .array(
      z.enum(
        ArticleTagKeys as [
          keyof typeof ArticleTag,
          ...(keyof typeof ArticleTag)[]
        ]
      )
    )
    .min(1, "Необходимо выбрать хотя бы один тег")
    .max(5, "Можно выбрать не более 5 тегов")
    .refine((tags) => new Set(tags).size === tags.length, {
      message: "Теги не должны повторяться",
    }),
});

export type CreateArticleFormData = z.infer<typeof createArticleSchema>;
