import React from 'react';
import './Home.css';
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import logoFundo from '../../images/logotestecinza.svg';

const PagesHome = () => {
  return (
    <div>
    <div className="sidebarHome">
    <Sidebar/>
    </div>
   
    <div className="logocinza">
           <img src={logoFundo} width="500px"  alt=""/>
    </div>

    </div>
  );
};

export default PagesHome;
