import { useContext } from 'react';
import { Contact, ContactsContext } from '../../providers/contactContext';
import { ModalContext } from '../../providers/modalContext';
import {
  BtnContainer,
  ContactBtn,
  ContactCamp,
  ListContainer,
  VoidContactList,
} from './styles';

export const ContactsList = () => {
  const { contactsList, getOneContact, deleteContact } =
    useContext(ContactsContext);
  const { activeModal } = useContext(ModalContext);

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
            <ContactCamp>
              Email Secundário:{' '}
              <strong>
                {contact?.secondEmail === undefined
                  ? 'Vazio'
                  : contact?.secondEmail}
              </strong>
            </ContactCamp>
            <ContactCamp>
              Telefone Secundário:{' '}
              <strong>
                {contact?.secondTellphone !== undefined
                  ? 'Vazio'
                  : contact?.secondTellphone}
              </strong>
            </ContactCamp>
            <BtnContainer>
              <ContactBtn
                onClick={(e: any) => {
                  e.preventDefault();
                  getOneContact(contact.id);
                  activeModal('editContact');
                }}
              >
                Editar
              </ContactBtn>
              <ContactBtn onClick={async (e: any) => {
                e.preventDefault()
                await deleteContact(contact.id)
              }}>
                Excluir
              </ContactBtn>
            </BtnContainer>
          </li>
        ))
      ) : (
        <VoidContactList>Você ainda não possui contatos...</VoidContactList>
      )}
    </ListContainer>
  );
};
