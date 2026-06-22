import AsyncStorage from "@react-native-async-storage/async-storage";

export async function salvar(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function pegar(key) {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export async function adicionarHistorico(msg) {
  const hist = (await pegar("hist")) || [];
  hist.push(msg);

  // limita memória
  if (hist.length > 20) hist.shift();

  await salvar("hist", hist);
  return hist;
}