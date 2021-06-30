import { createGlobalStyle } from 'styled-components';
import { FONT_FAMILY_PRIMARY, FONT_WEIGHT_REGULAR } from 'ui_library/typography';
import robotoRegular from './static/font/roboto-regular.woff2';

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Roboto';
    src: url(${robotoRegular}) format('woff2');
    font-weight: 400;
    font-display: optional;
  }

  body {
    margin: 0;
    font-family: ${FONT_FAMILY_PRIMARY};
    font-size: 16px;
    font-weight: ${FONT_WEIGHT_REGULAR};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
