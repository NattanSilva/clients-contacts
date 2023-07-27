import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --bg-black: #121215;
    --bg-black-50: rgba(0, 0, 0, 0.5);
    --bg-gray-700: #1F1F23;
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

  .generalContainer {
    width: 100vw;
    height: 100vh;
    background-color: var(--bg-black);
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }
`;

export default GlobalStyle;
