import type { OrderState } from "../store/slices/orderSlice";

export const sendToTelegram = async (data: OrderState) => {
  // console.log('🚀 /api/telegram/send вызван');
  if (data.honeypot && data.honeypot.trim() !== "") {
    console.warn("Бот обнаружен, отправка отменена.");
    return;
  }

  try {
    const response = await fetch("/api/telegram/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bouquetName: data.bouquetName,
        name: data.name,
        phone: data.phone,
        contactMethod: data.contactMethod,
        kindOfFlowers: data.kindOfFlowers,
        whomGifts: data.whomGifts,
        flowerDesign: data.flowerDesign,
        honeypot: data.honeypot,
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке заявки");
    }

    // console.log("Заявка отправлена!");
  } catch (error) {
    console.error("Ошибка Telegram:", error);
  }
};
