import axios from 'axios';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../api';
import { ContactsContext } from './contactContext';
import { ModalContext } from './modalContext';

export interface UserData {
  id: string;
  completeName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  tellphone: string;
  secondEmail?: string;
  secondTellphone?: string;
}

export interface RegistUser {
  completeName: string;
  email: string;
  password: string;
  tellphone: string;
  secondEmail?: string;
  secondTellphone?: string;
}

export interface IEditUser {
  completeName?: string;
  email?: string;
  password?: string;
  tellphone?: string;
  secondEmail?: string;
  secondTellphone?: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  getUserData: () => Promise<void>;
  loginUser: (data: LoginUser) => Promise<void>;
  registUser: (data: RegistUser) => Promise<void>;
  updateUser: (data: IEditUser) => Promise<void>;
  deleteUser: () => Promise<void>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData>({} as UserData);
  const { activeModal } = useContext(ModalContext);
  const { getAllContacts, setContactsList } = useContext(ContactsContext);

  const registUser = async (data: RegistUser) => {
    try {
      const response = await api.post('/user', data);
      if (response.data) {
        toast.success('Conta criada com sucesso!');
        activeModal('login');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(`Falha: ${error.message}!`);
      }
    }
  };

  const loginUser = async (data: LoginUser) => {
    try {
      const response = await api.post('/login', data);

      if (response.data.token) {
        localStorage.setItem('@userToken', response.data.token);
        toast.success('Login bem sucedido!');
        await getUserData();
        await getAllContacts();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 401:
            toast.error('Falha: email e/ou senha inválidos!');
            break;
          default:
            toast.error('Falha ao realizar o login!');
            break;
        }
      }
    }
  };

  async function getUserData() {
    try {
      const response = await api.get<UserData>(`/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('@userToken')}`,
        },
      });
      setUserData(response.data);
      if (localStorage.getItem('@userToken')) {
        await getAllContacts();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  }

  const updateUser = async (data: IEditUser) => {
    try {
      await api.patch('/user', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('@userToken')}`,
        },
      });
      toast.success('Conta editada com sucesso!');
      await getUserData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      }
    }
  };

  const deleteUser = async () => {
    try {
      await api.delete(`/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('@userToken')}`,
        },
      });
      
      toast.success('Conta deletada com sucesso!');
      localStorage.clear();
      setUserData({} as UserData);
      setContactsList([]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
        toast.error(error.message);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        registUser,
        loginUser,
        getUserData,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
