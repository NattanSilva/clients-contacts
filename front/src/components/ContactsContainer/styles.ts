import { styled } from 'styled-components';

export const Main = styled.main`
  width: 100%;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const MainTitleContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MainTitle = styled.h3`
  color: var(--violet-700);
  font-weight: 700;
  font-size: 1.5rem;
`;

export const AddBtn = styled.button`
  width: 1.6rem;
  height: 1.6rem;
  border: none;
  background-color: var(--green-500);
  border-radius: 50%;
  font-size: 1.5em;
  font-weight: 700;
`;
