import {
  createSolidDataset,
  getSolidDataset,
  saveSolidDatasetAt,
} from '@inrupt/solid-client';

class SolidService {
  status: string;
  constructor() {
    this.status = '';
  }
  createFolder = async (url: string, session: any) => {
    let cronosFolder;
    const fetchSessionData = session.fetch;
    let savedCronosFolder;

    try {
      cronosFolder = await getSolidDataset(url, {
        fetch: fetchSessionData,
      });
      return (this.status = 'Folder already exist or nothing changed');
    } catch (error: any) {
      if (typeof error.statusCode === 'number' && error.statusCode === 404) {
        cronosFolder = createSolidDataset();
        // eslint-disable-next-line no-console
        console.log(cronosFolder);
        // eslint-disable-next-line no-console
        console.log('Added files');
      } else {
        this.status = 'Folder already exist or nothing changed';
        console.error(error.message);
      }
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      savedCronosFolder = await saveSolidDatasetAt(url, cronosFolder, {
        fetch: fetchSessionData,
      });
      // eslint-disable-next-line no-console
      console.log(`Saving Dataset -------- ${savedCronosFolder}`);
      this.status = 'Folders are created';
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      /*
      savedCronosFolder = await getSolidDataset(url, {
        fetch: fetchSessionData,
      });*/
    } catch (error) {
      this.status = 'Folder already exist or nothing changed';
      console.error(error);
    }
  };
}

export default SolidService;
