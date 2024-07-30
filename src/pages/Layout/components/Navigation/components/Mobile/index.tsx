import React, { ReactElement } from 'react';
import { INavItem } from '@pages/Layout/components/Navigation/interfaces';
import { useNavData } from '@pages/Layout/components/Navigation/useNavItems';

import { Container, Item, Link, Wrapper } from './styles';

const Mobile = (): ReactElement => {
  const nav = useNavData();

  const renderNav = ({ url, id, icon: Component, title }: INavItem): ReactElement => (
    <Item key={id}>
      <Link to={url}>
        <Component />
        {title}
      </Link>
    </Item>
  );

  return (
    <Wrapper>
      <Container>{nav.map(renderNav)}</Container>
    </Wrapper>
  );
};

export default Mobile;
