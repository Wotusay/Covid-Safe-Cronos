import { SessionProvider } from '@inrupt/solid-ui-react';
import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { Switch } from 'react-router-dom';
import { ROUTES } from 'src/consts';

import { useStores } from '../../contexts/index';
import Content from '../content';
import Dashboard from '../dashboard';

import EditProfile from '../EditProfile/index';
import Nav from '../nav';
import ProtectedRoute from '../ProtectedRoute';

const Container = (): React.ReactElement => {
  const { uiStore } = useStores();

  return useObserver(() => (
    <SessionProvider>
      <Nav />
      <Switch>
        <ProtectedRoute
          redirectPath={ROUTES.home}
          component={Dashboard}
          expression={uiStore.covidInformation}
          path={ROUTES.dashboard}
          exact
        />
        <ProtectedRoute
          redirectPath={ROUTES.home}
          component={EditProfile}
          expression={uiStore.covidInformation}
          path={ROUTES.edit}
          exact
        />

        <ProtectedRoute
          redirectPath={ROUTES.dashboard}
          component={Content}
          expression={!uiStore.covidInformation}
          path={ROUTES.home}
        />
      </Switch>
    </SessionProvider>
  ));
};

export default Container;
