/* eslint-disable no-console */
import { FOAF } from '@inrupt/lit-generated-vocab-common';
import { useSession, CombinedDataProvider, Text } from '@inrupt/solid-ui-react';

import React from 'react';

import CreateFolderButton from '../CreateFolderButton';

const Profile = () => {
  const { session } = useSession();
  const { webId } = session.info;
  /*
  const fetchSolid = session.fetch;
  console.log(session);
  const spiltLink = webId.split('/');
  const cronosURL = `https://${spiltLink[2]}/cronos/covid/`;
  let cronosFolder;
  console.log(cronosURL);
  const handleClick = async () => {
    try {
      cronosFolder = await getSolidDataset(cronosURL, { fetch: fetchSolid });
      // Clear the list to override the whole list
      const titles = getThingAll(cronosFolder);
      titles.forEach(title => {
        cronosFolder = removeThing(cronosFolder, title);
      });
    } catch (error) {
      if (typeof error.statusCode === 'number' && error.statusCode === 404) {
        // if not found, create a new SolidDataset (i.e., the reading list)
        cronosFolder = createSolidDataset();
        console.log(cronosFolder);
      } else {
        console.error(error.message);
      }
    }
    try {
      let savedcronosFolder = await saveSolidDatasetAt(
        cronosURL,
        cronosFolder,
        { fetch: fetchSolid },
      );

      savedcronosFolder = await getSolidDataset(cronosURL, {
        fetch: fetchSolid,
      });
      console.log(savedcronosFolder);
    } catch (error) {
      console.log(error);
    }
  };
*/
  return (
    <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
      <Text property={FOAF.name.iri.value} />
      <CreateFolderButton session={session} />
    </CombinedDataProvider>
  );
};

export default Profile;
