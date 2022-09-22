import { Platform } from "react-native";
import WebView from "react-native-webview";
import { useWebView } from "../../hooks/useWebView";

export const SearchScreen = () => {
  const { setPageInfo } = useWebView();

  return Platform.OS === "web" ? (
    <>
      <iframe src="https://www.google.com/" width={"100%"} height={"100%"} />
    </>
  ) : (
    <>
      <WebView
        source={{ uri: "https://www.google.com/" }}
        onLoadProgress={(e) => {
          setPageInfo({
            url: e.nativeEvent.url,
            title: e.nativeEvent.title,
          });
        }}
      />
    </>
  );
};
