import { useState } from 'react';
import noUserImg from '../../assets/no-user.svg';
import {
  Header,
  LogoutButton,
  NavbarContainer,
  RegistButton,
  RegistContainer,
  RegistText,
  UserAvatar,
  UserContainer,
  UserName,
} from './styles';

interface User {
  completeName: string;
}

export const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);

  const userLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUser({
      completeName: 'Nattan Silva',
    });
  };

  const userLogoff = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setUser(null);
  };

  return (
    <Header>
      {!user ? (
        <RegistContainer>
          <RegistButton href="#" onClick={userLogin}>
            <img src={noUserImg} alt="Imagem de usuário vazio" />
            <RegistText>
              <span>Crie sua conta</span> e salve seus contatos!
            </RegistText>
          </RegistButton>
        </RegistContainer>
      ) : (
        <NavbarContainer>
          <UserContainer>
            <UserAvatar>{user.completeName[0]}</UserAvatar>
            <UserName>{user.completeName}</UserName>
          </UserContainer>
          <LogoutButton onClick={userLogoff}>Sair</LogoutButton>
        </NavbarContainer>
      )}
    </Header>
  );
};
