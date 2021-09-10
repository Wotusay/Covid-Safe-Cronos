/* eslint-disable no-console */
import { action, decorate, observable } from 'mobx';

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

  createCovidFile = async (date: string, certificaat: string, session: any) => {
    const { webId } = this.session.info;
    const spiltLink = webId.split('/');
    const cronosURL = `https://${spiltLink[2]}/cronos/covid/covid__info`;
    await this.solidService.createTTLFile(
      cronosURL,
      session,
      date,
      certificaat,
    );
  };
}

decorate(SolidStore, {
  ttlStatus: observable,
  createCovidFile: action,
});

export default SolidStore;
