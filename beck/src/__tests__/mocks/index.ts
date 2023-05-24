import { ContactRequest } from '../../interfaces/contact.interfaces';
import {
  UserLoginRequest,
  UserRequest,
} from '../../interfaces/user.interfaces';

const mockedUser: UserRequest = {
  completeName: 'Maria do teste',
  email: 'maria@kenzie.com',
  password: '123maria',
  tellphone: '(55)99999-9999',
  secondEmail: 'maria2@mail.com.br',
  secondTellphone: null,
};

const mockedSecondUser: UserRequest = {
  completeName: 'Pedro do teste',
  email: 'pedro@kenzie.com',
  password: '123pedro',
  tellphone: '(47)88888-8888',
  secondEmail: null,
  secondTellphone: null,
};

const mockedUserLogin: UserLoginRequest = {
  email: 'maria@kenzie.com',
  password: '123maria',
};

const mockedSecondUserLogin: UserLoginRequest = {
  email: 'pedro@kenzie.com',
  password: '123pedro',
};

const mockedContact: ContactRequest = {
  completeName: 'Paulo Marques',
  email: 'paulo@mail.com',
  secondEmail: null,
  tellphone: '(87)12345-6789',
  secondTellphone: null,
};

export {
  mockedUser,
  mockedSecondUser,
  mockedUserLogin,
  mockedSecondUserLogin,
  mockedContact,
};
