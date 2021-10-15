import { useSession, LogoutButton } from '@inrupt/solid-ui-react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from 'src/consts';

import LogOutSVG from '../Icons/Logout';

import LoginForm from '../LoginForm';

const Nav = (): React.ReactElement => {
  const { session, sessionRequestInProgress } = useSession();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (!sessionRequestInProgress && !session.info.isLoggedIn) {
      setLoggedIn(false);
    } else if (!sessionRequestInProgress && session.info.isLoggedIn) {
      setLoggedIn(true);
    }
  }, [sessionRequestInProgress, session.info.isLoggedIn]);
  return (
    <div
      className={
        !loggedIn
          ? 'flex items-center justify-center h-screen bg-whiteAccent'
          : ''
      }
    >
      <div
        className={
          !loggedIn
            ? 'grid content-center rounded-xl shadow-xl justify-center bg-blueAccent h-72 w-96 p-2'
            : ''
        }
      >
        <div
          className={
            !loggedIn
              ? 'grid rounded-md justify-center bg-whiteAccent h-52 w-72 shadow-xl'
              : ''
          }
        >
          <div className="p-7">
            <NavLink
              className={
                loggedIn
                  ? 'absolute text-2xl font-semibold text-navyBlue'
                  : 'text-xl font-semibold text-navyBlue'
              }
              to={ROUTES.home}
            >
              Cronos Covidcertifcaten
            </NavLink>
          </div>
          <div>
            {loggedIn && (
              <LogoutButton
                onError={console.error}
                onLogout={() => window.location.reload()}
              >
                <p className="flex float-right gap-2 p-5 -mt-10 font-medium text-white shadow-xl bg-salamonPink rounded-3xl mr-7">
                  Logout <LogOutSVG size={24} color="#fff" />
                </p>
              </LogoutButton>
            )}
            <div className="flex justify-center">
              {!loggedIn && <LoginForm />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
