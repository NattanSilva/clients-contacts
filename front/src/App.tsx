import { useContext } from 'react';
import { CreateUserModal } from './components/CreateUserModal';
import { LoginUserModal } from './components/LoginUserModal';
import { ModalContainer } from './components/ModalContainer';
import { Navbar } from './components/Navbar';
import { ModalContext } from './providers/modalContext';

function App() {
  const { modalType } = useContext(ModalContext);
  return (
    <>
      <Navbar />
      {modalType !== '' && (
        <ModalContainer>
          {modalType === 'regist' && <CreateUserModal />}
          {modalType === 'login' && <LoginUserModal />}
        </ModalContainer>
      )}
    </>
  );
}

export default App;
