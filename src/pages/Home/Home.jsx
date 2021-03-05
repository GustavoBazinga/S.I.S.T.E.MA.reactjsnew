import React from 'react';
import './home.css';
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import logoFundo from '../../images/logotestecinza.svg';

const PagesHome = () => {
  return (
    <>
    <Sidebar/>
   
    <div className="logocinza">
           <img src={logoFundo} width="500px"  alt=""/>
    </div>

    </>
  );
};

export default PagesHome;
