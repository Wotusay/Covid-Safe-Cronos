import { useSession } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';

import Profile from '../profile';

const Content = (): FC => {
  const { session } = useSession();
  return (
    <div>
      <h1 className=" text-xl font-semibold p-5">Cronos Covidcertifcaten</h1>
      {session.info.isLoggedIn && <Profile />}
    </div>
  );
};

export default Content;
