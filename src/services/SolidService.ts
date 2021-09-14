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
  getSolidDatasetWithAcl,
  hasResourceAcl,
  hasFallbackAcl,
  hasAccessibleAcl,
  createAclFromFallbackAcl,
  getResourceAcl,
  setAgentResourceAccess,
  saveAclFor,
} from '@inrupt/solid-client';

import { SCHEMA_INRUPT, RDF, AS } from '@inrupt/vocab-common-rdf';

class SolidService {
  status: string;
  doneCreatingFiles: boolean;
  listItems: any;

  constructor() {
    this.status = '';
    this.doneCreatingFiles = false;
    this.listItems = [];
  }

  getSolidData = async (fileLink: string, session: any) => {
    const fetchSessionData = session.fetch;
    const savedCovidItems = await getSolidDataset(fileLink, {
      fetch: fetchSessionData,
    });

    const items = getThingAll(savedCovidItems);
    let listedSolidStrings;

    for (let i = 0; i < items.length; i++) {
      const item = getStringNoLocale(items[i], SCHEMA_INRUPT.name);
      if (item !== null && this.listItems.length != 3) {
        this.listItems.push(item);
      }
    }

    if (this.listItems.length === 3 && this.listItems != undefined) {
      listedSolidStrings = this.listItems;
      this.listItems = [];
    }

    return listedSolidStrings;
  };

  allowAccesToUsers = async (
    fileLink: string,
    agentLink: string,
    session: any,
  ) => {
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
