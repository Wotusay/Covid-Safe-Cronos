import { LoginButton } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';
const idp = 'https://solidcommunity.net';

const LoginForm = (): FC => {
  return (
    <LoginButton
      authOptions={{ clientName: 'Cronos Covid App' }}
      oidcIssuer={idp}
      redirectUrl={window.location.href}
      onError={console.error}
    >
      <p className="font-semibold float-right p-5 text-white bg-green-700 rounded-sm">
        Login
      </p>
    </LoginButton>
  );
};

export default LoginForm;
