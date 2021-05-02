import React, { useContext, useEffect, useState } from "react";
import StoreContext from "components/Store/Context";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import axios from "axios";
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import "./vendacesso.css";

function initialState() {
  return {
    colemnDefs: [
      { headerName: "ID do Acesso", field: "id", checkboxSelection: true },
      { headerName: "ID do Vendedor", field: "id_vendedor" },
      { headerName: "Nome do Vendedor", field: "nome_vendedor" },
      { headerName: "ID do Admin", field: "id_admin" },
      { headerName: "Nome do Admin", field: "nome_admin" },
    ],
    rowData:null,
    gridApi:null,
  };
}

const VenAcesso = () => {
  const [values, setValues] = useState(initialState);

  function setRowData(value) {
    setValues({
      ...values,
      [values.rowData]: value,
    });
  }

  useEffect(() => {
    axios
    .get("https://sistemaifrj.herokuapp.com/acessos")
    .then((response) => {
      console.log(response)
      setRowData(response.data);
     
    })
    
   
  }, []);
  const defaultColDef = {
    resizable: true,
  };
  const {loginC} = useContext(StoreContext);
  console.log(values.null)
  console.log("AS")

  function OnClick(){

    const selectedNodes = values.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data.id);
    console.log("Primeiro Console: " + selectedData);
    var corpo = {login: loginC,}
    if (selectedData.length === 1) {
      axios
      .put("https://sistemaifrj.herokuapp.com/acessos/"+ selectedData, corpo)
      .then((response) =>{
        console.log(response)
      })
    }
  }
  return (
    <div>
      <div className="ag-theme-balham">
        <div className="sidebarSellerAcesso">
          <Sidebar />
        </div>
        <div className="titleSellerAcesso">
          <h1>Alterar Acesso</h1>
        </div>
        <button className="botaoBrabo" onClick={OnClick}>
          PEGA
        </button>
        <div
          style={{
            width: 950,
            height: 300,
            marginLeft: "43ch",
          }}
        >
          <AgGridReact
            defaultColDef={defaultColDef}
            autoSizePadding={true}
            columnDefs={values.colemnDefs}
            rowData={values.null}
            rowSelection="multiple"
            onGridReady={(params) => (values.gridApi = params.api)}
          />
        </div>
      </div>
    </div>
  );
};

export default VenAcesso;

// class VenAcesso extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       columnDefs: [
//         { headerName: "ID do Acesso", field: "id", checkboxSelection: true },
//         { headerName: "ID do Vendedor", field: "id_vendedor" },
//         { headerName: "Nome do Vendedor", field: "nome_vendedor" },
//         { headerName: "ID do Admin", field: "id_admin" },
//         { headerName: "Nome do Admin", field: "nome_admin" },
//       ],
//       rowData: null,
//     };
//   }

//   componentDidMount() {
//     fetch("https://sistemaifrj.herokuapp.com/acessos/")
//       .then((response) => response.json())
//       .then((rowData) => this.setState({ rowData }))
//       .catch((err) => console.log(err));
//   }

//   onButtonClick = () => {
//     var login;
//     const selectedNodes = this.gridApi.getSelectedNodes();
//     const selectedData = selectedNodes.map((node) => node.data.matricula);
//     console.log("Primeiro Console: " + selectedData);
//     login = JSON.stringify(selectedData);
//     if (selectedData.length === 1) {
//       console.log("Segundo Console: ");
//       axios
//         .put("https://sistemaifrj.herokuapp.com/users/" + selectedData + "")
//         .then((response) => {
//           console.log(response);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       console.log(login);
//       console.log("Tem mais de 1");
//       for (var i in selectedData) {
//         console.log(selectedData[i]);
//         axios
//           .delete("https://sistemaifrj.herokuapp.com/users/" + selectedData[i])
//           .then((response) => {
//             console.log(response);
//           })
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     }
//     this.componentDidMount();
//     //  const selectedDataStringPresentation = selectedData.map(node => node.nome + ' ' + node.login).join(', ');
//     //  alert(`Selecionados: ${selectedDataStringPresentation}`);
//   };

//   render() {
//     const defaultColDef = {
//       resizable: true,
//     };

//     return (
//       <div className="ag-theme-balham">
//         <div className="sidebarSellerAcesso">
//           <Sidebar />
//         </div>
//         <div className="titleSellerAcesso">
//           <h1>Alterar Acesso</h1>
//         </div>
//         <button className="botaoBrabo" onClick={this.onButtonClick}>
//           PEGA
//         </button>
//         <div
//           style={{
//             width: 950,
//             height: 300,
//             marginLeft: "43ch",
//           }}
//         >
//           <AgGridReact
//             defaultColDef={defaultColDef}
//             autoSizePadding={true}
//             columnDefs={this.state.columnDefs}
//             rowData={this.state.rowData}
//             rowSelection="multiple"
//             onGridReady={(params) => (this.gridApi = params.api)}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default VenAcesso;
