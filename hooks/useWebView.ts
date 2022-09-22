import { atom, useAtom } from "jotai";

const pageInfoAtom = atom({
  url: "https://www.google.com/",
  title: "Google",
});

export const useWebView = () => {
  const [pageInfo, setPageInfo] = useAtom(pageInfoAtom);

  return { pageInfo, setPageInfo };
};
