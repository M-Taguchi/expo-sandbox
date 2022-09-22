import { Appbar, Drawer, Menu } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { RootStackParamList } from "../../type/routing.type";

export const DrawerContent = (props: any) => {
  const navigation = useNavigation<any>();
  // const nowLocation = useNavigationState((state) => {
  //   if (state && state.index && state.routeNames) {
  //     return state.routeNames[state.index];
  //   }
  //   return undefined;
  // });
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title="">
        <Drawer.Item
          label="検索"
          // active={nowLocation === "Search"}
          onPress={() => navigation.navigate("Search")}
        />
        <Drawer.Item
          label="保存したページ"
          // active={nowLocation === "PageList"}
          onPress={() => navigation.navigate("PageList")}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};
