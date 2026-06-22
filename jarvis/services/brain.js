import { runSkills } from "./skills";
import { perguntarIA } from "./ia";
import { saveMemory } from "./memory";

export async function brain(text) {
  const skill = runSkills(text);
  if (skill) return skill;

  // guarda histórico simples
  await saveMemory("last_input", text);

  const ia = await perguntarIA(text);
  return ia;
}