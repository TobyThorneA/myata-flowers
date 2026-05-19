import { ACTIVE_CATALOG_CATEGORIES } from "../config/catalogCategories";

export const getCategoryByApiKey = (apiKey?: string) => {
  if (!apiKey) return undefined;

  return ACTIVE_CATALOG_CATEGORIES.find((category) => {
    if (category.filter.type !== "apiKey") return false;

    return category.filter.apiKey === apiKey;
  });
};
