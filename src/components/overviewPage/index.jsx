import { FOAF } from '@inrupt/lit-generated-vocab-common';

import { useSession, CombinedDataProvider, Text } from '@inrupt/solid-ui-react';

import React, { useState } from 'react';

import { useStores } from '../../contexts/index';

const OverviewPage = () => {
  const { session } = useSession();
  const { solidStore } = useStores();
  const { webId } = session.info;
  const [user, setUser] = useState('testinguser22');
  const [file, setFile] = useState(
    `https://${user}.solidcommunity.net/cronos/covid/covid__info`,
  );

  const handleInput = async () => {
    setUser('testinguser22');
    setFile(`https://${user}.solidcommunity.net/cronos/covid/covid__info`);
    const listItems = await solidStore.readCovidData(session, file);
    console.info(listItems);
  };
  return (
    <>
      <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
        <div className="flex flex-col content-center justify-center">
          <p className="font-bold text-2xl mt-10 flex gap-1 mb-7 content-center justify-center">
            {<Text property={FOAF.name.iri.value} />}
          </p>
        </div>
      </CombinedDataProvider>

      <input
        className="border-b-2 border-gray-900"
        onInput={() => handleInput()}
        required
        type="text"
        id="user-access"
      />
    </>
  );
};

export default OverviewPage;
