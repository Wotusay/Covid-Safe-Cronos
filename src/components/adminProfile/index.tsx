import { useSession } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';

import OverviewPage from '../overviewPage';

const AdminProfile = (): FC => {
  const { session } = useSession();

  return <div>{session.info.isLoggedIn && <OverviewPage />}</div>;
};

export default AdminProfile;
