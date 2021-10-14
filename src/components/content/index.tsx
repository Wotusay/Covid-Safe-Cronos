import { useSession } from '@inrupt/solid-ui-react';
import React from 'react';

import Profile from '../profile';

const Content = (): React.ReactElement => {
  const { session } = useSession();
  return <div>{session.info.isLoggedIn && <Profile />}</div>;
};

export default Content;
