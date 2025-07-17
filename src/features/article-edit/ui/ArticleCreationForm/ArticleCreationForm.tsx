"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ArticleEditor } from "../ArticleEditor/ArticleEditor";
import { FormInput } from "@/shared/ui/Form/FormInput/FormInput";
import { FormFileInput } from "@/shared/ui/Form/FormFileInput/FormFileInput";
import { FormSelect } from "@/shared/ui/Form/FormSelect/FormSelect";
import { FormTagSelect } from "@/shared/ui/Form/FormTagSelect/FormTagSelect";

import {
  ArticleCategory,
  ArticleSubtheme,
  ArticleTag,
  ArticleTheme,
} from "@/entities/article/model/types";
import {
  CreateArticleFormData,
  createArticleSchema,
} from "@/shared/lib/zod/create-article-validation-schemas";

import { getSelectOptionsFromEnum } from "../../lib/utils";

import styles from "./ArticleCreationForm.module.scss";
import { articleService } from "@/entities/article/api/article.service";
const durationOptions = [
  { value: "10", label: "10 дней" },
  { value: "30", label: "30 дней" },
  { value: "90", label: "90 дней" },
  { value: "180", label: "180 дней" },
  { value: "365", label: "1 год" },
];

export const ArticleCreationForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateArticleFormData>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      email: "",
      category: "",
      theme: "",
      subtheme: "",
      content: {},
      duration: "",
      tags: [],
    },
  });

  console.log(errors);

  const onSubmit = async (data: CreateArticleFormData) => {
    console.log(data, "!");
    try {
      const formData = new FormData();

      //  formData.append('title', data.articleName);
      //   formData.append('email', data.email);
      //   formData.append('category', data.category);
      //   formData.append('theme', data.theme);
      //   formData.append('subtheme', data.subtheme);
      //   formData.append('duration', data.duration);
      //   formData.append('tags', JSON.stringify(data.tags));
      //   formData.append('content', JSON.stringify(data.content));

      const response = await articleService.createArticle({
        ...data,
        image: "",
      });

      // if (!response.ok) {
      //   throw new Error('Ошибка при создании статьи');
      // }

      // const result = await response.json();
    } catch (error) {
      console.error("Ошибка при создании статьи:", data, error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormInput
        label="Название статьи *"
        id="title"
        type="text"
        placeholder="Добавить название"
        error={errors.title?.message}
        {...register("title")}
      />
      <FormInput
        label="Email *"
        id="email"
        type="email"
        placeholder="example@gmail.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Controller
        name="category"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormSelect
            name="category"
            options={getSelectOptionsFromEnum(ArticleCategory)}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={"Категория *"}
            placeholder="Выберите категорию"
            error={errors.category?.message}
          />
        )}
      />

      <Controller
        name="theme"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormSelect
            name="theme"
            options={getSelectOptionsFromEnum(ArticleTheme)}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={"Тема *"}
            placeholder="Выберите тему"
            error={errors.theme?.message}
          />
        )}
      />

      <Controller
        name="subtheme"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormSelect
            name="subtheme"
            options={getSelectOptionsFromEnum(ArticleSubtheme)}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={"Подтема *"}
            placeholder="Выберите подтему"
            error={errors.subtheme?.message}
          />
        )}
      />

      <FormFileInput
        disabled
        label="Загрузить изображение"
        // id="image"
        error={errors.image?.message?.toString()}
        // preview={
        //   watch("image")?.[0] ? URL.createObjectURL(watch("image")[0]) : null
        // }
        // {...register("image")}
      />

      <Controller
        name="content"
        control={control}
        render={({ field: { onChange, value } }) => (
          <ArticleEditor onChange={onChange} className={styles.editor} />
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormTagSelect
            name="tags"
            options={getSelectOptionsFromEnum(ArticleTag)}
            value={value || []}
            onChange={onChange}
            onBlur={onBlur}
            label={"Теги *"}
            placeholder="Выбрать"
            error={errors.tags?.message}
            maxTags={5}
          />
        )}
      />

      <Controller
        name="duration"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormSelect
            name="duration"
            options={durationOptions}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={"Срок размещения *"}
            placeholder="Выбрать"
            error={errors.duration?.message}
          />
        )}
      />

      <button className={styles.submitButton}>
        Предоставить на рассмотрение
      </button>
    </form>
  );
};
