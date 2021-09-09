import React, { FC } from 'react';

import { useStores } from '../../contexts/index';

const CreateFolderButton = (session: any): FC => {
  const { solidStore } = useStores();

  const handleCreateFolder = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    solidStore.createCronosFolders(session.session);
  };

  return <button onClick={() => handleCreateFolder()}> Create Folders </button>;
};

export default CreateFolderButton;
