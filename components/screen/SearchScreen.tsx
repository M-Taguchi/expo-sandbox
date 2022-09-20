import { Platform } from "react-native";
import WebView from "react-native-webview";

export const SearchScreen = () => {
  // BUG: 長押しのイベントが二回発生してしまう
  const injectedJS = `
    const checkSec = 400;
    const targets = document.getElementsByTagName("a");
    function longPress(el,nf,lf,sec){
      let longclick = false;
      let longtap = false;
      let touch = false;
      let timer;
      el.addEventListener('touchstart',()=>{
        touch = true;
        longtap = false;
        timer = setTimeout(() => {
          longtap = true;
          lf();
        }, sec);
      })
      el.addEventListener('touchend',()=>{
        if(!longtap){
          clearTimeout(timer);
          nf();
        }else{
          touch = false;
        }
      })
      
      el.addEventListener('mousedown',()=>{
        if(touch) return;
        longclick = false;
        timer = setTimeout(() => {
          longclick = true;
          lf();
        }, sec);
      })
      el.addEventListener('click',()=>{
        if(touch){
          touch = false;
          return;
        }
        if(!longclick){
          clearTimeout(timer);
          nf();
        }
      });
    }

    const longFunc = () => {
      window.alert("長押し");
    };

    for (let i = 0; i < targets.length; i++){
      longPress(targets[i], () => void 0, longFunc, checkSec);
    }
  `;

  return Platform.OS === "web" ? (
    <>
      <iframe src="https://www.google.com/" width={"100%"} height={"100%"} />
    </>
  ) : (
    <>
      <WebView
        injectedJavaScript={injectedJS}
        source={{ uri: "https://www.google.com/" }}
      />
    </>
  );
};
