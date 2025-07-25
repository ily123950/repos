export default {
  async fetch(request) {
    const url = new URL(request.url);
    const msg = url.searchParams.get("msg") || "Сообщение не указано";

    const telegramToken = "8229826577:AAHk7_jRQ0W6j4LiJ5tMdc9MWHIDod3Pka8";
    const chatIds = ["5531141998", "7093054283"];

    const sendMessage = async (chatId) => {
      const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
      const payload = {
        chat_id: chatId,
        text: msg,
      };
      return fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    };

    // Отправка в оба чата
    const results = await Promise.all(chatIds.map(sendMessage));

    const allOk = results.every(r => r.ok);
    return new Response(
      allOk ? "✅ Сообщение отправлено в оба чата" : "⚠️ Частично не отправлено",
      { status: allOk ? 200 : 207 }
    );
  }
}
