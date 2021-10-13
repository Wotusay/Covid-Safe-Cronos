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
      <p className="float-right p-5 font-semibold text-white bg-green-700 rounded-sm">
        Login
      </p>
    </LoginButton>
  );
};

export default LoginForm;
