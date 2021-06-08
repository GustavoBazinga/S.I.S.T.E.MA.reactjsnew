import React from 'react';
import Sidebar from "../../components/Sidebar/sidebarSeller.jsx";
import logoFundo from '../../images/LogoGIF.gif';

const HomeMob = () => {
  return (
    <div>
    <div className="sidebarHome">
    <Sidebar/>
    </div>
   
    <div className="logocinza">
           <img src={logoFundo} width="300px"  alt=""/>
           <p>Teste</p>
    </div>

    </div>
  );
};

export default HomeMob;
