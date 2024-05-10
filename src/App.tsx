import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import "./core/notification/settingFCM";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";
import REACTGA from "react-ga4";

export default function App() {
  if (import.meta.env.REACT_APP_GOOGLE_ANALYTICS) {
    REACTGA.initialize(import.meta.env.REACT_APP_GOOGLE_ANALYTICS);
  }

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}
