import {
  createSolidDataset,
  createThing,
  setThing,
  addUrl,
  saveSolidDatasetAt,
  getSolidDataset,
  getThingAll,
  getStringNoLocale,
  removeThing,
  addDate,
  saveFileInContainer,
  addStringNoLocale,
  addInteger,
} from '@inrupt/solid-client';

import { SCHEMA_INRUPT, RDF } from '@inrupt/vocab-common-rdf';

class SolidService {
  status: string;
  doneCreatingFiles: boolean;

  constructor() {
    this.status = '';
    this.doneCreatingFiles = false;
  }

  uploadFile = async (
    file: any,
    targetLink: string,
    session: any,
  ): Promise<void> => {
    try {
      await saveFileInContainer(targetLink, file, {
        slug: file.name,
        contentType: file.type,
        fetch: session.fetch,
      });
    } catch (error) {
      console.error(error);
    }
  };

  setStatuses = (): any => {
    this.status = 'Files succesfull created';
    this.doneCreatingFiles = true;
  };

  createTTLFile = async (
    cronosURL: string,
    session: any,
    date: string,
    certificaat: string,
    validationDate: string,
    dosis: string,
    id: string,
  ): Promise<any> => {
    const fetchSessionData = session.fetch;
    let myCovidFile: any;

    const dateObj = new Date(date);
    const validationObj = new Date(validationDate);
    const dosisInt = dosis === '2/2' ? 2 : dosis === '1/2' ? 1 : undefined;

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

    let covidTypeThing;
    let dateThing;
    let dateUntilThing;
    let idThing;
    let dosisThing;
    switch (certificaat) {
      case 'vaccinatiecertificaat':
        covidTypeThing = createThing({ name: `HC1.v` });
        covidTypeThing = addUrl(
          covidTypeThing,
          RDF.type,
          `https://build.fhir.org/ig/hl7-eu/dgc/StructureDefinition-v-definitions.html#v`,
        );

        dateThing = createThing({ name: `HC1.v.df` });
        dateThing = addDate(dateThing, SCHEMA_INRUPT.startDate, dateObj);

        dateUntilThing = createThing({ name: `HC1.v.du` });
        dateUntilThing = addDate(
          dateUntilThing,
          SCHEMA_INRUPT.endDate,
          validationObj,
        );

        if (id !== '' && dosisInt) {
          idThing = createThing({ name: `HC1.v.id` });
          idThing = addStringNoLocale(idThing, SCHEMA_INRUPT.identifier, id);

          dosisThing = createThing({ name: `HC1.v.sd` });
          dosisThing = addInteger(
            dosisThing,
            SCHEMA_INRUPT.identifier,
            dosisInt,
          );
        }
        break;
      case 'herstelcertificaat':
        covidTypeThing = createThing({ name: `HC1.r` });
        covidTypeThing = addUrl(
          covidTypeThing,
          RDF.type,
          `https://build.fhir.org/ig/hl7-eu/dgc/StructureDefinition-r-definitions.html#r`,
        );

        dateThing = createThing({ name: `HC1.r.df` });
        dateThing = addDate(dateThing, SCHEMA_INRUPT.startDate, dateObj);

        dateUntilThing = createThing({ name: `HC1.r.du` });
        dateUntilThing = addDate(
          dateUntilThing,
          SCHEMA_INRUPT.endDate,
          validationObj,
        );
        break;
      case 'testcertificaat':
        covidTypeThing = createThing({ name: `HC1.t` });
        covidTypeThing = addUrl(
          covidTypeThing,
          RDF.type,
          `https://build.fhir.org/ig/hl7-eu/dgc/StructureDefinition-t-definitions.html#t`,
        );

        dateThing = createThing({ name: `HC1.t.df` });

        dateThing = addDate(dateThing, SCHEMA_INRUPT.startDate, dateObj);

        dateUntilThing = createThing({ name: `HC1.t.du` });

        dateUntilThing = addDate(
          dateUntilThing,
          SCHEMA_INRUPT.endDate,
          validationObj,
        );
        break;
    }

    let dataItems;
    if (idThing) {
      dataItems = [
        covidTypeThing,
        dateThing,
        dateUntilThing,
        idThing,
        dosisThing,
      ];
    } else {
      dataItems = [covidTypeThing, dateThing, dateUntilThing];
    }

    dataItems.forEach(dataItem => {
      myCovidFile = setThing(myCovidFile, dataItem);
    });

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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          listContent += `${item}\n`;
        }
      }
      return this.setStatuses();
    } catch (error) {
      console.error(error);
    }
  };
}

export default SolidService;
