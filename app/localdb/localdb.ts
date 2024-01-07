import AsyncStorage from '@react-native-async-storage/async-storage';


export default class LocalDB {

	static async get(name: string){
		try{
			return JSON.parse(await AsyncStorage.getItem(name) || "");
		} catch(e){
			return await AsyncStorage.getItem(name);
		}
	}

	static async set(name: string, value: any){
		return await AsyncStorage.setItem(name, typeof value == "object" ? JSON.stringify(value) : value.toString());
	}

	static async rm(name: string){
		return await AsyncStorage.removeItem(name);
	}

}