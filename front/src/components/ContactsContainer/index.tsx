import { useContext } from 'react';
import { ModalContext } from '../../providers/modalContext';
import { ContactsList } from '../ContactsList';
import { AddBtn, Main, MainTitle, MainTitleContainer } from './styles';
import { UserContext } from '../../providers/userContext';

export const ContactsContainer = () => {
  const { activeModal } = useContext(ModalContext);
  const { userData} = useContext(UserContext);

  const activeContactModal = (e: React.MouseEvent<HTMLElement>) => {
    activeModal('registContact');
  };

  return (
    <Main>
      <MainTitleContainer>
        <MainTitle>Contatos</MainTitle>
        {userData.id ? (<AddBtn onClick={activeContactModal}>+</AddBtn>) : null}
      </MainTitleContainer>
      <ContactsList />
    </Main>
  );
};
