import { useAsyncStorage } from "../../../hooks/useAsyncStorage";
import { useWebView } from "../../../hooks/useWebView";
import { AppBar } from "../AppBar";

export const AppBarContainer = () => {
  const { pageInfo } = useWebView();
  const { setWebData, getAllWebData } = useAsyncStorage();

  const savePage = async () => {
    await setWebData(pageInfo);
  };

  const args = {
    savePage,
  };

  return (
    <>
      <AppBar {...args} />
    </>
  );
};
