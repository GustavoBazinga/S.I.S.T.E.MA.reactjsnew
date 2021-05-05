import React, { useContext, useEffect, useState } from "react";
import StoreContext from "components/Store/Context";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import axios from "axios";
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import "./vendacesso.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";

function initialState() {
  return {
    colemnDefs: [
      { headerName: "ID do Acesso", field: "id", checkboxSelection: true },
      { headerName: "ID do Vendedor", field: "id_vendedor" },
      { headerName: "Nome do Vendedor", field: "nome_vendedor" },
      { headerName: "ID do Admin", field: "id_admin" },
      { headerName: "Nome do Admin", field: "nome_admin" },
    ],
    rowData: null,
    gridApi: null,
    matricula: "",
    date: null,
  };
}

const VenAcesso = () => {
  const [values, setValues] = useState(initialState);
  const [search, setSearch] = useState(0); //0 -> Sem parametro / 1 -> P/Vendedor / 2 -> P/Data
  const [upgrid, setUpgrid] = useState(0); //0 -> All / 1-> Active / 2 -> Inactive / 3 -> P/Vendedor / 4 -> P/Data
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  var dados = [];

  function OnChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function setRowData(value) {
    setValues({
      ...values,
      [values.rowData]: value,
    });
  }

  useEffect(() => {
    axios.get("https://sistemaifrj.herokuapp.com/acessos").then((response) => {
      setRowData(response.data);
    });
  }, []);
  const defaultColDef = {
    resizable: true,
  };
  const { loginC } = useContext(StoreContext);

  async function changePermission() {
    const selectedNodes = values.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    var corpo = { login: loginC };
    for (var i = 0; i < selectedData.length; i++) {
      if (
        selectedData[i].id_admin == null ||
        selectedData[i].id_admin == undefined
      ) {
        corpo = { login: loginC };
        await axios
          .put(
            "https://sistemaifrj.herokuapp.com/acessos/" + selectedData[i].id,
            corpo
          )
          .then((response) => {
            console.log(response);
            if (upgrid == 0) all();
            else if (upgrid == 1) active();
            else if (upgrid == 2) inactive();
            else if (upgrid == 3) bySeller();
            else if (upgrid == 4) byDate();
          });
      } else {
        corpo = { login: "" };
        await axios
          .put(
            "https://sistemaifrj.herokuapp.com/acessos/" + selectedData[i].id,
            corpo
          )
          .then((response) => {
            console.log(response);
            if (upgrid == 0) {
              all();
            } else if (upgrid == 1) {
              active();
            } else if (upgrid == 2) {
              inactive();
            } else if (upgrid == 3) {
              bySeller();
            } else if (upgrid == 4) {
              byDate();
            }
          });
      }
    }
    console.log(upgrid);
  }

  function all() {
    axios.get("https://sistemaifrj.herokuapp.com/acessos").then((response) => {
      console.log(response);
      setRowData(response.data);
    });
    setUpgrid(0);
  }

  function active() {
    setSearch(0);
    axios
      .get("https://sistemaifrj.herokuapp.com/acessos/allow")
      .then((response) => {
        console.log(response);
        setRowData(response.data);
      });
    setUpgrid(1);
  }

  function inactive() {
    setSearch(0);
    axios
      .get("https://sistemaifrj.herokuapp.com/acessos/requests")
      .then((response) => {
        console.log(response);
        setRowData(response.data);
      });
    setUpgrid(2);
  }

  function bySeller() {
    var acessDados = [];
    var vendID = [];
    axios
      .get("https://sistemaifrj.herokuapp.com/vendedores/f/" + values.matricula)
      .then((response) => {
        vendID = response.data.id;
        axios
          .get("https://sistemaifrj.herokuapp.com/acessos")
          .then((response) => {
            console.log(response);
            acessDados.length = 0;
            for (var i = 0; i < response.data.length; i++) {
              if (response.data[i].id_vendedor == vendID) {
                acessDados.push(response.data[i]);
              }
            }
            setRowData(acessDados);
          });
        // setRowData(response.data);
      });
    setUpgrid(3);
  }

  function byDate() {
    //setUpgrid(4)
  }

  function bySellerAux() {
    setSearch(1);
  }

  function byDateAux() {
    setSearch(2);
  }

  function buscaDados() {
    if (search == 1) {
      bySeller();
    } else if (search == 2) {
      byDate();
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
        <ButtonGroup
          variant="contained"
          color="inherit"
          aria-label="text primary button group"
          className="botaoBrabo"
        >
          <Button onClick={all}>Todos Acessos</Button>
          <Button onClick={active}>Acessos Ativos</Button>
          <Button onClick={inactive}>Acessos Inativos</Button>
          <Button onClick={bySellerAux}>Acessos p/Vendedor</Button>
          <Button onClick={byDateAux}>Acessos p/Data</Button>
        </ButtonGroup>
        {search == "1" && (
          <TextField
            id="outlined-basic"
            type="text"
            label="Matrícula"
            name="matricula"
            value={values.matricula}
            onChange={OnChange}
            variant="outlined"
          />
        )}
        {search == 2 && (
          <TextField
            id="date"
            label="Data para Pesquisa"
            type="date"
            name="date"
            value={values.date}
            onChange={OnChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        {search != 0 && (
          <Button
            variant="contained"
            color="primary"
            onClick={buscaDados}
            className="botaoParametro"
          >
            Buscar
          </Button>
        )}

        <br></br>
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
          <Button
            variant="contained"
            color="primary"
            onClick={changePermission}
          >
            Atualizar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VenAcesso;
