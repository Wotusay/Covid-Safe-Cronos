import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({
  component: Component,
  expression,
  redirectPath,
  ...props
}) => {
  return (
    <Route {...props}>
      {expression ? <Component /> : <Redirect to={redirectPath} />}
    </Route>
  );
};

export default ProtectedRoute;
