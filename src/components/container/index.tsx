import { SessionProvider } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTES } from 'src/consts';

import AdminProfile from '../adminProfile';

import Content from '../content';
import LandingScreen from '../landingScreen';

import Nav from '../nav';

const Container = (): FC => {
  return (
    <SessionProvider children>
      <Nav />

      <Switch>
        <Route exact strict path={ROUTES.worker}>
          <Content />
        </Route>

        <Route exact strict path={ROUTES.manager}>
          <AdminProfile />
        </Route>

        <Route path={ROUTES.home}>
          <LandingScreen />
        </Route>
      </Switch>
    </SessionProvider>
  );
};

export default Container;
