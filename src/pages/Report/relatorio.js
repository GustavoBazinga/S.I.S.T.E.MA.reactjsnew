import React, { useEffect, useState } from "react";
import generatePDF from "./reportGenerator";
import axios from "axios";
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import './relatorio.css';

const Reports = () => {
  
  const [admins, setAdmins] = useState([]);
  

  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const response = await axios.get("https://sistemaifrj.herokuapp.com/admins/");
        setAdmins(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("error");
      }
    };
    getAllAdmins();
  }, []);


  
  return (
    <div>
      <div className="sidebarRel">
        <Sidebar />
      </div>
      <div className="titleRel">
        <h1>Relatório</h1>
      </div>
        
            <button
              className="buttonRel"
              onClick={() => generatePDF(admins)}
            >
              Relatório
            </button>
           
         
        

    </div>
  );
};

export default Reports;