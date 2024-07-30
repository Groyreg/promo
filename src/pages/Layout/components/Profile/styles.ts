import { getColor } from '@shared/helpers';
import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${getColor('block')};
  border-radius: 8px;
  display: flex;
  margin: 24px 0;
  padding: 20px;
  position: relative;
`;

export const Photo = styled.img`
  border-radius: 8px;
  height: 50px;
  margin-right: 16px;
  width: 50px;
`;

export const Name = styled.div`
  color: white;
  font-size: 18px;
`;
