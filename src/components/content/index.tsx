import { useSession } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';

import Profile from '../profile';

const Content = (): FC => {
  const { session } = useSession();
  return <div>{session.info.isLoggedIn && <Profile />}</div>;
};

export default Content;
