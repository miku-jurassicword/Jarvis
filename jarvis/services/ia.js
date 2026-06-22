const API_KEY = "AQ.Ab8RN6LsVQ8UCG0eF-jpe6OnenyvSpZoT4wE-1PrHDpp3t7QAQ";

export async function perguntarIA(texto) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Você é um assistente tipo JARVIS. Responda curto e direto:\n${texto}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    console.log("🔥 GEMINI RAW:", JSON.stringify(data, null, 2));

    if (data?.error) {
      return `ERRO: ${data.error.message}`;
    }

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sem resposta da IA ⚠️"
    );
  } catch (e) {
    return "Erro de conexão ⚠️";
  }
}