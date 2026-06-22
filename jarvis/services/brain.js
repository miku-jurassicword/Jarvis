import { detectarIntencao } from "./intent";
import { executarSkill } from "./skills";
import { pegar, adicionarHistorico } from "./memory";

export async function brain(input, iaResposta) {
  const intent = detectarIntencao(input);

  // 🧠 salva histórico
  const historico = await adicionarHistorico({
    role: "user",
    text: input,
  });

  // 🔌 tenta skill
  const skill = await executarSkill(intent, input);
  if (skill) {
    await adicionarHistorico({ role: "ai", text: skill });
    return skill;
  }

  // 🧠 pega memória de contexto
  const contexto = historico
    .slice(-5)
    .map((m) => `${m.role}: ${m.text}`)
    .join("\n");

  // 🤖 IA recebe contexto (IMPORTANTE)
  const respostaFinal = `${iaResposta}`;

  await adicionarHistorico({ role: "ai", text: respostaFinal });

  return respostaFinal;
}
export function ativadoPorWakeWord(texto) {
  return texto.toLowerCase().startsWith("jarvis");
}