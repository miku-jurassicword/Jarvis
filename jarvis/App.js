import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import * as Speech from "expo-speech";
import { perguntarIA } from "./services/ia";
import { brain } from "./services/brain";

export default function App() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([]);

  async function send() {
    const ativo = ativadoPorWakeWord(input);
    if (!input) return;

    setMsgs((old) => [...old, { role: "user", text: input }]);

    const ia = await perguntarIA(input);
    const resposta = await brain(input, ia);

    setMsgs((old) => [...old, { role: "ai", text: resposta }]);

    Speech.speak(resposta, {
      language: "pt-BR",
      rate: 1,
    });

    setInput("");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#05070f", padding: 15 }}>

      <Text style={{ color: "#00f5ff", fontSize: 22 }}>
        JARVIS NÍVEL 6 ⚡🤖
      </Text>

      <FlatList
        data={msgs}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: item.role === "user" ? "#00f5ff" : "#111",
              padding: 10,
              marginVertical: 5,
              borderRadius: 10,
              maxWidth: "80%",
            }}
          >
            <Text style={{ color: item.role === "user" ? "#000" : "#fff" }}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Fale com o Jarvis..."
          placeholderTextColor="#666"
          style={{
            flex: 1,
            backgroundColor: "#111",
            color: "#fff",
            padding: 10,
            borderRadius: 10,
          }}
        />

        <TouchableOpacity onPress={send}>
          <Text style={{ color: "#00f5ff", fontSize: 18, marginLeft: 10 }}>
            ➤
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const ativo = ativadoPorWakeWord(input);