import type { OrderState } from "../store/slices/orderSlice";

export const sendToTelegram = async (data: OrderState) => {
  if (data.honeypot && data.honeypot.trim() !== "") {
    console.warn("Бот обнаружен, отправка отменена.");
    return;
  }

  const chatId = "7911798658";
  const message = `
    💐 Новая заявка на букет: ${data.bouquetName}
    👤 Имя: ${data.name}
    📞 Телефон: ${data.phone}
        Предпочтительный способ связи: ${data.contactMethod}
    🌸 Предпочтения: ${data.kindOfFlowers}
    💰 Повод: ${data.whomGifts}
    📦 Пожелания по оформлению: ${data.flowerDesign}
  `.trim();

  try {
    const response = await fetch("/api.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        honeypot: data.honeypot,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при отправке в Telegram");
    }

    console.log("Заявка отправлена!");
  } catch (error) {
    console.error("Ошибка Telegram:", error);
  }
};
