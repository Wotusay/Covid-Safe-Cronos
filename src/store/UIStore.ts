import dayjs from 'dayjs';
import { decorate, observable } from 'mobx';

import CovidInfo from '../models/CovidInfo';
import SolidService from '../services/SolidService';

import RootStore from './index';
class UIStore {
  rootStore: RootStore;
  solidService: SolidService;
  solidItems: Array<any>;
  covidInformation: CovidInfo | undefined;
  username: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.solidService = new SolidService();
    this.solidItems = [];
    this.covidInformation = undefined;
    this.username = 'Testing user';
  }

  checkUploadedFiles = async (session: any): Promise<void> => {
    const { webId } = session.info;
    const splitLink = webId.split('/');
    const spiltDot = splitLink[2].split('.');
    const fetchedUsername = spiltDot[0];
    const cronosURL = `https://${splitLink[2]}/cronos/covid/covid__info`;

    if (fetchedUsername === 'testinguser22') {
      this.username = 'Wout S.';
    } else if (fetchedUsername === 'testinguser400') {
      this.username = 'Daren M.';
    } else {
      this.username = 'Test user';
    }

    const covidInfoObject = await this.solidService.getSolidDataCovid(
      session,
      cronosURL,
    );

    if (covidInfoObject) {
      this.covidInformation = new CovidInfo({
        username: this.username,
        id: covidInfoObject.id,
        startDate: dayjs(covidInfoObject.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(covidInfoObject.endDate).format('YYYY-MM-DD'),
        dosis: covidInfoObject.dosis,
        typeCovidCerticate: covidInfoObject.typeCovidCerticate,
      });
    }
  };
}

decorate(UIStore, {
  solidItems: observable,
  covidInformation: observable,
  username: observable,
});

export default UIStore;
