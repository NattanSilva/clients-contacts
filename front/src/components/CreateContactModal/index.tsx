import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ContactsContext, RegistContact } from '../../providers/contactContext';
import { ModalContext } from '../../providers/modalContext';
import {
  ModalBox,
  ModalCloseBtn,
  ModalForm,
  ModalFormBtn,
  ModalFormInput,
  ModalFormLabel,
  ModalTitle,
} from '../CreateUserModal/styles';

const registContactSchema = yup.object({
  completeName: yup.string().required('Nome completo obrigatório'),
  tellphone: yup
    .string()
    .min(14, 'Deve seguir o modelo (99)99999-9999')
    .required('Telefone obrigatório'),
  email: yup.string().email().required('Email obrigatório'),
  secondEmail: yup.string().email().optional(),
  secondTellphone: yup.string().optional(),
});

export const CreateContactModal = () => {
  const { desactiveModal, swithPlaceholder } = useContext(ModalContext);
  const { registNewContact } = useContext(ContactsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistContact>({
    resolver: yupResolver(registContactSchema),
  });

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    desactiveModal();
  };

  const registContact = async (data: RegistContact) => {
    if (data.secondEmail === '') {
      data.secondEmail = undefined;
    }

    if (data.secondTellphone === '') {
      data.secondEmail = undefined;
    }

    await registNewContact(data);
  };

  return (
    <ModalBox>
      <ModalTitle>Novo Contato</ModalTitle>
      <ModalCloseBtn onClick={closeModal}>X</ModalCloseBtn>
      <ModalForm onSubmit={handleSubmit(registContact)}>
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
        <ModalFormBtn type="submit">Criar</ModalFormBtn>
      </ModalForm>
    </ModalBox>
  );
};
