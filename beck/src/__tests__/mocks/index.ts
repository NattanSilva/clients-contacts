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

export { mockedUser, mockedSecondUser, mockedUserLogin, mockedSecondUserLogin };
