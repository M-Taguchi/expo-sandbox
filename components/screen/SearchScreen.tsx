import { useFocusEffect } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { BackHandler, Platform } from "react-native";
import WebView from "react-native-webview";
import { useWebView } from "../../hooks/useWebView";

export const SearchScreen = () => {
  const { setPageInfo } = useWebView();
  const [canGoBack, setCanGoBack] = useState(false);
  const ref = useRef<WebView>(null);

  const onBack = () => {
    if (canGoBack) {
      ref.current?.goBack();
      return true;
    }

    return false;
  };

  useFocusEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onBack);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onBack);
    };
  });

  return Platform.OS === "web" ? (
    <>
      <iframe src="https://www.google.com/" width={"100%"} height={"100%"} />
    </>
  ) : (
    <>
      <WebView
        ref={ref}
        source={{ uri: "https://www.google.com/" }}
        onLoadProgress={(e) => {
          setCanGoBack(e.nativeEvent.canGoBack);
          setPageInfo({
            url: e.nativeEvent.url,
            title: e.nativeEvent.title,
          });
        }}
      />
    </>
  );
};
