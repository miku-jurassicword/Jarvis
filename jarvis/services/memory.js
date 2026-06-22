import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveMemory(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getMemory(key) {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}