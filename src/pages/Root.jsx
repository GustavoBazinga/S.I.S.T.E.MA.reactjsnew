import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import StoreProvider from 'components/Store/Provider';
import RoutesPrivate from 'components/Routes/Private/Private';
import Home from './Home/Home';
import Login from './Login/Login';
import AdminAdd from './Admin/AdminAdd.js'
import AdminAlt from './Admin/AdminAlt.js'
import CartaoAdd from './Card/CartaoAdd.js'
import ProAdd from './Products/ProAdd.js'
import VenAdd from './Seller/VendAdd.js'
import CartaoAlt from './Card/CartaoAlt.js'

const PagesRoot = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <RoutesPrivate path="/admin/add" component={AdminAdd} />
        <RoutesPrivate path="/admin/alt" component={AdminAlt} />
        <RoutesPrivate path="/cartao/add" component={CartaoAdd} />
        <RoutesPrivate path="/cartao/alt" component={CartaoAlt} />
        <RoutesPrivate path="/produto/add" component={ProAdd} />
        <RoutesPrivate path="/vendedor/add" component={VenAdd} />
        <RoutesPrivate path="/" component={Home} />
      </Switch>
    </StoreProvider>
  </Router>
)


export default PagesRoot;
