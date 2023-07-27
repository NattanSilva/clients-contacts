import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ContactsContext, IEditContact } from '../../providers/contactContext';
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
  completeName: yup.string().notRequired(),
  tellphone: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  secondEmail: yup.string().email().optional(),
  secondTellphone: yup.string().optional(),
});

export const EditContactModal = () => {
  const { desactiveModal, swithPlaceholder } = useContext(ModalContext);
  const { currentContact, editContact } = useContext(ContactsContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditContact>({
    resolver: yupResolver(registContactSchema),
  });

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    desactiveModal();
  };

  const editCurrentContact = async (data: IEditContact) => {
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

    await editContact(currentContact?.id as string, data);
    desactiveModal();
  };

  return (
    <ModalBox>
      <ModalTitle>Editar Contato</ModalTitle>
      <ModalCloseBtn onClick={closeModal}>X</ModalCloseBtn>
      <ModalForm onSubmit={handleSubmit(editCurrentContact)}>
        <ModalFormLabel>Nome Completo</ModalFormLabel>
        <ModalFormInput
          type="text"
          id="completeName"
          className={errors.completeName?.message ? 'errorField' : ''}
          placeholder={swithPlaceholder(
            currentContact?.completeName as string,
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
            currentContact?.tellphone as string,
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
            currentContact?.email as string,
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
            currentContact?.secondEmail || 'Não registrado',
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
            currentContact?.secondTellphone || 'Não registrado',
            errors.secondTellphone?.message
          )}
          {...register('secondTellphone')}
        />
        <ModalFormBtn type="submit">Salvar</ModalFormBtn>
      </ModalForm>
    </ModalBox>
  );
};
