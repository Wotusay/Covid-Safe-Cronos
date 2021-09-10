/* eslint-disable no-console */
import { FOAF } from '@inrupt/lit-generated-vocab-common';
import { useSession, CombinedDataProvider, Text } from '@inrupt/solid-ui-react';
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
        <div className="font-medium text-2xl mb-8 mt-10 flex  content-center justify-center">
          <Text property={FOAF.name.iri.value} />
        </div>
        <FormCovid solidStore={solidStore} session={session} />
      </div>
    </CombinedDataProvider>
  ));
};

export default Profile;
