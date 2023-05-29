import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.tsx';
import { ContactsProvider } from './providers/contactContext.tsx';
import { ModalProvider } from './providers/modalContext.tsx';
import { UserProvider } from './providers/userContext.tsx';
import GlobalStyle from './styles/global';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <ContactsProvider>
      <ModalProvider>
        <UserProvider>
          <GlobalStyle />
          <App />
        </UserProvider>
      </ModalProvider>
    </ContactsProvider>
  </React.StrictMode>
);
