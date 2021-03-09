import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import axios from "axios";

class VenAcesso extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "Nome", field: "nome", checkboxSelection: true },
        { headerName: "Matrícula", field: "matricula" },
        { headerName: "Email", field: "email" },
      ],
      rowData: null,
      //  [
      //   { nome: "Gustavo", login: "bazinga", email: "@gmail" },
      //   { nome: "daniel", login: "danielols26", email: "@outlook" }
      // ]
    };
  }

  componentDidMount() {
    fetch("https://sistemaifrj.herokuapp.com/users/")
      .then((response) => response.json())
      .then((rowData) => this.setState({ rowData }))
      .catch((err) => console.log(err));
  }

  onButtonClick = () => {
    var login;
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data.matricula);
    console.log("Primeiro Console: " + selectedData);
    login = JSON.stringify(selectedData)
    if (selectedData.length === 1) {
      console.log("Segundo Console: ");
      axios
        .delete("https://sistemaifrj.herokuapp.com/users/" + selectedData)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log(login);
      console.log("Tem mais de 1");
      for (var i in selectedData) {
        console.log(selectedData[i]);
        axios
          .delete("https://sistemaifrj.herokuapp.com/users/" + selectedData[i])
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    //  const selectedDataStringPresentation = selectedData.map(node => node.nome + ' ' + node.login).join(', ');
    //  alert(`Selecionados: ${selectedDataStringPresentation}`);
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          width: 602,
          height: 300,
        }}
      >
        <h1>CHUPA</h1>
        <button onClick={this.onButtonClick}>PEGA</button>
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          rowSelection="multiple"
          onGridReady={(params) => (this.gridApi = params.api)}
        />
      </div>
    );
  }
}

export default VenAcesso;
