/* eslint-disable no-console */
import { FOAF } from '@inrupt/lit-generated-vocab-common';
import { useSession, CombinedDataProvider, Text } from '@inrupt/solid-ui-react';

import React from 'react';

import CreateFolderButton from '../CreateFolderButton';

const Profile = () => {
  const { session } = useSession();
  const { webId } = session.info;
  return (
    <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
      <div className="flex flex-col content-center justify-center">
        <div className="font-medium text-2xl mb-8 mt-10 flex  content-center justify-center">
          Username: <Text property={FOAF.name.iri.value} />
        </div>
        <CreateFolderButton session={session} />
      </div>
    </CombinedDataProvider>
  );
};

export default Profile;
