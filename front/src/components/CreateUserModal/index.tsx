import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ModalContext } from '../../providers/modalContext';
import { RegistUser, UserContext } from '../../providers/userContext';
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
} from './styles';

const registSchema = yup.object({
  completeName: yup.string().required('Nome completo obrigatório'),
  tellphone: yup
    .string()
    .min(14, 'Deve seguir o modelo (99)99999-9999')
    .required('Telefone obrigatório'),
  email: yup.string().email().required('Email obrigatório'),
  password: yup
    .string()
    .min(8, 'Senha deve ter no min 8 caracteres')
    .required('Senha obrigatória'),
  secondEmail: yup.string().email().optional(),
  secondTellphone: yup.string().optional(),
});

export const CreateUserModal = () => {
  const { desactiveModal, activeModal, swithPlaceholder } =
    useContext(ModalContext);
  const { registUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistUser>({
    resolver: yupResolver(registSchema),
  });

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    desactiveModal();
  };

  const switchModal = (e: React.MouseEvent<HTMLElement>) => {
    activeModal('login');
  };

  const regist = async (data: RegistUser) => {
    await registUser(data);
  };

  return (
    <ModalBox>
      <ModalTitle>Cadastro</ModalTitle>
      <ModalCloseBtn onClick={closeModal}>X</ModalCloseBtn>
      <ModalForm onSubmit={handleSubmit(regist)}>
        <ModalFormLabel>Nome Completo</ModalFormLabel>
        <ModalFormInput
          type="text"
          id="completeName"
          className={errors.completeName?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(
            'Seu nome completo',
            errors.completeName?.message
          )}
          {...register('completeName')}
        />

        <ModalFormLabel>Telefone</ModalFormLabel>
        <ModalFormInput
          type="tel"
          id="telphone"
          className={errors.tellphone?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(
            '(99)99999-9999',
            errors.tellphone?.message
          )}
          {...register('tellphone')}
        />
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
        <ModalFormLabel>E-mail Secundário</ModalFormLabel>
        <ModalFormInput
          type="email"
          id="secondEmail"
          className={errors.secondEmail?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(
            'example@mail.com',
            errors.secondEmail?.message
          )}
          {...register('secondEmail')}
        />
        <ModalFormLabel>Telefone Secundário</ModalFormLabel>
        <ModalFormInput
          type="tel"
          id="secondTellphone"
          className={errors.secondTellphone?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(
            '(99)99999-9999',
            errors.secondTellphone?.message
          )}
          {...register('secondTellphone')}
        />
        <ModalFormBtn type="submit">Cadastrar</ModalFormBtn>
      </ModalForm>
      <ModalFooterContainer>
        <ModalFooterText onClick={switchModal}>
          Já é cadastrado na nossa rede? <span>Entre agora!</span>
        </ModalFooterText>
      </ModalFooterContainer>
    </ModalBox>
  );
};
