import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components/organisms/DrawerContent";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import { useSnackBar } from "../hooks/useSnackBar";
import { Root } from "./Root";
const Drawer = createDrawerNavigator();

export const Main = () => {
  const styles = makeStyles();
  const { render } = useSnackBar();
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props: any) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Root} />
      </Drawer.Navigator>
      {render()}
    </SafeAreaView>
  );
};

const makeStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: "lightgrey",
    },
  });
};
