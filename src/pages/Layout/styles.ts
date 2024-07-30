import { getColor } from '@shared/helpers';
import { BREAKPOINTS } from '@shared/palette';
import { ITheme } from '@shared/palette/interfaces';
import styled from 'styled-components';

export const Wrapper = styled.div<ITheme>`
  background-color: ${getColor('bg')};
  height: 100%;
  width: 100%;

  @media ${BREAKPOINTS.mobileS} {
    padding: 20px;
  }
`;

export const Container = styled.section`
  height: 100%;
`;
