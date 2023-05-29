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

interface IContactsContext {
  contactsList: Contact[];
  setContactsList: React.Dispatch<React.SetStateAction<Contact[]>>;
  getAllContacts: () => Promise<void>;
  registNewContact: (data: RegistContact) => Promise<void>;
}

export const ContactsContext = createContext<IContactsContext>(
  {} as IContactsContext
);

export function ContactsProvider({ children }: ContactsProps) {
  const [contactsList, setContactsList] = useState<Contact[]>([]);

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
    console.log(data);
    try {
      await api.post<Contact>('/contact', data);

      getAllContacts();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <ContactsContext.Provider
      value={{
        contactsList,
        setContactsList,
        getAllContacts,
        registNewContact,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
}
