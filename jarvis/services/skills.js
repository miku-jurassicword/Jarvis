import * as Linking from "expo-linking";

export function runSkills(text) {
  const msg = text.toLowerCase();

  if (msg.includes("abrir youtube")) {
    Linking.openURL("https://youtube.com");
    return "Abrindo YouTube ⚡";
  }

  if (msg.includes("abrir whatsapp")) {
    Linking.openURL("whatsapp://send");
    return "Abrindo WhatsApp 📲";
  }

  if (msg.includes("abrir instagram")) {
    Linking.openURL("instagram://");
    return "Abrindo Instagram 📸";
  }

  if (msg.includes("quem é você")) {
    return "Sou o JARVIS, seu sistema inteligente.";
  }

  return null;
}