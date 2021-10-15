import { LoginButton } from '@inrupt/solid-ui-react';
import React from 'react';
const idp = 'https://solidcommunity.net';

const LoginForm = (): React.ReactElement => {
  return (
    <LoginButton
      authOptions={{ clientName: 'Cronos Covid App' }}
      oidcIssuer={idp}
      redirectUrl={window.location.href}
      onError={console.error}
    >
      <p className="p-3 font-medium text-center text-white shadow-xl w-28 bg-appelGreen rounded-3xl">
        Login
      </p>
    </LoginButton>
  );
};

export default LoginForm;
