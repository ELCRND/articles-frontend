import { JSONContent } from "@tiptap/react";

export interface IArticle {
  _id: string;
  title: string;
  content: JSONContent;
  plainText: string;
  image?: string;
  views: number;
  comments: number;
  readingTime: number;
  publishedAt: string;
  createdAt: string;
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

export type ArticlePreview = Pick<
  IArticle,
  "_id" | "title" | "author" | "createdAt"
>;

export enum ArticleCategory {
  TECHNOLOGY = "Технолигии",
  SCIENCE = "Наука",
  ART = "Искусство",
  BUSINESS = "Бизнесс",
  HEALTH = "Здоровье",
}

export enum ArticleTag {
  // Исходные теги
  LINUX = "Linux",
  TUTORIAL = "Tutorial",
  RESEARCH = "Исследование",
  INNOVATION = "Инновации",
  WELLNESS = "Здоровье",

  // Технологии и IT
  PYTHON = "Python",
  JAVASCRIPT = "JavaScript",
  REACT = "React",
  DOCKER = "Docker",
  AWS = "AWS",
  STARTUP = "Стартап",
  GITHUB = "GitHub",
  ALGORITHMS = "Алгоритмы",

  // Наука и образование
  SCIENCE = "Наука",
  DISCOVERY = "Открытие",
  EXPERIMENT = "Эксперимент",
  UNIVERSITY = "Университет",
  ONLINE_COURSES = "Онлайн-курсы",

  // Здоровье и образ жизни
  NUTRITION = "Питание",
  MEDITATION = "Медитация",
  YOGA = "Йога",
  RUNNING = "Бег",
  BIOHACKING = "Биохакинг",

  // Бизнес и карьера
  LEADERSHIP = "Лидерство",
  PRODUCTIVITY = "Продуктивность",
  REMOTE_WORK = "Удалённая работа",
  INVESTMENT = "Инвестиции",
  CAREER = "Карьера",

  // Творчество и искусство
  DESIGN = "Дизайн",
  PHOTOGRAPHY = "Фотография",
  WRITING = "Писательство",
  CREATIVITY = "Креативность",
  INSPIRATION = "Вдохновение",

  // Актуальные тренды
  AI = "Искусственный интеллект",
  METAVERSE = "Метавселенная",
  CRYPTO = "Криптовалюта",
  ESG = "ESG",
  WEB3 = "Web3",

  // Разное
  CASE_STUDY = "Кейс",
  OPINION = "Мнение",
  INTERVIEW = "Интервью",
  EVENT = "Событие",
  HISTORY = "История",
}

export enum ArticleTheme {
  PROGRAMMING = "Программирование",
  DESIGN = "Дизайн",
  BIOLOGY = "Биология",
  STARTUPS = "Стартап",
  NUTRITION = "Питание",
  CARS = "Автомобили",
  BIOGRAPHY = "Биографии",
  WINE = "Вино",
  NEWSPAPERS = "Газеты",
  DEMOCRACY = "Демократия",
  FOOD = "Еда",
  PAINTING = "Живопись",
  HEALTH = "Здоровье",
  ART = "Искусство",
  BOOKS = "Книги",
  LITERATURE = "Литература",
  MUSIC = "Музыка",
  SCIENCE = "Наука",
  SOCIETY = "Общество",
  WRITERS = "Писатели",
  RELIGION = "Религия",
  SPORTS = "Спорт",
  THEATER = "Театр",
  PHILOSOPHY = "Философия",
  TECHNOLOGY = "Технологии",
  CINEMA = "Кино",
  TRAVEL = "Путешествия",
  ECONOMICS = "Экономика",
  HISTORY = "История",
  PSYCHOLOGY = "Психология",
  EDUCATION = "Образование",
  FASHION = "Мода",
  GAMING = "Видеоигры",
  POLITICS = "Политика",
  ECOLOGY = "Экология",
  ASTRONOMY = "Астрономия",
  LAW = "Право",
  LINGUISTICS = "Лингвистика",
  ARCHITECTURE = "Архитектура",
  PHOTOGRAPHY = "Фотография",
  MARKETING = "Маркетинг",
  INVESTMENTS = "Инвестиции",
  COOKING = "Кулинария",
  ANIMALS = "Животные",
  GARDENING = "Садоводство",
  MILITARY = "Военное дело",
  AI = "Искусственный интеллект",
  CYBERSECURITY = "Кибербезопасность",
  SPACE = "Космос",
  FINTECH = "Финтех",
  CRYPTO = "Криптовалюты",
  MEDICINE = "Медицина",
  FITNESS = "Фитнес",
  DIY = "Сделай сам",
  HUMOR = "Юмор",
  PARENTING = "Воспитание детей",
  RELATIONSHIPS = "Отношения",
  CAREER = "Карьера",
  MOTIVATION = "Мотивация",
  URBANISM = "Урбанистика",
  FUTUROLOGY = "Футурология",
}

export enum ArticleSubtheme {
  // Исходные подтемы
  WEB_DEVELOPMENT = "Веб-разработка",
  UX_UI = "UX/UI",
  GENETICS = "Генетика",
  FINANCING = "Финансирование",
  FITNESS = "Фитнес",

  // Программирование и IT
  MOBILE_DEVELOPMENT = "Мобильная разработка",
  GAME_DEV = "Разработка игр",
  DATA_SCIENCE = "Data Science",
  BLOCKCHAIN = "Блокчейн",
  DEVOPS = "DevOps",
  CYBERSECURITY = "Кибербезопасность",
  AI_ML = "ИИ и машинное обучение",

  // Дизайн
  GRAPHIC_DESIGN = "Графический дизайн",
  TYPOGRAPHY = "Типографика",
  BRANDING = "Брендинг",
  MOTION_DESIGN = "Моушн-дизайн",

  // Биология и медицина
  NEUROSCIENCE = "Нейробиология",
  ECOLOGY = "Экология",
  MICROBIOLOGY = "Микробиология",
  BIOENGINEERING = "Биоинженерия",

  // Стартапы и бизнес
  VENTURE_CAPITAL = "Венчурные инвестиции",
  ENTREPRENEURSHIP = "Предпринимательство",
  PRODUCT_MANAGEMENT = "Управление продуктом",
  LEAN_STARTUP = "Lean-стартапы",

  // Здоровье и спорт
  YOGA = "Йога",
  NUTRITION = "Питание",
  MENTAL_HEALTH = "Ментальное здоровье",
  EXTREME_SPORTS = "Экстремальные виды спорта",

  // Искусство и культура
  STREET_ART = "Стрит-арт",
  DIGITAL_ART = "Цифровое искусство",
  CLASSIC_MUSIC = "Классическая музыка",
  INDIE_CINEMA = "Независимое кино",

  // Наука и технологии
  QUANTUM_PHYSICS = "Квантовая физика",
  ROBOTICS = "Робототехника",
  NANOTECHNOLOGY = "Нанотехнологии",
  SPACE_EXPLORATION = "Космические исследования",

  // Литература и книги
  SCIENCE_FICTION = "Научная фантастика",
  POETRY = "Поэзия",
  NON_FICTION = "Нон-фикшн",
  BOOK_REVIEWS = "Рецензии на книги",

  // Дополнительные категории
  ETHICAL_HACKING = "Этичный хакинг",
  CRYPTOCURRENCIES = "Криптовалюты",
  SUSTAINABILITY = "Устойчивое развитие",
  PERSONAL_GROWTH = "Саморазвитие",
}
// Тип для ответа API
export type ArticlesResponse = {
  data: IArticle[];
  total: number;
  page: number;
  limit: number;
};

export type CreateArticleDto = {
  articleName: string;
  content: string;
  image?: string;
  category: ArticleCategory;
  theme: ArticleTheme;
  subtheme: ArticleSubtheme;
  tags?: ArticleTag[];
  readingTime?: number;
  published?: boolean;
  authorId?: string;
};
