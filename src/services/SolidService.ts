import {
  createSolidDataset,
  createThing,
  setThing,
  addUrl,
  addStringNoLocale,
  saveSolidDatasetAt,
  getSolidDataset,
  getThingAll,
  getStringNoLocale,
  removeThing,
} from '@inrupt/solid-client';

import { SCHEMA_INRUPT, RDF, AS } from '@inrupt/vocab-common-rdf';

class SolidService {
  status: string;
  doneCreatingFiles: boolean;

  constructor() {
    this.status = '';
    this.doneCreatingFiles = false;
  }

  setStatuses = () => {
    this.status = 'Files succesfull created';
    this.doneCreatingFiles = true;
  };

  createTTLFile = async (
    cronosURL: string,
    session: any,
    date: string,
    certificaat: string,
    validationDate: string,
  ) => {
    const fetchSessionData = session.fetch;
    let myCovidFile: any;
    const info = [date, certificaat, validationDate];

    try {
      myCovidFile = await getSolidDataset(cronosURL, {
        fetch: fetchSessionData,
      });
      const covidInfo = getThingAll(myCovidFile);

      covidInfo.forEach(info => (myCovidFile = removeThing(myCovidFile, info)));
    } catch (error: any) {
      if (typeof error.statusCode === 'number' && error.statusCode === 404) {
        // if not found, create a new SolidDataset (i.e., the reading list)
        myCovidFile = createSolidDataset();
      } else {
        console.error(error.message);
      }
    }

    for (let i = 0; i < info.length; i++) {
      let title = createThing({ name: `title${i}` });
      title = addUrl(title, RDF.type, AS.Article);
      title = addStringNoLocale(title, SCHEMA_INRUPT.name, info[i]);
      myCovidFile = setThing(myCovidFile, title);
    }

    try {
      let savedCovidInfo = await saveSolidDatasetAt(cronosURL, myCovidFile, {
        fetch: fetchSessionData,
      });

      savedCovidInfo = await getSolidDataset(cronosURL, {
        fetch: fetchSessionData,
      });

      const items = getThingAll(savedCovidInfo);
      let listContent = '';

      for (let i = 0; i < items.length; i++) {
        const item = getStringNoLocale(items[i], SCHEMA_INRUPT.name);
        if (item !== null) {
          listContent += `${item}\n`;
        }
      }
      // eslint-disable-next-line no-console
      console.log(listContent);
      return this.setStatuses();
    } catch (error) {
      console.error(error);
    }
  };
}

export default SolidService;
