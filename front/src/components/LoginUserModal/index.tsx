import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ModalContext } from '../../providers/modalContext';
import { LoginUser, UserContext } from '../../providers/userContext';
import {
  ModalBox,
  ModalCloseBtn,
  ModalFooterContainer,
  ModalFooterText,
  ModalForm,
  ModalFormBtn,
  ModalFormInput,
  ModalFormLabel,
  ModalTitle,
} from '../CreateUserModal/styles';

const loginSchema = yup.object({
  email: yup.string().email().required('Email obrigatório'),
  password: yup
    .string()
    .min(8, 'Deve ter min 8 caracteres')
    .required('Senha obrigatória'),
});

export const LoginUserModal = () => {
  const { desactiveModal, activeModal, swithPlaceholder } =
    useContext(ModalContext);

  const { loginUser, getUserData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    resolver: yupResolver(loginSchema),
  });

  const login = async (data: LoginUser) => {
    await loginUser(data);
    await getUserData();
    desactiveModal();
  };

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    desactiveModal();
  };

  const switchModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    activeModal('regist');
  };

  return (
    <ModalBox>
      <ModalTitle>Login</ModalTitle>
      <ModalCloseBtn onClick={closeModal}>X</ModalCloseBtn>
      <ModalForm onSubmit={handleSubmit(login)}>
        <ModalFormLabel>E-mail</ModalFormLabel>
        <ModalFormInput
          type="email"
          id="email"
          className={errors.email?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(
            'example@mail.com',
            errors.email?.message
          )}
          {...register('email')}
        />
        <ModalFormLabel>Password</ModalFormLabel>
        <ModalFormInput
          type="password"
          id="password"
          className={errors.password?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(
            'sEnh4Secret4',
            errors.password?.message
          )}
          {...register('password')}
        />
        <ModalFormBtn type="submit">Entrar</ModalFormBtn>
      </ModalForm>
      <ModalFooterContainer>
        <ModalFooterText onClick={switchModal}>
          Ainda não possui uma conta? <span>Cadastre-se!</span>
        </ModalFooterText>
      </ModalFooterContainer>
    </ModalBox>
  );
};
