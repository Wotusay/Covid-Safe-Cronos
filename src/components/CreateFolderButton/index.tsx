import React, { FC, useState } from 'react';

import { useStores } from '../../contexts/index';

const CreateFolderButton = (session: any): FC => {
  const { solidStore } = useStores();
  const [status, setStatus] = useState('');

  const handleCreateFolder = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const createFolder = await solidStore.createCronosFolders(session.session);
    setStatus(createFolder);
  };

  return (
    <>
      <p>{status} </p>
      <button onClick={() => handleCreateFolder()}> Create Folders </button>
    </>
  );
};

export default CreateFolderButton;
