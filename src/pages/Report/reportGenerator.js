// reportGenerator.js

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call
import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = (identificador, dados) => {
  console.log(dados)
  const doc = new jsPDF();
  const date = Date().split(" ");

  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]; 
  
  if (identificador == "adm"){
  const tableColumn = ["Nome", "E-mail"];
  const tableRows = [];

  dados.map(result=>{
      const dataAdmin = [
        result.nome,
        result.email,
      ]
      tableRows.push(dataAdmin);
      console.log(dataAdmin)
    })
  doc.text("Administradores Cadastrados", 14, 14);
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  doc.save(`report_${dateStr}.pdf`);
  }
  else if (identificador == "sell"){
    const tableColumn = ["Matrícula","Nome", "E-mail"];
  const tableRows = [];
  dados.map(result=>{
      const dataSeller = [
        result.matricula,
        result.nome,
        result.email,
      ]
      tableRows.push(dataSeller);
      console.log(dataSeller)
    })
  doc.text("Vendedores Cadastrados", 80, 14);
  doc.text("Total de Cadastros:"+ dados.length, 14,21)
  doc.autoTable(tableColumn, tableRows, { startY: 24 });
  doc.save(`report_${dateStr}.pdf`);
  }
  else if (identificador == "prod"){
     // define the columns we want and their titles
  const tableColumn = ["Nome do Produto", "Estoque"];
  // define an empty array of rows
  const tableRows = [];
  const quantidade = [];

  dados.map(result=>{
      const dataAdmin = [
        result.nome,
        result.estoque,
      ]

      quantidade.push(result.estoque)
      console.log(dataAdmin)
      console.log(quantidade)
    })

    quantidade.sort((a, b) => (a > b) ? 1 : -1)

    console.log(quantidade)

    quantidade.map(resultado =>{
      dados.map(result=>{
        if(result.estoque == resultado){
          const teste = [
            result.nome,
            result.estoque
          ]
          tableRows.push(teste);
        }
      })
    })

  console.log(tableRows)

  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]; //Dia/Mes/DadosNumericos
  // ticket title. and margin-top + margin-left
  doc.text("Estoque dos produtos", 14, 14);
  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};
}
export default generatePDF;