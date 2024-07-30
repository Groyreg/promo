import { getColor } from '@shared/helpers';
import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${getColor('bg')};
  color: ${getColor('text')};
  display: flex;
  font-size: 50px;
  justify-content: center;
  margin-bottom: 20px;
  padding: 15px;
  width: 100%;

  svg {
    path {
      fill: ${getColor('text')};
    }
  }
`;
