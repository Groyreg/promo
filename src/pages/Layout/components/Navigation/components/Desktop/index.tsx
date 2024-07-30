import React, { ReactElement, useState } from 'react';
import Header from '@pages/Layout/components/Navigation/components/Header';
import Row from '@pages/Layout/components/Navigation/components/Row';
import { INavItem } from '@pages/Layout/components/Navigation/interfaces';
import { useNavData } from '@pages/Layout/components/Navigation/useNavItems';
import { getFields } from '@store/config';
import useSharedStore from '@store/shared';
import { Switch } from 'antd';
import { SwitchChangeEventHandler } from 'antd/lib/switch';

import { Container, Control, Navigation, Wrapper } from './styles';

const Desktop = (): ReactElement => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { toggleTheme } = useSharedStore(getFields('toggleTheme'));

  const nav = useNavData();

  const renderNavItem = ({ title, id, icon, url }: INavItem): ReactElement => (
    <Row key={id} icon={icon} title={title} url={url} />
  );

  const onThemeChange: SwitchChangeEventHandler = (checked: boolean): void => {
    toggleTheme();
    setIsChecked(checked);
  };

  return (
    <Wrapper>
      <Header />
      <Container>
        <Navigation>{nav.map(renderNavItem)}</Navigation>
        <Control>
          <Switch
            checkedChildren="light"
            defaultChecked={true}
            onChange={onThemeChange}
            unCheckedChildren="dark"
            value={isChecked}
          />
        </Control>
      </Container>
    </Wrapper>
  );
};

export default Desktop;
