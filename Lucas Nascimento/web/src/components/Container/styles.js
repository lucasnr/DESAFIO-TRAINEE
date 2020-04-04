import styled from 'styled-components';

import { backgroundColor } from '../../colors';

export const Wrapper = styled.main`
  background-color: ${backgroundColor};
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto;
  max-width: 362px;
  min-height: 100vh;
  padding: 4rem 2.5rem;

  & > *:not(:last-child) {
    margin-bottom: 4rem;
  }
`;
