import * as firebase from 'firebase/app';

import SolidStore from './SolidStore';

class RootStore {
  solidStore: any;
  firebase: any;

  constructor() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      projectId: process.env.REACT_APP_projectId,
      storageBucket: process.env.REACT_APP_storageBucket,
      messagingSenderId: process.env.REACT_APP_messagingSenderId,
      appId: process.env.REACT_APP_appId,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.solidStore = new SolidStore(this);
    this.firebase = firebase.initializeApp(firebaseConfig);
  }
}

export default RootStore;
