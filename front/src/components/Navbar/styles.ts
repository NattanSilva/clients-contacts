import { styled } from 'styled-components';

export const Header = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 1;
  border-bottom: var(--gray-border);
  background-color: var(--bg-black);
`;

export const RegistContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: start;
  }
`;

export const RegistButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--text-gray-100);
  transition: 0.3s ease-in-out;

  &:hover {
    color: var(--text-gray-50);
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

export const RegistText = styled.p`
  font-size: 1rem;

  span {
    text-decoration: underline;
  }
`;

export const NavbarContainer = styled.nav`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserContainer = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const UserName = styled.p`
  color: var(--text-gray-50);
  font-weight: 500;
  font-size: 1.2rem;
`;

export const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--violet-700);
  color: var(--white-full);
  font-weight: bold;
  font-size: 1.5rem;
`;

export const LogoutButton = styled.button`
  width: 5rem;
  height: 1.5rem;
  background-color: var(--green-500);
  border: none;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1rem;
  color: vaer(--text-black);
`;
