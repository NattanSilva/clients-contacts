import { styled } from 'styled-components';

export const ListContainer = styled.ul`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  li {
    width: 100%;
    display: flex;
    align-items: start;
    flex-direction: column;
    align-items: center;
    gap: .5rem;
    padding: 4%;
    color: white;
    border: var(--gray-border);
    border-radius: 0.5rem;

    @media (min-width: 768px) {
      width: 45%;
      gap: 1rem;
    }

    @media (min-width: 1000px) {
      width: 30%;
      padding: 2%;
      gap: 1rem;
    }
  }
`;

export const ContactCamp = styled.p`
  width: 100%;
  color: var(--text-gray-100);
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  strong {
    font-weight: 500;
    color: var(--text-gray-50);
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

export const ContactBtn = styled.button`
  height: 1.5rem;
  width: 3.5rem;
  border: none;
  border-radius: 1rem;
  background-color: var(--green-500);
  font-weight: 500;
`;

export const VoidContactList = styled.p`
  width: 100%;
  color: var(--text-gray-50);
  font-weight: 700;
  font-size: 1rem;
`;