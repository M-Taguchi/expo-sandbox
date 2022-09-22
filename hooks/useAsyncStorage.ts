import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { PageInfo } from "../type/pageInfo.type";

export const useAsyncStorage = () => {
  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (err) {
      Alert.alert("データの読み込みに失敗しました");
    }
  };

  const setWebData = async (pageInfo: PageInfo) => {
    try {
      const json = JSON.stringify(pageInfo);

      await AsyncStorage.setItem(`web:${pageInfo.url}+${pageInfo.title}`, json);
    } catch (err) {
      Alert.alert("データの保存に失敗しました");
    }
  };

  const getAllWebData = async () => {
    try {
      const webKeys = (await AsyncStorage.getAllKeys()).filter((key) =>
        key.match(/^web:/)
      );
      const jsonList = await AsyncStorage.multiGet(webKeys);
      const allWebData = jsonList.reduce((newArr, el) => {
        if (el.length < 2 || !el[1]) {
          return newArr;
        }
        return [...newArr, JSON.parse(el[1])];
      }, [] as PageInfo[]);

      return allWebData;
    } catch (err) {
      Alert.alert("データの読み込みに失敗しました");
    }
  };

  const deleteWebData = async (pageInfo: PageInfo) => {
    try {
      const value = await AsyncStorage.removeItem(
        `web:${pageInfo.url}+${pageInfo.title}`
      );
      return value;
    } catch (err) {
      Alert.alert("データの読み込みに失敗しました");
    }
  };

  return { getData, setWebData, getAllWebData, deleteWebData };
};
