/* eslint-disable */
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function store(key, data) {
  try {
    const josnValue = JSON.stringify(data)
    await AsyncStorage.setItem(key, josnValue)
  } catch (e) {
    return null
  }
}

export async function pull(key) {
  try {
    const jvalue = await AsyncStorage.getItem(key)
    return value != null ? JSON.parse(jvalue) : null
  } catch (e) {
    return null
  }
}