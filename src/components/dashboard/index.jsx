import { FOAF } from '@inrupt/lit-generated-vocab-common';
import { Text, CombinedDataProvider, useSession } from '@inrupt/solid-ui-react';

import { useObserver } from 'mobx-react-lite';
import React from 'react';

import { Link } from 'react-router-dom';
import { ROUTES } from 'src/consts';

import { useStores } from '../../contexts/index';
import CovidInformation from '../covidInformation/index';

const Dashboard = () => {
  const { session } = useSession();
  const { uiStore } = useStores();
  const webId = session.info.webId;
  // TS werkt hier niet
  return useObserver(() => (
    <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
      <div className="grid content-center justify-center gap-7 mb-7 ">
        <p className="flex content-center justify-center gap-1 mt-10 text-2xl font-bold mb-7">
          Covid gegevens van {<Text property={FOAF.name.iri.value} />}
        </p>

        <CovidInformation
          certificaat={uiStore.covidInformation.typeCovidCerticate}
          date={uiStore.covidInformation.startDate}
          id={uiStore.covidInformation.id}
          dosis={uiStore.covidInformation.dosis}
          endDate={uiStore.covidInformation.endDate}
        />
        <Link to={ROUTES.edit}>Edit your covid information</Link>
      </div>
    </CombinedDataProvider>
  ));
};

export default Dashboard;
