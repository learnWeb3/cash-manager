import AsyncStorage from '@react-native-async-storage/async-storage';

export class LocalStorage {
    static async storeData(key, value) {
        return await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
    }

    static async getData(key) {
        return await AsyncStorage.getItem(key)
    }

    static async removeData(key) {
        await AsyncStorage.removeItem(key)
    }
}