import { SessionProvider } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';

import Content from '../content';

import Nav from '../nav';

const Container = (): FC => {
  return (
    <SessionProvider children>
      <Nav />
      <Content />
    </SessionProvider>
  );
};

export default Container;
