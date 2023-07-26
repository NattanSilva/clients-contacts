import axios from 'axios';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api';

interface ContactsProps {
  children: React.ReactNode;
}

export interface Contact {
  id: string;
  completeName: string;
  email: string;
  tellphone: string;
  createdAt: Date;
  updatedAt: Date;
  secondEmail?: string;
  secondTellphone?: string;
}

export interface RegistContact {
  completeName: string;
  email: string;
  tellphone: string;
  secondEmail?: string;
  secondTellphone?: string;
}

export interface IEditContact {
  completeName?: string;
  email?: string;
  tellphone?: string;
  secondEmail?: string;
  secondTellphone?: string;
}

interface IContactsContext {
  contactsList: Contact[];
  setContactsList: React.Dispatch<React.SetStateAction<Contact[]>>;
  getAllContacts: () => Promise<void>;
  registNewContact: (data: RegistContact) => Promise<void>;
  getOneContact: (id: string) => void;
  editContact: (id: string, data: IEditContact) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  currentContact: Contact | undefined;
}

export const ContactsContext = createContext<IContactsContext>(
  {} as IContactsContext
);

export function ContactsProvider({ children }: ContactsProps) {
  const [contactsList, setContactsList] = useState<Contact[]>([]);
  const [currentContact, setCurrentContact] = useState<Contact>({} as Contact);

  const getAllContacts = async () => {
    try {
      const response = await api.get<Contact[]>(`/contact`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('@userToken')}`,
        },
      });

      setContactsList(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };

  const registNewContact = async (data: RegistContact) => {
    try {
      await api.post<Contact>('/contact', data);
      await getAllContacts();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getOneContact = (id: string) => {
    setCurrentContact(
      contactsList.find((contact) => contact.id === id) || ({} as Contact)
    );
  };

  const editContact = async (id: string, data: IEditContact) => {
    try {
      await api.patch(`/contact/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('@userToken')}`,
        },
      });
      toast.success('Contato editado com sucesso!');
      getAllContacts();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };

  const deleteContact = async (id: string) => {
    try {
      await api.delete(`/contact/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('@userToken')}`,
        },
      });
      toast.success('Contato deletado com sucesso!');
      getAllContacts();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  }

  return (
    <ContactsContext.Provider
      value={{
        contactsList,
        setContactsList,
        getAllContacts,
        registNewContact,
        getOneContact,
        currentContact,
        editContact,
        deleteContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
