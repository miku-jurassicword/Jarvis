import axios from "axios";

const API_KEY = "AQ.Ab8RN6JcyRt6MZh5-DeF1pyFihXg7bcArrsCc3MG7htQMoLXNA";

export async function perguntarIA(texto) {
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: texto }],
          },
        ],
      }
    );

    return res.data.candidates?.[0]?.content?.parts?.[0]?.text;
  } catch (err) {
    return "Erro na IA 🤖";
  }
}