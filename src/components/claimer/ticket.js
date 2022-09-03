/* eslint-disable */
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function store(key, data) {
  try {
    var d = data
    if ((typeof data).toString() === "object") {
        d = JSON.stringify(data)
    }
    await AsyncStorage.setItem(key, d)
  } catch (e) {
    return null
  }
}

export async function pull(key) {
  try {
    const jvalue = await AsyncStorage.getItem(key)
    return jvalue != null ? JSON.parse(jvalue) : null
  } catch (e) {
    return null
  }
}