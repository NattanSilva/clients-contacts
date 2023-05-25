import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --bg-black: #121215;
    --white-full: #FFF;
    --text-black: #09090A;
    --text-gray-50: #EAEAEA;
    --text-gray-100: #BEBEBF;
    --gray-border: 1px solid #29292E;
    --violet-700: #8257E5;
    --green-500: #04D361;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
    font-family: 'Roboto', sans-serif;
  }

  html, body {
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-black);
  }

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default GlobalStyle;
