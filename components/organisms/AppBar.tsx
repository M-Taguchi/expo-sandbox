import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { SearchScreen } from "../screen/SearchScreen";
import { PageListScreen } from "../screen/PageListScreen";
import { RootStackParamList } from "../../type/routing.type";

type AppBarProps = {
  savePage: () => void;
};

const Stack = createStackNavigator<RootStackParamList>();

const Header = ({ route, options, navigation, savePage }: any) => {
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : route.name;

  const [openMore, setOpenMore] = useState(false);

  return (
    <>
      <Appbar.Header style={{ marginTop: 0 }}>
        <Appbar.Action
          icon="menu"
          color="white"
          onPress={() => navigation.openDrawer()}
        />
        <Appbar.Content title={title} />
        {/* 三点リーダの中身 */}
        <Menu
          visible={openMore}
          onDismiss={() => setOpenMore(false)}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="white"
              onPress={() => setOpenMore(!openMore)}
            />
          }
        >
          <Menu.Item
            onPress={() => {
              savePage();
            }}
            title="ページを保存"
          />
          <Menu.Item onPress={() => {}} title="Item 2" />
        </Menu>
      </Appbar.Header>
    </>
  );
};

export const AppBar: React.FC<AppBarProps> = ({ savePage }) => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        header: ({ route, options, navigation }) => (
          <Header
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

const styles = StyleSheet.create({});
