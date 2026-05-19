import { CATALOG_CATEGORIES } from "./catalogCategories";

export type BouquetCategory = {
  key: string; // то, что хранится в БД и летит в API
  title: string; // человекочитаемое
  slug: string;
  description?: string;
};

const getApiCategory = (slug: string, fallbackKey: string, fallbackTitle: string) => {
  const category = CATALOG_CATEGORIES.find((item) => item.slug === slug);
  const apiKey = category?.filter.type === "apiKey" ? category.filter.apiKey : fallbackKey;

  return {
    key: apiKey,
    title: category?.shortTitle ?? category?.title ?? fallbackTitle,
    slug: category?.slug ?? slug,
    description: category?.description,
  };
};

export const BOUQUET_CATEGORIES = {
  POP: getApiCategory("popular", "Популярное", "Популярное"),
  ROSES: getApiCategory("roses", "Розы", "Розы"),
  CHRYSANTHEMUMS: getApiCategory("chrysanthemums", "Хризантемы", "Хризантемы"),
  PEONIES: getApiCategory("peonies", "Пионы", "Пионы"),
  STABLE: getApiCategory("long-lasting", "Стойкие", "Стойкие"),
  GRADUATION: getApiCategory("graduation", "Выпускной", "Выпускной"),
  AUTHORS: getApiCategory("author-bouquets", "Авторские букеты", "Авторские"),
  PREMIUM: getApiCategory("premium", "Премиум", "Премиум"),
  LILAC: getApiCategory("lilac", "Сирень", "Сирень"),
} as const;

export type BouquetCategoryKey =
  (typeof BOUQUET_CATEGORIES)[keyof typeof BOUQUET_CATEGORIES]["key"];
