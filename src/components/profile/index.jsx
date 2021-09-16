import { useSession, CombinedDataProvider } from '@inrupt/solid-ui-react';
import { useObserver } from 'mobx-react-lite';

import React from 'react';

import FormCovid from '../formCovid';

const Profile = () => {
  const { session } = useSession();
  const { webId } = session.info;
  return useObserver(() => (
    <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
      <div className="flex flex-col content-center justify-center">
        <FormCovid session={session} />
      </div>
    </CombinedDataProvider>
  ));
};

export default Profile;
