import { SessionProvider } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'src/consts';

import Content from '../content';

import Nav from '../nav';

const Container = (): FC => {
  return (
    <SessionProvider children>
      <Nav />
      <Switch>
        <Route path={ROUTES.home}>
          <Content />
        </Route>
      </Switch>
    </SessionProvider>
  );
};

export default Container;
