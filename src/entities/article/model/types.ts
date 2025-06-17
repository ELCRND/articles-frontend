export interface IArticle {
  _id: string;
  title: string;
  content: string;
  image?: string;
  views: number;
  comments: number;
  readingTime: number;
  publishedAt?: string;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
  tags: [keyof typeof ArticleTag];
  category: keyof typeof ArticleCategory;
  theme: `${ArticleTheme}`;
  subtheme: `${ArticleSubtheme}`;
}

export enum ArticleTag {
  LINUX = "Linux",
  TUTORIAL = "Tutorial",
  RESEARCH = "Исследование",
  INNOVATION = "Инновации",
  WELLNESS = "Здоровье",
}

export enum ArticleCategory {
  TECHNOLOGY = "Технолигии",
  SCIENCE = "Наука",
  ART = "Искусство",
  BUSINESS = "Бизнесс",
  HEALTH = "Здоровье",
}

export enum ArticleTheme {
  PROGRAMMING = "Программирование",
  DESIGN = "Дизайн",
  BIOLOGY = "Биология",
  STARTUPS = "Стартап",
  NUTRITION = "Питание",
}

export enum ArticleSubtheme {
  WEB_DEVELOPMENT = "Веб-разработка",
  UX_UI = "UX_UI",
  GENETICS = "Генетика",
  FINANCING = "Финансирование",
  FITNESS = "Фитнес",
}

// Тип для ответа API
export interface ArticlesResponse {
  data: IArticle[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateArticleDto {
  title: string;
  content: string;
  image?: string;
  category: ArticleCategory;
  theme: ArticleTheme;
  subtheme: ArticleSubtheme;
  tags?: ArticleTag[];
  readingTime?: number;
  published?: boolean;
  authorId: string;
}
