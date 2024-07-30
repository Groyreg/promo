import React, { ReactElement } from 'react';

import { Wrapper } from './styles';

const Row = ({ url, title, icon: Component }: any): ReactElement => (
  <Wrapper to={url}>
    <Component />
    {title}
  </Wrapper>
);

export default Row;
