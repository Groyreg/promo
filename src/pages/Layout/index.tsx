import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@shared/hooks';
import { BREAKPOINTS } from '@shared/palette';

import Navigation from './components/Navigation';
import Header from './components/Navigation/components/Header';
import { Container, Wrapper } from './styles';

const Layout = (): ReactElement => {
  const isMobile = useMediaQuery(BREAKPOINTS.mobileS);

  return (
    <>
      {isMobile && <Header />}
      <Wrapper>
        <Navigation />
        <Container>
          <Outlet />
        </Container>
      </Wrapper>
    </>
  );
};

export default Layout;
