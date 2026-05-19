import { ACTIVE_CATALOG_CATEGORIES } from "../config/catalogCategories";

export const getCategoryBySlug = (slug?: string) => {
  if (!slug) return undefined;

  return ACTIVE_CATALOG_CATEGORIES.find((category) => category.slug === slug);
};
