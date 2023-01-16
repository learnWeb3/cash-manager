// import 'expo-dev-client';
import "node-libs-expo/globals";
import { Provider } from "react-redux";
import stores from "./stores";
import * as React from "react";
import AuthLoader from "./components/AuthLoader";
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import AuthenticationRouter from "./components/AuthenticationRouter";
import NetworkManager from "./components/NetworkManager/index";
import { AppContext } from "./contexts/app.context";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5393ff",
    secondary: "#e91e63",
  },
};

export default function App() {
  const [scanner, setScanner] = React.useState({
    toggled: false,
  });
  return (
    <AppContext.Provider
      value={{
        scanner,
        setScanner,
      }}
    >
      <Provider store={stores}>
        <AuthLoader />
        <PaperProvider theme={theme}>
          <NetworkManager>
            <AuthenticationRouter />
          </NetworkManager>
        </PaperProvider>
      </Provider>
    </AppContext.Provider>
  );
}
