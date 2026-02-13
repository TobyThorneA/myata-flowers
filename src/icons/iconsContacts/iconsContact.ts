import Max from "../../assets/max.png";
import Telegram from "../../assets/telegram.png";
import WhatsApp from "../../assets/whatsapp.png";
import Phone from "../../assets/phone.png";
import type { ContactMethod } from "types/typesContacts";

export const iconsContacts: Record<ContactMethod, string> = {
  call: Phone,
  telegram: Telegram,
  whatsapp: WhatsApp,
  max: Max,
};