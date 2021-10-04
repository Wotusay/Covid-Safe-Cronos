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
  getSolidDatasetWithAcl,
  hasResourceAcl,
  hasFallbackAcl,
  hasAccessibleAcl,
  createAclFromFallbackAcl,
  getResourceAcl,
  setAgentResourceAccess,
  saveAclFor,
  addDate,
  saveFileInContainer,
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

  allowAccesToUsers = async (
    fileLink: string,
    agentLink: string,
    session: any,
  ): Promise<any> => {
    const fetchSessionData = session.fetch;
    const myDataSetWithAcl = await getSolidDatasetWithAcl(fileLink, {
      fetch: fetchSessionData,
    });
    let resourceAcl;

    if (!hasResourceAcl(myDataSetWithAcl)) {
      if (!hasAccessibleAcl(myDataSetWithAcl)) {
        throw new Error(
          'The current user does not have permission to change access rights to this Resource.',
        );
      }
      if (!hasFallbackAcl(myDataSetWithAcl)) {
        throw new Error(
          'The current user does not have permission to see who currently has access to this Resource.',
        );
      }
      resourceAcl = createAclFromFallbackAcl(myDataSetWithAcl);
    } else {
      resourceAcl = getResourceAcl(myDataSetWithAcl);
    }

    const updatedAcl = setAgentResourceAccess(resourceAcl, agentLink, {
      read: true,
      append: false,
      write: true,
      control: true,
    });

    await saveAclFor(myDataSetWithAcl, updatedAcl, { fetch: fetchSessionData });
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
  ): Promise<any> => {
    const fetchSessionData = session.fetch;
    let myCovidFile: any;

    const dateObj = new Date(date);
    const validationObj = new Date(validationDate);

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
    switch (certificaat) {
      case 'vaccinatiecertificaat':
        covidTypeThing = createThing({ name: `HC1.v` });
        covidTypeThing = addUrl(
          covidTypeThing,
          RDF.type,
          `http://hl7.eu/fhir/ig/dcc/StructureDefinition/v`,
        );

        dateThing = createThing({ name: `HC1.v.df` });
        dateThing = addDate(dateThing, SCHEMA_INRUPT.startDate, dateObj);

        dateUntilThing = createThing({ name: `HC1.v.du` });
        dateUntilThing = addDate(
          dateUntilThing,
          SCHEMA_INRUPT.endDate,
          validationObj,
        );

        break;
      case 'herstelcertificaat':
        covidTypeThing = createThing({ name: `HC1.r` });
        covidTypeThing = addUrl(
          covidTypeThing,
          RDF.type,
          `http://hl7.eu/fhir/ig/dcc/StructureDefinition/r`,
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
          `http://hl7.eu/fhir/ig/dcc/StructureDefinition/t`,
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

    const dataItems = [covidTypeThing, dateThing, dateUntilThing];

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
