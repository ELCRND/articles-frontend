"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInput } from "@/shared/ui/Form/FormInput/FormInput";
import { FormFileInput } from "@/shared/ui/Form/FormFileInput/FormFileInput";

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

import { ArticleEditor } from "../ArticleEditor/ArticleEditor";

import { getSelectOptionsFromEnum } from "../../lib/utils";

import styles from "./ArticleCreationForm.module.scss";
import { FormSelect } from "@/shared/ui/Form/FormSelect/FormSelect";
import { FormTagSelect } from "@/shared/ui/Form/FormTagSelect/FormTagSelect";
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
      articleName: "",
      email: "",
      category: "",
      theme: "",
      subtheme: "",
      duration: "",
      tags: [],
    },
  });

  // const [selectedTags, setSelectedTags] = useState<ArticleTag[]>([]);

  const onSubmit = async (data: CreateArticleFormData) => {
    console.log(data, "!");
    try {
      //   const user = await authService.login(data);
      //   user
      //     ? router.replace("/profile")
      //     : toast.error("Ошибка сервера, попробуйте позже.", {
      //         hideProgressBar: true,
      //         className: styles.toast,
      //         position: "bottom-right",
      //       });
    } catch (error) {
      console.error("Ошибка при создании статьи:", data, error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <FormInput
        label="Название статьи *"
        id="articleName"
        type="text"
        placeholder="Добавить название"
        error={errors.articleName?.message}
        {...register("articleName")}
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
        id="image"
        error={errors.image?.message?.toString()}
        preview={
          watch("image")?.[0] ? URL.createObjectURL(watch("image")[0]) : null
        }
        {...register("image")}
      />

      <ArticleEditor className={styles.editor} />

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

      {/* <FormDurationSelect
        options={durationOptions}
        selectedValue={selectedDuration}
        onSelect={setSelectedDuration}
        label="Срок размещения *"
        error={errors.duration?.message}
        placeholder="Выберите срок размещения"
      /> */}

      <button className={styles.submitButton}>
        Предоставить на рассмотрение
      </button>
    </form>
  );
};
