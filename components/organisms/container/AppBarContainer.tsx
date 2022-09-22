import { useAsyncStorage } from "../../../hooks/useAsyncStorage";
import { useSnackBar } from "../../../hooks/useSnackBar";
import { useWebView } from "../../../hooks/useWebView";
import { AppBar } from "../AppBar";

export const AppBarContainer = () => {
  const { pageInfo } = useWebView();
  const { setWebData } = useAsyncStorage();
  const { openSnack } = useSnackBar();

  const savePage = async () => {
    await setWebData(pageInfo);
    openSnack("ページを保存しました");
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
