import { useContext } from 'react';

import { storeContext } from '../hooks/index';

export const useStores = (): any => useContext(storeContext);
