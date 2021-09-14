import { useSession } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';

const AdminProfile = (): FC => {
  const { session } = useSession();

  return <div>{session.info.isLoggedIn && ''}</div>;
};

export default AdminProfile;
