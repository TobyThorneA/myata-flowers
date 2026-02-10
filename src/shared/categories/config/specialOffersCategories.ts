export type SpecialOffer = {
  id: string;              // для URL
  title: string;           // "Розы"
  // bouquetIds: string[];    // РОВНО те 3 букета
};

export const SPECIAL_OFFERS_CATEGORIES: SpecialOffer[] = [
  {
    id: "mixmom",
    title: "Про любовь",
    // bouquetIds: [],
  },
  {
    id: "rosemom",
    title: "Розы",
    // bouquetIds: [],
  },
  {
    id: "pionmom",
    title: "Кустовые Розы",
    // bouquetIds: [],
  },
  {
    id: "hrissmam",
    title: "Хризантемы",
    // bouquetIds: [],
  },
  {
    id: "staymom",
    title: "Стойкие",
    // bouquetIds: [],
  },
  {
    id: "gigamom",
    title: "Гиганты",
    // bouquetIds: [],
  },
  {
    id: "boxmom",
    title: "Композиции",
    // bouquetIds: [],
  },
  {
    id: "avtor",
    title: "Авторские",
    // bouquetIds: [],
  },
];