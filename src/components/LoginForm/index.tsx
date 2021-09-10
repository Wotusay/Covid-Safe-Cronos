import { LoginButton } from '@inrupt/solid-ui-react';
import React, { FC, useEffect, useState } from 'react';

const LoginForm = (): FC => {
  const idp = 'https://solidcommunity.net';
  const [currentUrl, setCurrentUrl] = useState('https://localhost:3000');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  return (
    <LoginButton
      authOptions={{ clientName: 'Cronos Covid App' }}
      oidcIssuer={idp}
      redirectUrl={currentUrl}
      onError={console.error}
    >
      <p className="font-semibold float-right p-5 text-white bg-green-700 rounded-sm">
        Login
      </p>
    </LoginButton>
  );
};

export default LoginForm;
