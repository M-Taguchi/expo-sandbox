import { Fragment, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Divider, IconButton, List, Searchbar, Text } from "react-native-paper";
import { Icon } from "react-native-paper/lib/typescript/components/Avatar/Avatar";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import { useOpenUrl } from "../../hooks/useOpenUrl";
import { PageInfo } from "../../type/pageInfo.type";

export const PageListScreen: React.FC = () => {
  const [pageInfoList, setPageInfoList] = useState<PageInfo[] | undefined>(
    undefined
  );
  const [searchedPageInfoList, setSearchedPageInfoList] = useState<
    PageInfo[] | undefined
  >(undefined);
  const [reload, setReload] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState<string | undefined>(
    undefined
  );
  const { openUrlInApp } = useOpenUrl();
  const { getAllWebData, deleteWebData } = useAsyncStorage();

  const openUrl = (url: string) => {
    openUrlInApp(url);
  };

  const deletePageInfo = (pageInfo: PageInfo) => {
    deleteWebData(pageInfo);
    setReload(true);
  };

  const searchKeywords = (text: string) => {
    setSearchedKeyword(text);
    const searchedKeywords = text
      .trim()
      .toLowerCase()
      .match(/[^\s]+/g);
    setSearchedPageInfoList(
      pageInfoList?.filter((pageInfo) => {
        return searchedKeywords?.every(
          (keyword) => pageInfo.title.toLowerCase().indexOf(keyword) !== -1
        );
      })
    );
  };

  useEffect(() => {
    if (!reload) return;
    getAllWebData()
      .then((result) => {
        setPageInfoList(result);
      })
      .finally(() => {
        setReload(false);
      });
  }, [reload]);

  const renderList = (pageInfo: PageInfo, index: number) => (
    <Fragment key={index}>
      <List.Item
        title={<Text>{pageInfo.title}</Text>}
        description={<Text style={{ color: "blue" }}>{pageInfo.url}</Text>}
        onPress={() => openUrl(pageInfo.url)}
        right={() => (
          <IconButton icon="close" onPress={() => deletePageInfo(pageInfo)} />
        )}
      />
      <Divider />
    </Fragment>
  );

  return !pageInfoList ? (
    <></>
  ) : pageInfoList.length === 0 ? (
    <View style={styles.noContent}>
      <Text>データがありません</Text>
    </View>
  ) : (
    <>
      <Searchbar
        style={{ margin: 8 }}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
        onSubmitEditing={(e) => searchKeywords(e.nativeEvent.text)}
        clearIcon={() =>
          inputValue && (
            <IconButton
              icon="close"
              color="gray"
              onPress={() => {
                setInputValue("");
                searchKeywords("");
              }}
            />
          )
        }
      />
      {searchedKeyword && <Text>「{searchedKeyword}」の検索結果</Text>}
      {searchedKeyword
        ? searchedPageInfoList &&
          searchedPageInfoList.map((pageInfo, index) => {
            return renderList(pageInfo, index);
          })
        : pageInfoList.map((pageInfo, index) => {
            return renderList(pageInfo, index);
          })}
    </>
  );
};

const styles = StyleSheet.create({
  noContent: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
