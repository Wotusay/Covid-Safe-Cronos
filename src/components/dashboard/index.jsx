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
    <div className="flex items-center justify-center w-screen mt-52">
      <div className="grid justify-center w-3/12 p-6 shadow-xl rounded-xl bg-blueAccent">
        <div className="grid p-10 rounded-md shadow-xl bg-whiteAccent">
          <CombinedDataProvider datasetUrl={webId} thingUrl={webId}>
            <div className="grid content-center justify-center">
              <p className="text-2xl font-medium text-navyBlue">
                Covid gegevens van {<Text property={FOAF.name.iri.value} />}
              </p>

              <CovidInformation
                certificaat={uiStore.covidInformation.typeCovidCerticate}
                date={uiStore.covidInformation.startDate}
                id={uiStore.covidInformation.id}
                dosis={uiStore.covidInformation.dosis}
                endDate={uiStore.covidInformation.endDate}
              />
              <Link
                className="p-5 font-medium text-center shadow-lg bg-oceanBlue text-whiteAccent rounded-3xl"
                to={ROUTES.edit}
              >
                Edit your information
              </Link>
            </div>
          </CombinedDataProvider>
        </div>
      </div>
    </div>
  ));
};

export default Dashboard;
