import { Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AppBar } from "./components/organisms/AppBar";
import { DrawerContent } from "./components/organisms/DrawerContent";
const Drawer = createDrawerNavigator();

export const Main = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props: any) => <DrawerContent {...props} />}
    >
      {/* <AppBar /> */}
      <Drawer.Screen name="Home" component={AppBar} />
    </Drawer.Navigator>
  );
};
