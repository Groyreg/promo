import React, { ReactElement } from 'react';
import avatar from '@shared/media/avatar.png';

import { Name, Photo, Wrapper } from './styles';

const Profile = (): ReactElement => (
  <Wrapper>
    <Photo src={avatar} />
    <Name>Jimmy</Name>
  </Wrapper>
);

export default Profile;
