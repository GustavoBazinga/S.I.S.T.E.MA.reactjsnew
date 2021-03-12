// reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = admins => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Nome", "E-mail"];
  // define an empty array of rows
  const tableRows = [];
  
  // for each ticket pass all its data into an array
  admins.map(result=>{
      const dataAdmin = [
        result.nome,
        result.email,
      ]
      tableRows.push(dataAdmin);
      console.log(dataAdmin)
    })


  
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]; //Dia/Mes/DadosNumericos
  // ticket title. and margin-top + margin-left
  doc.text("Administradores Cadastrados", 14, 14);
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;