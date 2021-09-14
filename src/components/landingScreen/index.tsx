import { useSession } from '@inrupt/solid-ui-react';
import React, { FC } from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from 'src/consts';

const LandingScreen = (): FC => {
  const { session } = useSession();
  const history = useHistory();

  const handleWorker = () => {
    history.push(ROUTES.worker);
  };

  const handleAdmin = () => {
    history.push(ROUTES.manager);
  };
  return (
    <div>
      {!session.info.isLoggedIn && (
        <p className="grid justify-center content-center">
          Login into your Pod!
        </p>
      )}
      {session.info.isLoggedIn && (
        <div className="grid gap-7 mt-7 justify-center content-center align-middle">
          <button
            className="font-semibold float-right p-5 text-white bg-yellow-400"
            onClick={() => handleWorker()}
          >
            Go to your Worker profile
          </button>
          <button
            className="font-semibold float-right p-5 text-white bg-indigo-700"
            onClick={() => handleAdmin()}
          >
            Go to your admin profile
          </button>
        </div>
      )}
    </div>
  );
};

export default LandingScreen;
