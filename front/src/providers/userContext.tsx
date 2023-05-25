import axios from 'axios';
import { createContext, useState } from 'react';
import api from '../api';

interface UserData {
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

export interface LoginUser {
  email: string;
  password: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}

interface IUserContext {
  userData: UserData;
  getUserData: () => Promise<void>;
  loginUser: (data: LoginUser) => Promise<void>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData>({} as UserData);

  const loginUser = async (data: LoginUser) => {
    try {
      const response = await api.post('/login', data);

      if (response.data.token) {
        localStorage.setItem('@userToken', response.data.token);
        alert('Login bem sucedido!');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 401:
            alert('Falha: email e/ou senha inválidos!');
            break;
          default:
            alert('Falha ao realizar o login!');
            break;
        }
      }
    }
  };

  async function getUserData() {
    try {
      const response = await api.get<UserData>(`/user`);
      setUserData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.message);
      }
    }
  }

  return (
    <UserContext.Provider value={{ userData, loginUser, getUserData }}>
      {children}
    </UserContext.Provider>
  );
}
