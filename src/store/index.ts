import SolidStore from './SolidStore';

class RootStore {
  solidStore: any;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.solidStore = new SolidStore(this);
  }
}

export default RootStore;
