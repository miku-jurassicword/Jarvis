import * as Speech from "expo-speech";

export function speak(text) {
  Speech.speak(text, {
    language: "pt-BR",
    rate: 1,
  });
}