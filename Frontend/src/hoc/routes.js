import React from 'react';
import {Route, Redirect} from 'react-router-dom';

//You cant visit this route without passing in company details
export const ProtectedRoute = ({ details, path, component: Component }) => (
    <Route
      path={path}
      render={props => (
        details ? 
        <Component {...props} /> :
        <Redirect to='/' />
      )}
    />
  );