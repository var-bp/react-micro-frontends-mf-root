import { createGlobalStyle } from 'styled-components';
import robotoRegular from './static/font/roboto-regular.woff2';

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Roboto Regular';
    src: url(${robotoRegular}) format('woff2');
    font-weight: 400;
    font-display: optional;
  }

  body {
    margin: 0;
    font-family: 'Roboto Regular', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
