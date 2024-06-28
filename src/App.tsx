import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import "./core/notification/settingFCM";
import { GlobalStyle } from "./style/globalStyle";
import { theme } from "./style/theme";
import REACTGA from "react-ga4";

export default function App() {
  REACTGA.initialize(import.meta.env.VITE_APP_GOOGLE_ANALYTICS);

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}
