import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --vh: 100%;
   }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    border: 0;
    padding: 0;
    vertical-align: baseline;
    font: inherit;
    font-size: 100%;
  }
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  *[hidden] {
      display: none;
  }
  body {
    touch-action: manipulation;
    line-height: 1;

    width:32rem;
    height: 56.8rem;
    /* height: 100vh; */
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  /* 위에가 styled-reset 내용 */

  * {
    box-sizing: border-box;
  } 
  html {
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgba(0, 0, 0, 0);
    
    scroll-behavior: smooth;

    font-family: sans-serif;

    user-select: none;

    display: flex;
    justify-content: center;

    /* 미디어쿼리 적용 예정 */
    /* font-size: 62.5%; */

    /* @media (min-width: 1200px){ 
      font-size: 62.5%;
    } */
    @media (min-width: 1000px){ 
      font-size: 70%
    }
    @media (min-width: 931px) and (max-width:999px){ 
      font-size: 62.5%;
    }
    //Surface Pro 7
    @media (min-width: 901px) and (max-width:930px){ 
      font-size:62.5%;
    }
    //
    @media (min-width: 831px) and (max-width:900px){ 
      font-size: 160%;
    }
    //iPad Air
    @media (min-width: 790px) and (max-width:830px){ 
      font-size: 150%;
    }
    //iPad Mini
    @media (min-width: 750px) and (max-width:789px){ 
      font-size: 145%;
    }
    @media (min-width: 600px) and (max-width:749px){ 
      font-size: 100%;
      @media (min-height: 740px) and (max-height: 999px){
            height: 80%!important;
      }
    }
    @media (min-width: 471px) and (max-width:580px){ 
      font-size: 93%;
    }
    //
    @media (min-width: 451px) and (max-width:470px){ 
      font-size: 16px;
    }
    //iPhone XR & Galaxy S20 Ultra & A51/71
    @media (min-width: 410px) and (max-width:450px){ 
      font-size: 83%;
    }
    //iPhone 12 Pro
    @media (min-width: 386px) and (max-width:409px){ 
      font-size: 77%;
    }
    //
    @media (min-width: 384px) and (max-width:385px){ 
      font-size: 75%;
    }
    //iPhone SE
    @media (min-width: 371px) and (max-width:383px){ 
      font-size: 73%;
    }
    @media (min-width:361px) and (max-width: 370px){
      font-size: 70%;
    }
    @media (min-width:331px) and (max-width: 361px){
      font-size: 70%;
   
    }
     //Galaxy S9+
    @media (min-width:301px) and (max-width:330px){
       font-size: 62%;
   
    }
    //Galaxy Fold
    @media (min-width:251px) and (max-width: 300px){ 
      font-size: 54%;
    }

    @media (max-width:250px){
      font-size: 46%;
    }
    
  }
  ul, li {
    padding-left: 0rem;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input, button {
    outline: none; 
    border: none;
    background-color: transparent;
  }
  button {
    cursor: pointer;
    padding: 0;
  }
  input {
    appearance: none;
    
    &:focus {
      outline: none;
    }
  }
`;
