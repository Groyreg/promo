import { getColor } from '@shared/helpers';
import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: ${getColor('bg')};
  border-right: 1px solid ${getColor('blockBG')};
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;
  padding: 20px;
  position: fixed;
  top: 0;
  width: 320px;
  z-index: 2;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 20px;
`;

export const Navigation = styled.ul``;

export const Control = styled.div`
  align-items: center;
  background-color: ${getColor('blockBG')};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 20px;
`;
