/* eslint-disable no-console */
import { useSession, CombinedDataProvider } from '@inrupt/solid-ui-react';
import { useObserver } from 'mobx-react-lite';

import React from 'react';

import { useStores } from '../../contexts/index';
import FormCovid from '../formCovid';

const Profile = () => {
  const { session } = useSession();
  const { webId } = session.info;
  const { solidStore } = useStores();
  return useObserver(() => (
    <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
      <div className="flex flex-col content-center justify-center">
        <FormCovid solidStore={solidStore} session={session} />
      </div>
    </CombinedDataProvider>
  ));
};

export default Profile;
