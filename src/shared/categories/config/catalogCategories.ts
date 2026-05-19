export type CatalogCategoryStatus = "active" | "hidden";

export type CatalogCategorySeo = {
  title: string;
  description: string;
  h1: string;
  canonicalPath: string;
};

export type CatalogCategoryFilter =
  | {
      type: "apiKey";
      apiKey: string;
    }
  | {
      type: "priceMax";
      priceMax: number;
    }
  | {
      type: "priceMin";
      priceMin: number;
    }
  | {
      type: "sameDayDelivery";
    };

export type CatalogCategory = {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  heroText?: string;
  status: CatalogCategoryStatus;
  sortOrder: number;
  showOnHome: boolean;
  showInMenu: boolean;
  filter: CatalogCategoryFilter;
  seo: CatalogCategorySeo;
};

export const CATALOG_CATEGORIES: readonly CatalogCategory[] = [
  {
    id: "popular",
    slug: "popular",
    title: "Популярное",
    description: "Букеты, которые чаще всего выбирают для подарка и доставки.",
    heroText: "Проверенные варианты, если хочется быстро выбрать красивый букет.",
    status: "active",
    sortOrder: 10,
    showOnHome: false,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Популярное",
    },
    seo: {
      title: "Популярные букеты с доставкой",
      description: "Популярные букеты Myata Flowers: свежие цветы, быстрый заказ и доставка.",
      h1: "Популярные букеты",
      canonicalPath: "/catalog/popular",
    },
  },
  {
    id: "roses",
    slug: "roses",
    title: "Розы",
    description: "Классика, которая говорит о чувствах без слов - для особенных моментов.",
    status: "active",
    sortOrder: 20,
    showOnHome: true,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Розы",
    },
    seo: {
      title: "Купить букет роз с доставкой",
      description: "Букеты из роз Myata Flowers: свежие розы, аккуратная сборка и доставка.",
      h1: "Букеты из роз",
      canonicalPath: "/catalog/roses",
    },
  },
  {
    id: "chrysanthemums",
    slug: "chrysanthemums",
    title: "Хризантемы",
    description: "Пышные и яркие букеты для выразительного подарка.",
    status: "active",
    sortOrder: 30,
    showOnHome: true,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Хризантемы",
    },
    seo: {
      title: "Купить букет хризантем с доставкой",
      description: "Букеты из хризантем Myata Flowers: яркие, стойкие и свежие композиции.",
      h1: "Букеты из хризантем",
      canonicalPath: "/catalog/chrysanthemums",
    },
  },
  {
    id: "peonies",
    slug: "peonies",
    title: "Пионы",
    description: "Нежные сезонные букеты с пионами для красивого и запоминающегося подарка.",
    status: "active",
    sortOrder: 35,
    showOnHome: true,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Пионы",
    },
    seo: {
      title: "Купить букет пионов с доставкой",
      description: "Букеты из пионов Myata Flowers: свежие сезонные цветы и бережная сборка.",
      h1: "Букеты из пионов",
      canonicalPath: "/catalog/peonies",
    },
  },
  {
    id: "spray-roses",
    slug: "spray-roses",
    title: "Кустовые розы",
    description: "Нежные букеты из кустовых роз для теплого и живого подарка.",
    status: "active",
    sortOrder: 40,
    showOnHome: false,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Кустовые Розы",
    },
    seo: {
      title: "Купить букет кустовых роз с доставкой",
      description: "Букеты из кустовых роз Myata Flowers: нежные оттенки и свежая сборка.",
      h1: "Букеты из кустовых роз",
      canonicalPath: "/catalog/spray-roses",
    },
  },
  {
    id: "long-lasting",
    slug: "long-lasting",
    title: "Стойкие",
    description: "Букеты, которые дольше сохраняют свежий вид.",
    status: "active",
    sortOrder: 50,
    showOnHome: true,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Стойкие",
    },
    seo: {
      title: "Стойкие букеты с доставкой",
      description: "Стойкие букеты Myata Flowers: свежие цветы, которые радуют дольше.",
      h1: "Стойкие букеты",
      canonicalPath: "/catalog/long-lasting",
    },
  },
  {
    id: "seasonal",
    slug: "seasonal",
    title: "Сезонные",
    description: "Самые свежие цветы по лучшей цене - только в сезон.",
    status: "active",
    sortOrder: 60,
    showOnHome: true,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Сезонные",
    },
    seo: {
      title: "Сезонные букеты с доставкой",
      description: "Сезонные букеты Myata Flowers: актуальные цветы и свежие сочетания.",
      h1: "Сезонные букеты",
      canonicalPath: "/catalog/seasonal",
    },
  },
  {
    id: "graduation",
    slug: "graduation",
    title: "Выпускной / Последний звонок",
    shortTitle: "Выпускной",
    description: "Букеты для выпускников, учителей и торжественной линейки.",
    heroText: "Подборка букетов для выпускного, последнего звонка и благодарности учителю.",
    status: "active",
    sortOrder: 65,
    showOnHome: true,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Выпускной",
    },
    seo: {
      title: "Букеты на выпускной и последний звонок",
      description:
        "Букеты на выпускной и последний звонок Myata Flowers: для выпускников, учителей и родителей.",
      h1: "Букеты на выпускной и последний звонок",
      canonicalPath: "/catalog/graduation",
    },
  },
  {
    id: "author-bouquets",
    slug: "author-bouquets",
    title: "Авторские букеты",
    shortTitle: "Авторские",
    description: "Стильные букеты с характером и выразительной сборкой.",
    status: "active",
    sortOrder: 70,
    showOnHome: true,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Авторские букеты",
    },
    seo: {
      title: "Авторские букеты с доставкой",
      description: "Авторские букеты Myata Flowers: необычные сочетания и свежие цветы.",
      h1: "Авторские букеты",
      canonicalPath: "/catalog/author-bouquets",
    },
  },
  {
    id: "flower-boxes",
    slug: "flower-boxes",
    title: "Композиции",
    description: "Эффектные цветочные композиции, которые удобно дарить и ставить дома.",
    status: "active",
    sortOrder: 80,
    showOnHome: true,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Композиции",
    },
    seo: {
      title: "Цветочные композиции с доставкой",
      description: "Композиции Myata Flowers: готовые цветочные подарки с доставкой.",
      h1: "Цветочные композиции",
      canonicalPath: "/catalog/flower-boxes",
    },
  },
  {
    id: "under-3000",
    slug: "under-3000",
    title: "Букеты до 3000 рублей",
    shortTitle: "До 3000",
    description: "Аккуратные букеты для подарка в понятном бюджете.",
    status: "active",
    sortOrder: 90,
    showOnHome: false,
    showInMenu: true,
    filter: {
      type: "priceMax",
      priceMax: 3000,
    },
    seo: {
      title: "Букеты до 3000 рублей с доставкой",
      description: "Букеты до 3000 рублей Myata Flowers: свежие цветы и быстрый заказ.",
      h1: "Букеты до 3000 рублей",
      canonicalPath: "/catalog/under-3000",
    },
  },
  {
    id: "under-5000",
    slug: "under-5000",
    title: "Букеты до 5000 рублей",
    shortTitle: "До 5000",
    description: "Красивые букеты в среднем бюджете для важных поводов.",
    status: "active",
    sortOrder: 100,
    showOnHome: false,
    showInMenu: true,
    filter: {
      type: "priceMax",
      priceMax: 5000,
    },
    seo: {
      title: "Букеты до 5000 рублей с доставкой",
      description: "Букеты до 5000 рублей Myata Flowers: свежая сборка и доставка.",
      h1: "Букеты до 5000 рублей",
      canonicalPath: "/catalog/under-5000",
    },
  },
  {
    id: "premium",
    slug: "premium",
    title: "Премиум",
    shortTitle: "Премиум",
    description: "Большие и выразительные букеты для особенных случаев и важных подарков.",
    status: "active",
    sortOrder: 110,
    showOnHome: true,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Премиум",
    },
    seo: {
      title: "Премиальные букеты с доставкой",
      description: "Премиальные букеты Myata Flowers: крупные композиции и свежие цветы.",
      h1: "Премиальные букеты",
      canonicalPath: "/catalog/premium",
    },
  },
  {
    id: "lilac",
    slug: "lilac",
    title: "Сирень",
    description: "Ароматные сезонные букеты с сиренью, подготовленные для отдельной подборки.",
    status: "active",
    sortOrder: 115,
    showOnHome: false,
    showInMenu: true,
    filter: {
      type: "apiKey",
      apiKey: "Сирень",
    },
    seo: {
      title: "Купить букет сирени с доставкой",
      description: "Букеты с сиренью Myata Flowers: ароматные сезонные композиции с доставкой.",
      h1: "Букеты с сиренью",
      canonicalPath: "/catalog/lilac",
    },
  },
  {
    id: "same-day-delivery",
    slug: "same-day-delivery",
    title: "Доставка сегодня",
    description: "Букеты, которые можно заказать для быстрой доставки сегодня.",
    status: "active",
    sortOrder: 120,
    showOnHome: false,
    showInMenu: true,
    filter: {
      type: "sameDayDelivery",
    },
    seo: {
      title: "Букеты с доставкой сегодня",
      description: "Букеты Myata Flowers с быстрой доставкой сегодня.",
      h1: "Букеты с доставкой сегодня",
      canonicalPath: "/catalog/same-day-delivery",
    },
  },
];

export const ACTIVE_CATALOG_CATEGORIES = CATALOG_CATEGORIES.filter(
  (category) => category.status === "active",
);

export const HOME_CATALOG_CATEGORIES = ACTIVE_CATALOG_CATEGORIES.filter(
  (category) => category.showOnHome,
);

export const MENU_CATALOG_CATEGORIES = ACTIVE_CATALOG_CATEGORIES.filter(
  (category) => category.showInMenu,
);
