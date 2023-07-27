import { useContext } from 'react';
import { ContactsContainer } from './components/ContactsContainer';
import { CreateContactModal } from './components/CreateContactModal';
import { CreateUserModal } from './components/CreateUserModal';
import { EditContactModal } from './components/EditContactModal';
import { LoginUserModal } from './components/LoginUserModal';
import { ModalContainer } from './components/ModalContainer';
import { Navbar } from './components/Navbar';
import { ContactsContext } from './providers/contactContext';
import { ModalContext } from './providers/modalContext';
import { EditUserModal } from './components/EditUserModal';
import { UserInfoModal } from './components/UserInfoModal';

function App() {
  const { modalType } = useContext(ModalContext);
  return (
    <div className="generalContainer">
      <Navbar />
      <ContactsContainer />
      {modalType !== '' && (
        <ModalContainer>
          {modalType === 'regist' && <CreateUserModal />}
          {modalType === 'login' && <LoginUserModal />}
          {modalType === 'registContact' && <CreateContactModal />}
          {modalType === 'editContact' && <EditContactModal />}
          {modalType === 'infoUser' && <UserInfoModal />}
          {modalType === 'editUser' && <EditUserModal />}
        </ModalContainer>
      )}
    </div>
  );
}

export default App;
