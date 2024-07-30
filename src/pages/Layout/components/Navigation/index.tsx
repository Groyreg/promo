import React, { ReactElement } from 'react';
import { useMediaQuery } from '@shared/hooks';
import { BREAKPOINTS } from '@shared/palette';

import Desktop from './components/Desktop';
import Mobile from './components/Mobile';

const Navigation = (): ReactElement => {
  const isMobile = useMediaQuery(BREAKPOINTS.mobileS);

  return (
    <>
      {isMobile && <Mobile />}
      {!isMobile && <Desktop />}
    </>
  );
};

export default Navigation;
