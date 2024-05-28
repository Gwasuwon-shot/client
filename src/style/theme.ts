import { DefaultTheme } from "styled-components";

const colors = {
  // 메인컬러
  green1: "#DFF3EF",
  green2: "#B0E0D6",
  green3: "#7DCDBD",
  green4: "#45B9A2",
  green5: "#0DA98E",
  green6: "#00997D",
  green7: "#038F7E",
  green8: "#007C61",
  green9: "#006654",
  green10: "#005042",

  // 서브컬러
  red1: "#FEE8E7",
  red2: "#FFCABA",
  red3: "#FFA78E",
  red4: "#FF8260",
  red5: "#FF5D53",
  red6: "#FE5348",
  red7: "#FF3914",
  red8: "#F9300D",
  red9: "#EB2706",
  red10: "#D30B00",

  //회색
  grey0: "#FFFFFF",
  white: "#FFFFFF",
  grey20: "#F8F9FA",
  grey50: "#F1F3F5",
  grey70: "#E9ECEF",
  grey100: "#DEE2E6",
  grey150: "#CED4DA",
  grey200: "#C1C6CC",
  grey300: "#A9AEB2",
  grey400: "#899199",
  grey500: "#757A80",
  grey600: "#5B6166",
  grey700: "#45494D",
  grey900: "#212529",

  //캘린더
  yellowGreen: "#D3F1C1",
  lightGreen: "#EAF0A4",
  yellow: "#FFF5A8",
  orange: "#FFDBBA",
  red: "#FFCCCC",
  pink: "#FFD9F2",
  purple: "#FE3D2FA",
  skyblue: "#BEECFF",
  blue: "#CCDDFF",
  bluegrey: "#CFDEE5",

  //sementic color
  semantic_red: "#EC583E",
};

export type ColorsTypes = typeof colors;

interface Font {
  weight: number;
  size: number;
  lineHeight: number;
  letterSpacing: number;
}

function FONT({ weight, size, lineHeight, letterSpacing }: Font): string {
  return `
    font-family: "Pretendard";
    font-weight : ${weight};
    font-size : ${size}rem;
    line-height : ${lineHeight}rem;
    letter-spacing : ${letterSpacing}rem;
    `;
}

const fonts = {
  title01: FONT({ weight: 700, size: 2.0, lineHeight: 2.6, letterSpacing: 0 }),
  title02: FONT({ weight: 700, size: 1.6, lineHeight: 2.0, letterSpacing: 0 }),
  title03: FONT({ weight: 500, size: 1.6, lineHeight: 2.0, letterSpacing: 0 }),
  title04: FONT({ weight: 400, size: 2.0, lineHeight: 2.6, letterSpacing: 0 }),

  body01: FONT({ weight: 700, size: 1.4, lineHeight: 1.6, letterSpacing: 0 }),
  body02: FONT({ weight: 500, size: 1.4, lineHeight: 2.0, letterSpacing: 0 }),
  body03: FONT({ weight: 700, size: 1.2, lineHeight: 1.6, letterSpacing: 0 }),
  body04: FONT({ weight: 500, size: 1.2, lineHeight: 1.6, letterSpacing: 0 }),
  body05: FONT({ weight: 400, size: 1.2, lineHeight: 1.6, letterSpacing: 0 }),
  body06: FONT({ weight: 500, size: 1.1, lineHeight: 1.4, letterSpacing: 0 }),
  body07: FONT({ weight: 400, size: 1.1, lineHeight: 1.4, letterSpacing: 0 }),

  caption01: FONT({ weight: 500, size: 1.0, lineHeight: 1.2, letterSpacing: 0 }),
  caption02: FONT({ weight: 500, size: 0.9, lineHeight: 1.0, letterSpacing: -0.075 }),
  caption03: FONT({ weight: 400, size: 0.9, lineHeight: 1.2, letterSpacing: 0 }),
};

export type FontsTypes = typeof fonts;

export const theme: DefaultTheme = {
  colors,
  fonts,
};
