import { createGlobalStyle } from 'styled-components';
import { FONT_FACE, FONT_FAMILY_PRIMARY, FONT_WEIGHT_REGULAR } from 'ui_library/typography';

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  ${FONT_FACE}

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
