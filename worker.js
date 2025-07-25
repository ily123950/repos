export default {
  async fetch(request) {
    const url = new URL(request.url);
    const msg = url.searchParams.get("msg") || "Сообщение не указано";

    const telegramToken = "8229826577:AAHk7_jRQ0W6j4LiJ5tMdc9MWHIDod3Pka8"; // 🔁 ЗАМЕНИ НА СВОЙ
    const chatId = "5531141998"; // ← твой chat_id

    const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    const payload = {
      chat_id: chatId,
      text: msg,
    };

    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return new Response("✅ Сообщение отправлено", { status: 200 });
    } else {
      return new Response("❌ Ошибка Telegram", { status: 500 });
    }
  }
}
