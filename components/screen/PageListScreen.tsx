import { Fragment, useEffect, useState } from "react";
import { Divider, IconButton, List, Text } from "react-native-paper";
import { useAsyncStorage } from "../../hooks/useAsyncStorage";
import { useOpenUrl } from "../../hooks/useOpenUrl";
import { PageInfo } from "../../type/pageInfo.type";

export const PageListScreen: React.FC = () => {
  const [pageInfoList, setPageInfoList] = useState<PageInfo[] | undefined>(
    undefined
  );
  const [reload, setReload] = useState(true);
  const { openUrlInApp } = useOpenUrl();
  const { getAllWebData, deleteWebData } = useAsyncStorage();

  const openUrl = (url: string) => {
    openUrlInApp(url);
  };

  const deletePageInfo = (pageInfo: PageInfo) => {
    deleteWebData(pageInfo);
    setReload(true);
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

  return !pageInfoList || pageInfoList.length === 0 ? (
    <Text>データがありません</Text>
  ) : (
    <>
      {pageInfoList.map((pageInfo, index) => {
        return (
          <Fragment key={index}>
            <List.Item
              title={<Text>{pageInfo.title}</Text>}
              description={
                <Text style={{ color: "blue" }}>{pageInfo.url}</Text>
              }
              onPress={() => openUrl(pageInfo.url)}
              right={() => (
                <IconButton
                  icon="close"
                  onPress={() => deletePageInfo(pageInfo)}
                />
              )}
            />
            <Divider />
          </Fragment>
        );
      })}
    </>
  );
};
