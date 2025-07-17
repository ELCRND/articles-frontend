import {
  ArticleCategory,
  ArticleSubtheme,
  ArticleTheme,
} from "@/entities/article/model/types";

export const filtersData = [
  {
    label: "Разделы:",
    name: "categories",
    disabled: false,
    items: [...Object.entries(ArticleCategory)].map((item) => ({
      value: item[0],
      text: item[1],
    })),
  },
  {
    label: "Темы:",
    name: "themes",
    disabled: false,
    items: [...Object.entries(ArticleTheme)].map((item) => ({
      value: item[0],
      text: item[1],
    })),
  },
  {
    label: "Подтемы:",
    name: "subthemes",
    disabled: false,
    items: [...Object.entries(ArticleSubtheme)].map((item) => ({
      value: item[0],
      text: item[1],
    })),
  },
  {
    label: "Оплата:",
    name: "payment",
    disabled: true,
    items: [
      {
        value: "paid",
        text: "Оплачено",
      },
      {
        value: "not-paid",
        text: "Не оплачено ",
      },
    ],
  },
];
