import { useContext, useEffect } from 'react';
import noUserImg from '../../assets/no-user.svg';
import { ContactsContext } from '../../providers/contactContext';
import { ModalContext } from '../../providers/modalContext';
import { UserContext, UserData } from '../../providers/userContext';
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

export const Navbar = () => {
  const { activeModal } = useContext(ModalContext);
  const { userData, setUserData, getUserData } = useContext(UserContext);
  const { setContactsList } = useContext(ContactsContext);

  const activeRegistModal = (e: React.MouseEvent<HTMLElement>) => {
    activeModal('regist');
  };

  const activeInfoUserModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    activeModal('infoUser');
  };

  const logout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.clear();
    setUserData({} as UserData);
    setContactsList([]);
  };

  useEffect(() => {
    if (localStorage.getItem('@userToken')) {
      getUserData();
    }
  }, []);

  return (
    <Header>
      {!userData?.completeName ? (
        <RegistContainer>
          <RegistButton href="#" onClick={activeRegistModal}>
            <img src={noUserImg} alt="Imagem de usuário vazio" />
            <RegistText>
              <span>Crie sua conta</span> e salve seus contatos!
            </RegistText>
          </RegistButton>
        </RegistContainer>
      ) : (
        <NavbarContainer>
          <UserContainer>
            <UserAvatar onClick={activeInfoUserModal}>
              {userData.completeName[0]}
            </UserAvatar>
            <UserName onClick={activeInfoUserModal}>
              {userData.completeName}
            </UserName>
          </UserContainer>
          <LogoutButton onClick={logout}>Sair</LogoutButton>
        </NavbarContainer>
      )}
    </Header>
  );
};
