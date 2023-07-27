import { styled } from 'styled-components';

export const ModalBox = styled.div`
  width: 90%;
  background-color: var(--bg-gray-700);
  border-radius: 1rem;
  display: flex;
  align-items: start;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0.75rem;
  position: relative;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

export const ModalTitle = styled.h3`
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--green-500);
  
  @media (min-width: 1000px) {
    font-size: 2rem;
  }
`;

export const ModalCloseBtn = styled.button`
  width: 2rem;
  height: 2rem;
  border: none;
  background-color: var(--violet-700);
  border-radius: 50%;
  position: absolute;
  top: -0.8rem;
  right: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--white-full);

  @media (min-width: 1000px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
  }
`;

export const ModalForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const ModalFormLabel = styled.label`
  width: 100%;
  color: var(--text-gray-50);
  font-size: 1rem;
  font-weight: 400;

  @media (min-width: 1000px) {
    font-size: 1.2rem;
  }
`;

export const ModalFormInput = styled.input`
  width: 100%;
  height: 1.5rem;
  padding-left: 0.5rem;
  border: none;
  border-radius: 1rem;

  &.errorField {
    &::placeholder {
      color: red;
    }
  }

  @media (min-width: 1000px) {
    height: 1.8rem;
  }
`;

export const ModalFormBtn = styled.button`
  width: 60%;
  height: 1.8rem;
  border-radius: 0.5rem;
  background-color: var(--green-500);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-black);

  @media (min-width: 1000px) {
    width: 40%;
    height: 2rem;
    font-size: 1.4rem;
  }
`;

export const ModalFooterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalFooterText = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.1rem;
  background-color: transparent;
  color: var(--text-gray-100);
  font-size: 0.8rem;

  span {
    text-decoration: underline;
    margin-left: 0.25rem;
  }

  @media (min-width: 1000px) {
    font-size: 1.2rem;
  }
`;
