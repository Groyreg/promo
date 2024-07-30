import { NavLink } from 'react-router-dom';
import { getColor } from '@shared/helpers';
import styled from 'styled-components';

export const Wrapper = styled(NavLink)<any>`
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  color: ${getColor('text')};
  display: flex;
  font-size: 16px;
  height: 44px;
  margin-bottom: 8px;
  padding: 12px 16px;
  position: relative;
  transition: background-color 200ms linear;

  &.active {
    background-color: ${getColor('blockBG')};
    cursor: default;
    pointer-events: none;

    .anticon {
      transform: scale(1.15);
    }
  }

  .anticon {
    height: 20px;
    margin-right: 8px;
    transition: transform 200ms linear;
    width: 20px;
  }

  svg {
    height: 100%;
    width: 100%;

    path {
      fill: ${getColor('text')};
    }
  }

  &:hover {
    background-color: ${getColor('blockBG')};

    .anticon {
      transform: scale(1.15);
    }
  }
`;
