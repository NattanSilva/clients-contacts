import { Container } from './styles';

interface ModalContainerProps {
  children: React.ReactNode;
}

export const ModalContainer = ({ children }: ModalContainerProps) => {
  return <Container>{children}</Container>;
};
