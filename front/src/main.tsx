import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { UserProvider } from './providers/userContext.tsx';
import GlobalStyle from './styles/global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <GlobalStyle />
      <App />
    </UserProvider>
  </React.StrictMode>
);
