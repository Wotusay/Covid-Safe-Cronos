import { createContext } from 'react';

import RootStore from '../store/index';

const store = new RootStore();

export const storeContext = createContext(store);
