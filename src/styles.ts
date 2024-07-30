import { createGlobalStyle, css, FlattenSimpleInterpolation } from 'styled-components';

const setGlobalStyles = (): FlattenSimpleInterpolation => css`
  :root {
    --data-test: true;
    --header-bg-color: #4b6ece;
    --skeleton-wrapper-bg: #f9fafb;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  menu,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    border: 0;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
    overflow: hidden;
  }

  /* HTML5 hidden-attribute fix for newer browsers */

  *[hidden] {
    display: none;
  }

  * {
    box-sizing: border-box;
    color: black;
  }

  body {
    background-color: white;
    color: black;
    line-height: 1;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  menu,
  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body,
  #root {
    background: linear-gradient(180deg, #001, #000) !important;
    background-size: 150% 150%;
    height: 100%;
  }
`;

const GlobalStyle = createGlobalStyle(setGlobalStyles);

export default GlobalStyle;
