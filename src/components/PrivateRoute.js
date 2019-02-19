import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const isLoggedIn = true;

/* prettier-ignore */
export const PrivateRoute = ({
  component,
  loginPath,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      isLoggedIn ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: loginPath,
            state: { from: props.location.pathname },
          }}
        />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  loginPath: PropTypes.string,
};

PrivateRoute.defaultProps = {
  loginPath: '/login',
};
