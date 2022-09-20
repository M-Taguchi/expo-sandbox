import { Appbar, Drawer, Menu } from "react-native-paper";
import { DrawerContentScrollView } from "@react-navigation/drawer";

export const DrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="First Item"
          // active={active === "first"}
          onPress={() => console.log("first")}
        />
        <Drawer.Item
          label="Second Item"
          // active={active === "second"}
          onPress={() => console.log("second")}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};
