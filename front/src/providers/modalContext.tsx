import React, { createContext, useState } from 'react';

interface ModalProps {
  children: React.ReactNode;
}

interface IModalContext {
  modalType: string;
  activeModal: (type: string) => void;
  desactiveModal: () => void;
  swithPlaceholder: (
    placeholder: string,
    errorMessage: string | undefined
  ) => string;
}

export const ModalContext = createContext<IModalContext>({} as IModalContext);

export function ModalProvider({ children }: ModalProps) {
  const [modalType, setModalType] = useState<string>('');

  function activeModal(type: string) {
    setModalType(type);
  }

  function desactiveModal() {
    setModalType('');
  }

  const swithPlaceholder = (
    placeholder: string,
    errorMessage: string | undefined
  ) => {
    return !errorMessage ? placeholder : errorMessage;
  };

  return (
    <ModalContext.Provider
      value={{ modalType, activeModal, desactiveModal, swithPlaceholder }}
    >
      {children}
    </ModalContext.Provider>
  );
}
