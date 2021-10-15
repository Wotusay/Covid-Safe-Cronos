/* eslint-disable no-console */
import dayjs from 'dayjs';
import { action, decorate, observable } from 'mobx';

import FirebaseService from '../services/FirebaseService';
import SolidService from '../services/SolidService';

import RootStore from './index';
class SolidStore {
  rootStore: RootStore;
  solidService: any;
  status: string;
  ttlStatus: boolean;
  firebaseService: FirebaseService;

  constructor(rootStore: RootStore) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.rootStore = rootStore;
    this.solidService = new SolidService();
    this.firebaseService = new FirebaseService(this.rootStore.firebase);
    this.status = '';
    this.ttlStatus = false;
  }

  handleFiles = async (file: any, session: any): Promise<void> => {
    const { webId } = session.info;
    const spiltLink = webId.split('/');
    const fileLink = `https://${spiltLink[2]}/cronos/covid/`;
    await this.solidService.uploadFile(file, fileLink, session);
  };

  createCovidFile = async (
    date: string,
    certificaat: string,
    session: any,
    dosis: string,
    id: string,
    group: string,
  ): Promise<void> => {
    console.log(session.info);
    const { webId } = session.info;
    const spiltLink = webId.split('/');
    const spiltDot = spiltLink[2].split('.');
    const username = spiltDot[0];
    const cronosURL = `https://${spiltLink[2]}/cronos/covid/covid__info`;
    let validationDate: string;
    if (date !== '') {
      validationDate = this.validationCalculator(date, certificaat);
      if (dosis !== '' && id !== '' && date !== '') {
        await this.solidService.createTTLFile(
          cronosURL,
          session,
          date,
          certificaat,
          validationDate,
          dosis,
          id,
        );
      } else {
        await this.solidService.createTTLFile(
          cronosURL,
          session,
          date,
          certificaat,
          validationDate,
        );
      }
      await this.firebaseService.writeUserData(
        username,
        date,
        validationDate,
        group,
      );
      this.status = this.solidService.status;
    } else {
      this.status = 'Something went wrong with saving the data';
    }
  };

  validationCalculator = (date: string, certificaat: string): string => {
    const startDay = dayjs(date);
    let validationDay;
    switch (certificaat) {
      case 'vaccinatiecertificaat':
        validationDay = startDay.clone().add(1, 'year');
        break;
      case 'herstelcertificaat':
        validationDay = startDay.clone().add(180, 'days');
        break;
      case 'testcertificaat':
        validationDay = startDay.clone().add(72, 'hours');
        break;
    }

    return validationDay.format('YYYY-MM-DD');
  };
}

decorate(SolidStore, {
  ttlStatus: observable,
  createCovidFile: action,
  status: observable,
  handleFiles: observable,
});

export default SolidStore;
