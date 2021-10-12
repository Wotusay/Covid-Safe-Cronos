import dayjs from 'dayjs';
import { decorate, observable } from 'mobx';

import CovidInfo from '../models/CovidInfo';
import SolidService from '../services/SolidService';

import RootStore from './index';
class UIStore {
  rootStore: RootStore;
  solidService: SolidService;
  solidItems: Array<any>;
  covidInformation: CovidInfo[];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.solidService = new SolidService();
    this.solidItems = [];
    this.covidInformation = [];
  }

  checkUploadedFiles = async (session: any): Promise<any> => {
    const { webId } = session.info;
    const splitLink = webId.split('/');
    const cronosURL = `https://${splitLink[2]}/cronos/covid/covid__info`;

    const covidInfoObject = await this.solidService.getSolidDataCovid(
      session,
      cronosURL,
    );

    await this.covidInformation.push(
      new CovidInfo({
        id: covidInfoObject.id,
        startDate: dayjs(covidInfoObject.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(covidInfoObject.endDate).format('YYYY-MM-DD'),
        dosis: covidInfoObject.dosis,
        typeCovidCerticate: covidInfoObject.typeCovidCerticate,
      }),
    );

    console.info(this.covidInformation);
  };
}

decorate(UIStore, {
  solidItems: observable,
  covidInformation: observable,
});

export default UIStore;
