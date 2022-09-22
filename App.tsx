import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import { Main } from "./app/Main";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
