import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { brain } from "./services/brain";
import { speak } from "./services/voice";

export default function App() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [status, setStatus] = useState("idle");

  async function send() {
    if (!input.trim()) return;

    const text = input.trim();
    setInput("");

    setMsgs((old) => [...old, { role: "user", text }]);
    setStatus("thinking");

    const response = await brain(text);

    setMsgs((old) => [...old, { role: "ai", text: response }]);

    setStatus("speaking");
    speak(response);

    setStatus("idle");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >

      <Text style={styles.title}>JARVIS CORE SYSTEM ⚡</Text>
      <Text style={styles.status}>{status.toUpperCase()}</Text>

      <FlatList
        data={msgs}
        keyExtractor={(_, i) => i.toString()}
        contentContainerStyle={{ paddingBottom: 110 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.msg,
              item.role === "user" ? styles.user : styles.ai,
            ]}
          >
            <Text style={{ color: "#fff" }}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputBar}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Fale com o Jarvis..."
          placeholderTextColor="#666"
          style={styles.input}
        />

        <TouchableOpacity onPress={send}>
          <Text style={{ color: "#00D9FF", fontSize: 18 }}>➤</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#05070A",
    padding: 15,
  },

  title: {
    color: "#00D9FF",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  status: {
    color: "#00D9FF",
    textAlign: "center",
    opacity: 0.5,
    marginBottom: 10,
  },

  msg: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    maxWidth: "80%",
    borderWidth: 1,
    borderColor: "#00D9FF33",
  },

  user: {
    alignSelf: "flex-end",
    backgroundColor: "#00D9FF22",
  },

  ai: {
    alignSelf: "flex-start",
    backgroundColor: "#111",
  },

  inputBar: {
    position: "absolute",
    bottom: 15,
    left: 12,
    right: 12,
    flexDirection: "row",
    backgroundColor: "#0C0F14",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00D9FF33",
  },

  input: {
    flex: 1,
    color: "#fff",
    paddingHorizontal: 10,
  },
};