import React, { FC, useState } from 'react';

import { useStores } from '../../contexts/index';

const CreateFolderButton = (session: any): FC => {
  const { solidStore } = useStores();
  const [status, setStatus] = useState('');

  const handleCreateFolder = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    await solidStore.createCronosFolders(session.session);
    setStatus(solidStore.status);
  };

  return (
    <>
      <div className="flex content-center justify-center">
        <button
          className="font-semibold text-white bg-indigo-700 w-44 rounded-sm p-5"
          onClick={() => handleCreateFolder()}
        >
          Create Folders
        </button>
      </div>
      <p className="flex content-center justify-center mt-5 "> {status} </p>
    </>
  );
};

export default CreateFolderButton;
