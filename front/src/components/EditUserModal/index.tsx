import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ModalContext } from '../../providers/modalContext';
import { IEditUser, UserContext } from '../../providers/userContext';
import {
  ModalBox,
  ModalCloseBtn,
  ModalForm,
  ModalFormBtn,
  ModalFormInput,
  ModalFormLabel,
  ModalTitle,
} from '../CreateUserModal/styles';

const registSchema = yup.object({
  completeName: yup.string().optional(),
  tellphone: yup.string().optional(),
  email: yup.string().email().optional(),
  secondEmail: yup.string().email().optional(),
  secondTellphone: yup.string().optional(),
});

export const EditUserModal = () => {
  const { desactiveModal, swithPlaceholder } = useContext(ModalContext);
  const { userData, updateUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUser>({
    resolver: yupResolver(registSchema),
  });

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    desactiveModal();
  };

  const editUser = async (data: IEditUser) => {
    if (data.completeName === '') {
      delete data.completeName;
    }

    if (data.tellphone === '') {
      delete data.tellphone;
    }

    if (data.email === '') {
      delete data.email;
    }

    if (data.secondEmail === '') {
      delete data.secondEmail;
    }

    if (data.secondTellphone === '') {
      delete data.secondTellphone;
    }

    await updateUser(data);
    desactiveModal();
  };

  return (
    <ModalBox>
      <ModalTitle>Editar Usuário</ModalTitle>
      <ModalCloseBtn onClick={closeModal}>X</ModalCloseBtn>
      <ModalForm onSubmit={handleSubmit(editUser)}>
        <ModalFormLabel>Nome Completo</ModalFormLabel>
        <ModalFormInput
          type="text"
          id="completeName"
          className={errors.completeName?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(
            userData?.completeName,
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
            userData?.tellphone,
            errors.tellphone?.message
          )}
          {...register('tellphone')}
        />
        <ModalFormLabel>E-mail</ModalFormLabel>
        <ModalFormInput
          type="email"
          id="email"
          className={errors.email?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(userData?.email, errors.email?.message)}
          {...register('email')}
        />
        <ModalFormLabel>E-mail Secundário</ModalFormLabel>
        <ModalFormInput
          type="email"
          id="secondEmail"
          className={errors.secondEmail?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(
            userData?.secondEmail ? userData?.secondEmail : 'Não cadastrado',
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
            userData?.secondTellphone
              ? userData?.secondTellphone
              : 'Não cadastrado',
            errors.secondTellphone?.message
          )}
          {...register('secondTellphone')}
        />
        <ModalFormBtn type="submit">Salvar</ModalFormBtn>
      </ModalForm>
    </ModalBox>
  );
};
