import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import StoreProvider from 'components/Store/Provider';
import RoutesPrivate from 'components/Routes/Private/Private';
import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login.jsx';
import AdminAdd from '../../pages/Admin/AdminAdd.js'
import AdminAlt from '../../pages/Admin/AdminAlt.js'
import CartaoAdd from '../../pages/Card/CartaoAdd.js'
import CartaoAlt from '../../pages/Card/CartaoAlt.js'
import CartaoRec from '../../pages/Card/CartaoRec.js'
import ProAdd from '../../pages/Products/ProAdd.js'
import ProAlt from '../../pages/Products/ProAlt.js'
import VenAdd from '../../pages/Seller/VendAdd.js'
import VenAcessos from '../../pages/Seller/VendAcessos.js'
import DepAdd from '../../pages/Dep/DepAdd.js'

const PagesRoot = () => (
  <Router>
    <StoreProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <RoutesPrivate path="/admin/add" component={AdminAdd} />
        <RoutesPrivate path="/admin/alt" component={AdminAlt} />
        <RoutesPrivate path="/cartao/add" component={CartaoAdd} />
        <RoutesPrivate path="/cartao/alt" component={CartaoAlt} />
        <RoutesPrivate path="/cartao/rec" component={CartaoRec} />
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
