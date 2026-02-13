import { iconsContacts } from "../icons/iconsContacts/iconsContact";
import type { ContactMethod } from "types/typesContacts";

export const CONTACTS_METHODS_NAMES = ['call', 'telegram', 'whatsapp', 'max'] as const;

export const contactMethodConfig: Array<{
  value: ContactMethod,
  label: string,
  icon: string
}> = [
  {value: 'call', label: 'Позвонить', icon: iconsContacts.call},
  {value: 'telegram', label: 'Telegram', icon: iconsContacts.telegram},
  {value: 'whatsapp', label: 'WhatsApp', icon: iconsContacts.whatsapp},
  {value: 'max', label: 'Max', icon: iconsContacts.max},
]
