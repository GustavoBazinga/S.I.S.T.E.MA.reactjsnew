import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import StoreContext from 'components/Store/Context';

const RoutesPrivate = ({ component: Component, ...rest}) => {
  const { token } = useContext(StoreContext);
  const sim = true

  return (
    <Route
      {...rest}
      render={() => sim
        ? <Component {...rest} />
        : <Redirect to="/login" />
      }
    />
  )
}

export default RoutesPrivate;
