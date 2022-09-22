import { useState } from "react";
import { Appbar, Menu } from "react-native-paper";

export const AppBar = ({ route, options, navigation, savePage }: any) => {
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
              setOpenMore(false);
            }}
            title="ページを保存"
          />
        </Menu>
      </Appbar.Header>
    </>
  );
};
