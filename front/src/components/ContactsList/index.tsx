import { useContext, useEffect } from 'react';
import { Contact, ContactsContext } from '../../providers/contactContext';
import { UserContext } from '../../providers/userContext';
import {
  BtnContainer,
  ContactBtn,
  ContactCamp,
  ListContainer,
  VoidContactList,
} from './styles';

export const ContactsList = () => {
  const { contactsList, getAllContacts } = useContext(ContactsContext);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    async function getList() {
      if (localStorage.getItem('@userToken')) {
        await getAllContacts();
      }
    }

    getList();
  }, [userData, getAllContacts]);

  return (
    <ListContainer>
      {contactsList.length > 0 ? (
        contactsList.map((contact: Contact) => (
          <li key={contact.id}>
            <ContactCamp>
              Nome: <strong>{contact?.completeName}</strong>
            </ContactCamp>
            <ContactCamp>
              Numero: <strong>{contact?.tellphone}</strong>
            </ContactCamp>
            <ContactCamp>
              Email: <strong>{contact?.email}</strong>
            </ContactCamp>
            <BtnContainer>
              <ContactBtn>Editar</ContactBtn>
              <ContactBtn>Excluir</ContactBtn>
            </BtnContainer>
          </li>
        ))
      ) : (
        <VoidContactList>Você ainda não possui contatos...</VoidContactList>
      )}
    </ListContainer>
  );
};
