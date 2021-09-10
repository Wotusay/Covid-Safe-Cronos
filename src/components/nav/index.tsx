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
        >
          <p className="font-semibold float-right p-5 text-white bg-red-600 rounded-sm">
            Logout
          </p>
        </LogoutButton>
      )}

      {!sessionRequestInProgress && !session.info.isLoggedIn && <LoginForm />}
    </div>
  );
};

export default Nav;
