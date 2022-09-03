/* eslint-disable */
import AsyncStorage from "@react-native-async-storage/async-storage";

/// getters
export async function storeString(key, data) {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(e) {
    // save error
  }
}

export async function storeObject(key, data) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch(e) {
    // save error
  }
}

export async function pullString(key) {
    try {
      return await AsyncStorage.getItem(key)
    } catch(e) {
      // read error
    }
}

export async function pullObject(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch(e) {
    // read error
  }
}