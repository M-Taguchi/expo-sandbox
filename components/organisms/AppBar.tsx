import React, { useRef, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Appbar, Drawer, Menu } from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Header = ({ route, options, navigation }: any) => {
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : route.name;

  const [openMore, setOpenMore] = useState(false);

  return (
    <>
      <Appbar.Header>
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
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
        </Menu>
      </Appbar.Header>
    </>
  );
};

export const AppBar: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Search"
      screenOptions={{
        header: ({ route, options, navigation }) => (
          <Header route={route} options={options} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="Search"
        children={() => (
          <View>
            <Text>Feed</Text>
          </View>
        )}
        options={{ headerTitle: "Search" }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
