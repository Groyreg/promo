import { NavLink } from 'react-router-dom';
import { getColor } from '@shared/helpers';
import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  background-color: ${getColor('blockBG')};
  border-radius: 12px;
  bottom: 15px;
  display: flex;
  height: 60px;
  justify-content: space-between;
  left: 50%;
  padding: 20px 10px;
  position: fixed;
  transform: translateX(-50%);
  width: calc(100% - 20px);
`;

export const Item = styled.li`
  position: relative;
`;

export const Link = styled(NavLink)`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 10px;

  .anticon {
    width: 20px;
    margin-bottom: 8px;
  }

  svg {
    height: 100%;
    width: 100%;
  }
`;

export const Container = styled.ul`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
`;
