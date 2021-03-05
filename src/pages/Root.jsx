import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import StoreProvider from 'components/Store/Provider';
import RoutesPrivate from 'components/Routes/Private/Private';
import Home from './Home/Home';
import Login from './Login/Login.jsx';
import AdminAdd from './Admin/AdminAdd.js'
import AdminAlt from './Admin/AdminAlt.js'
import CartaoAdd from './Card/CartaoAdd.js'
import ProAdd from './Products/ProAdd.js'
import ProAlt from './Products/ProAlt.js'
import VenAdd from './Seller/VendAdd.js'
import CartaoAlt from './Card/CartaoAlt.js'
import DepAdd from './Dep/DepAdd.js'
import VenAcessos from './Seller/VendAcessos.js'

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
        <RoutesPrivate path="/produto/alt" component={ProAlt} />
        <RoutesPrivate path="/vendedor/add" component={VenAdd} />
        <RoutesPrivate path="/departamento/add" component={DepAdd}/>
        <RoutesPrivate path="/vendedor/acessos" component={VenAcessos}/>
        <RoutesPrivate path="/" component={Home} />
      </Switch>
    </StoreProvider>
  </Router>
)


export default PagesRoot;
