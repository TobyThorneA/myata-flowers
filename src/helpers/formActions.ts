import {
  setName,
  setPhone,
  setBouquetName,
  setKindOfFlowers,
  setWhomGifts,
  setFlowerDesign,
  setHoneypot,
  setContactMethod,
} from "../store/slices/orderSlice";

// Тип поля формы
export type FormFieldName =
  | "name"
  | "phone"
  | "bouquetName"
  | "kindOfFlowers"
  | "whomGifts"
  | "flowerDesign"
  | "honeypot"
  | "contactMethod";

// Карта действий
export const actionMap = {
  name: setName,
  phone: setPhone,
  bouquetName: setBouquetName,
  kindOfFlowers: setKindOfFlowers,
  whomGifts: setWhomGifts,
  flowerDesign: setFlowerDesign,
  honeypot: setHoneypot,
  contactMethod: (value: "call" | "telegram" | "whatsapp" | "") =>
    setContactMethod(value),
} as const;
