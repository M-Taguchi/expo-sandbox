import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Platform, StyleSheet, View } from "react-native";
import { Button, IconButton } from "react-native-paper";
import WebView from "react-native-webview";
import { useWebView } from "../../hooks/useWebView";

const INITIAL_URL = "https://www.google.com/";

export const SearchScreen = () => {
  const { setPageInfo } = useWebView();
  const [canGoBack, setCanGoBack] = useState(false);
  const [refresh, setRefresh] = useState(0);
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
      <iframe src={INITIAL_URL} width={"100%"} height={"100%"} />
      <View style={styles.homeButtonView}>
        <IconButton
          style={styles.homeButton}
          icon="home"
          onPress={() => {
            setRefresh(refresh + 1);
          }}
        />
      </View>
    </>
  ) : (
    <>
      <WebView
        key={refresh}
        ref={ref}
        source={{ uri: INITIAL_URL }}
        onLoadProgress={(e) => {
          setCanGoBack(e.nativeEvent.canGoBack);
          setPageInfo({
            url: e.nativeEvent.url,
            title: e.nativeEvent.title,
          });
        }}
      />
      <View style={styles.homeButtonView}>
        <IconButton
          style={styles.homeButton}
          icon="home"
          onPress={() => {
            setRefresh(refresh + 1);
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  homeButton: {
    alignSelf: "center",
  },
  homeButtonView: {
    borderTopWidth: 2,
    borderTopColor: "lightgrey",
  },
});
