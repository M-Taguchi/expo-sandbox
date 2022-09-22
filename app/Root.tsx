import { createStackNavigator } from "@react-navigation/stack";
import { AppBar } from "../components/organisms/AppBar";
import { RootStackParamList } from "../type/routing.type";
import { PageListScreen } from "../components/screen/PageListScreen";
import { SearchScreen } from "../components/screen/SearchScreen";
import { useSnackBar } from "../hooks/useSnackBar";
import { useWebView } from "../hooks/useWebView";
import { useAsyncStorage } from "../hooks/useAsyncStorage";

const Stack = createStackNavigator<RootStackParamList>();

export const Root = () => {
  const { pageInfo } = useWebView();
  const { setWebData } = useAsyncStorage();
  const { openSnack } = useSnackBar();

  const savePage = async () => {
    await setWebData(pageInfo);
    openSnack("ページを保存しました");
  };

  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        header: ({ route, options, navigation }) => (
          <AppBar
            route={route}
            options={options}
            navigation={navigation}
            savePage={savePage}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Search"
        children={() => <SearchScreen />}
        options={{ headerTitle: "Search" }}
      />
      <Stack.Screen
        name="PageList"
        children={() => <PageListScreen />}
        options={{ headerTitle: "PageList" }}
      />
    </Stack.Navigator>
  );
};
