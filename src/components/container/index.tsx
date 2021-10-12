import { SessionProvider } from '@inrupt/solid-ui-react';
import { useObserver } from 'mobx-react-lite';
import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ROUTES } from 'src/consts';

import { useStores } from '../../contexts/index';
import Content from '../content';
import Dashboard from '../dashboard';

import Nav from '../nav';

const Container = (): FC => {
  const { uiStore } = useStores();

  return useObserver(() => (
    <SessionProvider children>
      <Nav />
      <Switch>
        <Route exact path={ROUTES.dashboard}>
          {uiStore.covidInformation ? (
            <Dashboard />
          ) : (
            <Redirect to={ROUTES.home} />
          )}
        </Route>
        <Route path={ROUTES.home}>
          {uiStore.covidInformation ? (
            <Redirect exact to={ROUTES.dashboard} />
          ) : (
            <Content />
          )}
        </Route>
      </Switch>
    </SessionProvider>
  ));
};

export default Container;
