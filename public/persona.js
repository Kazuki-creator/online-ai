import generatePersonaPrompt from './persona_prompt.js';

console.log("✅ persona.js が実行されました！");

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("persona-submit-btn");
  const inputField = document.getElementById("persona-input");
  const messageEl = document.getElementById("message");

  if (!submitBtn || !inputField || !messageEl) {
    console.error("必要な要素が見つかりません！");
    return;
  }

  submitBtn.addEventListener("click", async () => {
    // ユーザーの入力内容を取得
    const userInput = inputField.value;

    // 入力内容をそのまま画面に表示
    const userInputEl = document.createElement("p");
    userInputEl.textContent = `入力したテキスト: ${userInput}`;
    document.body.appendChild(userInputEl);

    // ユーザー入力からプロンプトを生成し、GPTへ送信
    const promptText = generatePersonaPrompt(userInput);
    messageEl.textContent = "🤖 GPTが考え中…";

    try {
      const response = await fetch("/api/gpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: promptText }),
      });

      const data = await response.json();
      const formattedReply = data.reply.replace(/\n/g, "<br>");
      messageEl.innerHTML = "💡 GPTの答え: " + formattedReply;
    } catch (error) {
      console.error("エラー:", error);
      messageEl.textContent = "⚠️ エラーが発生しました";
    }
  });
});
