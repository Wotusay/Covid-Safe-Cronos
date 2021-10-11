import { decorate, observable } from 'mobx';

import SolidService from '../services/SolidService';

import RootStore from './index';
class UIStore {
  rootStore: RootStore;
  solidService: SolidService;
  solidItems: Array<any>;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.solidService = new SolidService();
    this.solidItems = [];
  }

  checkUploadedFiles = async (session: any): Promise<any> => {
    const { webId } = session.info;
    const splitLink = webId.split('/');
    const cronosURL = `https://${splitLink[2]}/cronos/covid/covid__info`;

    const thingItems = await this.solidService.getSolidDataCovid(
      session,
      cronosURL,
    );

    await thingItems.map(item => {
      this.solidItems.push(item);
    });

    return await this.solidItems;
  };
}

decorate(UIStore, {
  solidItems: observable,
});

export default UIStore;
