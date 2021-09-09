import { useSession, LogoutButton } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';

import LoginForm from '../LoginForm';

const Nav = (): FC => {
  const { session, sessionRequestInProgress } = useSession();
  return (
    <div>
      {!sessionRequestInProgress && session.info.isLoggedIn && (
        <LogoutButton
          onError={console.error}
          onLogout={() => window.location.reload()}
        />
      )}

      {!sessionRequestInProgress && !session.info.isLoggedIn && <LoginForm />}
    </div>
  );
};

export default Nav;
