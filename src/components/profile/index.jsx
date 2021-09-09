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
      <Text property={FOAF.name.iri.value} />
      <CreateFolderButton session={session} />
    </CombinedDataProvider>
  );
};

export default Profile;
