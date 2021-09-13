/* eslint-disable no-console */
import { action, decorate, observable } from 'mobx';
import moment from 'moment';

import SolidService from '../services/SolidService';

class SolidStore {
  rootStore: any;
  solidService: any;
  session: any;
  status: string;
  ttlStatus: boolean;

  constructor(rootStore: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.session;
    this.rootStore = rootStore;
    this.solidService = new SolidService();
    this.status = '';
    this.ttlStatus = false;
  }

  grantAccesToCovidFile = async (session: any, user: string) => {
    const { webId } = session.info;
    console.info(webId);
    const spiltLink = webId.split('/');
    const fileLink = `https://${spiltLink[2]}/cronos/covid/covid__info`;
    const agentLink = `https://${user}.solidcommunity.net/profile/card#me`;
    console.info(user);
    await this.solidService.allowAccesToUsers(fileLink, agentLink, session);
  };

  createCovidFile = async (date: string, certificaat: string, session: any) => {
    const { webId } = session.info;
    const spiltLink = webId.split('/');
    const cronosURL = `https://${spiltLink[2]}/cronos/covid/covid__info`;
    const validationDate = this.validationCalculator(date, certificaat);
    await this.solidService.createTTLFile(
      cronosURL,
      session,
      date,
      certificaat,
      validationDate,
    );
    this.status = this.solidService.status;
    console.info(this.status);
  };

  validationCalculator = (date: string, certificaat: string) => {
    const startDay = moment(date);
    let validationDay;
    switch (certificaat) {
      case 'vaccinatiecertificaat':
        validationDay = startDay.clone().add(1, 'year');
        break;
      case 'testcertificaat':
        validationDay = startDay.clone().add(180, 'days');
        break;
      case 'herstelcertificaat':
        validationDay = startDay.clone().add(72, 'hours');
        break;
    }

    return validationDay.format('YYYY-MM-DD');
  };
}

decorate(SolidStore, {
  ttlStatus: observable,
  createCovidFile: action,
  grantAccesToCovidFile: action,
});

export default SolidStore;
