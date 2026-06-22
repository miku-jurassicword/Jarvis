export function detectarIntencao(texto) {
  const t = texto.toLowerCase();

  if (t.includes("abrir")) return "OPEN_APP";
  if (t.includes("lembra")) return "MEMORY_SAVE";
  if (t.includes("qual")) return "MEMORY_GET";
  if (t.includes("modo foco")) return "FOCUS_MODE";
  if (t.includes("pesquisar")) return "SEARCH";

  return "IA";
}