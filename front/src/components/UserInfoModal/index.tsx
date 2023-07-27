import { useContext } from 'react';
import { ModalContext } from '../../providers/modalContext';
import { UserContext } from '../../providers/userContext';
import {
  ModalBox,
  ModalCloseBtn,
  ModalForm,
  ModalFormBtn,
  ModalFormInput,
  ModalFormLabel,
  ModalTitle,
} from '../CreateUserModal/styles';

export const UserInfoModal = () => {
  const { desactiveModal, activeModal } = useContext(ModalContext);
  const { userData, deleteUser } = useContext(UserContext);

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
    desactiveModal();
  };

  const activeEditUserModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    activeModal('editUser');
  };

  const deleteAccount = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    await deleteUser();
    closeModal(e);
  };
  return (
    <ModalBox>
      <ModalTitle>Seus Dados</ModalTitle>
      <ModalCloseBtn onClick={closeModal}>X</ModalCloseBtn>
      <ModalForm>
        <ModalFormLabel>Nome Completo</ModalFormLabel>
        <ModalFormInput
          type="text"
          id="completeName"
          defaultValue={userData.completeName}
        />
        <ModalFormLabel>Telefone</ModalFormLabel>
        <ModalFormInput
          readOnly
          type="tel"
          id="telphone"
          defaultValue={userData.tellphone}
        />
        <ModalFormLabel>E-mail</ModalFormLabel>
        <ModalFormInput
          readOnly
          type="email"
          id="email"
          defaultValue={userData.email}
        />
        <ModalFormLabel>E-mail Secundário</ModalFormLabel>
        <ModalFormInput
          readOnly
          type="email"
          id="secondEmail"
          defaultValue={
            userData?.secondEmail ? userData?.secondEmail : 'Não cadastrado'
          }
        />
        <ModalFormLabel>Telefone Secundário</ModalFormLabel>
        <ModalFormInput
          readOnly
          type="tel"
          id="secondTellphone"
          defaultValue={
            userData?.secondTellphone
              ? userData?.secondTellphone
              : 'Não cadastrado'
          }
        />
        <ModalFormBtn onClick={activeEditUserModal}>Editar conta</ModalFormBtn>
        <ModalFormBtn onClick={deleteAccount}>Excluir conta</ModalFormBtn>
      </ModalForm>
    </ModalBox>
  );
};
