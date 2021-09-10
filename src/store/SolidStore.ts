/* eslint-disable no-console */
import { action, decorate } from 'mobx';

import SolidService from '../services/SolidService';

class SolidStore {
  rootStore: any;
  solidService: any;
  session: any;
  status: string;

  constructor(rootStore: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.session;
    this.rootStore = rootStore;
    this.solidService = new SolidService();
    this.status = '';
  }

  createCronosFolders = async (data: any) => {
    // eslint-disable-next-line no-console
    this.session = data;
    console.log(this.session);
    const { webId } = this.session.info;
    const spiltLink = webId.split('/');
    const cronosURL = `https://${spiltLink[2]}/cronos/covid/`;
    await this.solidService.createFolder(cronosURL, data);
    return (this.status = this.solidService.status);
  };
}

decorate(SolidStore, {
  createCronosFolders: action,
});

export default SolidStore;
