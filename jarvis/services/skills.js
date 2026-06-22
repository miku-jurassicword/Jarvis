import * as Linking from "expo-linking";

const skills = {
  youtube: () => {
    Linking.openURL("https://youtube.com");
    return "YouTube aberto.";
  },

  google: () => {
    Linking.openURL("https://google.com");
    return "Google aberto.";
  },
};

export function executarSkill(intent, texto) {
  const t = texto.toLowerCase();

  if (t.includes("youtube")) return skills.youtube();
  if (t.includes("google")) return skills.google();

  return null;
}