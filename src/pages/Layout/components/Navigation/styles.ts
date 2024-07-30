import { getAntdProp, getColor } from '@shared/helpers';
import styled from 'styled-components';

export const Wrapper = styled.div`
  backdrop-filter: blur(5px);
  background-color: ${getColor('windowBG')};
  border-radius: 16px 0 0 16px;
  box-shadow: -1px 3px 8px -1px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  height: calc(100% - 60px);
  left: 30px;
  padding: 20px;
  position: fixed;
  top: 30px;
  width: 350px;
`;

export const NavContainer = styled.ul`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  list-style-type: none;
`;

export const ControlContainer = styled.div`
  align-items: center;
  background-color: ${getColor('block')};
  border-radius: 8px;
  box-shadow: ${getAntdProp('boxShadow')};
  display: flex;
  height: 60px;
  justify-content: space-between;
  margin-top: 16px;
  padding: 20px;
  position: relative;
  width: 100%;
`;
