import { Alert, Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";

export const useOpenUrl = () => {
  const openUrlInApp = async (url: string) => {
    // 内部ブラウザで開く場合
    await WebBrowser.openBrowserAsync(url).catch(() => {
      Alert.alert("URLを開けませんでした");
    });
  };

  const openUrlOutApp = async (url: string) => {
    // 外部ブラウザで開く場合
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("無効なURLです。");
          return;
        }

        return Linking.openURL(url);
      })
      .catch(() => {
        Alert.alert("URLを開けませんでした。");
        return;
      });
  };

  return { openUrlInApp, openUrlOutApp };
};
