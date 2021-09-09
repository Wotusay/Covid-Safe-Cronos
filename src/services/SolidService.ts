import {
  createSolidDataset,
  getSolidDataset,
  saveSolidDatasetAt,
} from '@inrupt/solid-client';

class SolidService {
  createFolder = async (url: string, session: any) => {
    let cronosFolder;
    const fetchSessionData = session.fetch;
    let savedCronosFolder;

    try {
      cronosFolder = await getSolidDataset(url, {
        fetch: fetchSessionData,
      });
      // eslint-disable-next-line no-console
      console.log('Added Fetched data');
      return `Already have an directory @ ${url}`;
    } catch (error: any) {
      if (typeof error.statusCode === 'number' && error.statusCode === 404) {
        cronosFolder = createSolidDataset();
        // eslint-disable-next-line no-console
        console.log(cronosFolder);
        // eslint-disable-next-line no-console
        console.log('Added files');
        return `Created a directory @ ${url}`;
      } else {
        console.error(error.message);
      }
    }

    try {
      savedCronosFolder = await saveSolidDatasetAt(url, cronosFolder, {
        fetch: fetchSessionData,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      savedCronosFolder = await getSolidDataset(url, {
        fetch: fetchSessionData,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export default SolidService;
