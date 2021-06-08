import React, { useEffect, useState } from "react";
import generatePDF from "./reportGenerator";
import axios from "axios";
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import "./relatorio.css";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

const Reports = () => {
  const [dados, setDados] = useState([]);

  // useEffect(() => {

  // }, []);

  async function findAdmin(event) {
    event.preventDefault();
      await axios
        .get("https://sistemaifrj.herokuapp.com/admins/")
        .then((response) => {
          generatePDF("adm", response.data)
        });

  }

  async function findSeller(event) {
    event.preventDefault();
      await axios
        .get("https://sistemaifrj.herokuapp.com/vendedores/")
        .then((response) => {
          generatePDF("sell", response.data)
        });
  }

  async function findProd(event) {
    event.preventDefault();
      await axios
        .get("https://sistemaifrj.herokuapp.com/produtos/")
        .then((response) => {
          console.log(response.data)
          generatePDF("prod", response.data)
        });

  }

  const useStyles = makeStyles({
    table: {
      width: "40ch",
    },
    tableContaneir: {
      width: "40ch",
      maxHeight: "70ch",
    },
    head: {
      textAlign: "center",
      fontSize: "2ch",
    },
    formControl: {
      minWidth: 120,
      marginTop:'2ch',
      
    },
    div: {
      marginLeft: "50ch",
      marginTop: "10ch",
    },
    adm: {
      "&:hover": {
        backgroundColor: "#FFFFFF",
      },
      backgroundColor: "#DCDCDC",
      transition: "0.2s",
    },
    vendedor: {
      "&:hover": {
        backgroundColor: "#FFFFFF",
      },
      backgroundColor: "#C0C0C0",
      transition: "0.2s",
    },
    produtos: {
      "&:hover": {
        backgroundColor: "#FFFFFF",
      },
      backgroundColor: "#DCDCDC",
      transition: "0.2s",
    },
    vendas: {
      "&:hover": {
        backgroundColor: "#FFFFFF",
      },
      backgroundColor: "#C0C0C0",
      transition: "0.2s",
    },
  });
  const classes = useStyles();

  return (
    <div>
      <div className="sidebarRel">
        <Sidebar />
      </div>
      <div className={classes.div}>
      {/* <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              // value={categ}
              // onChange={}
            >
              <MenuItem value="Doce">Doce</MenuItem>
              <MenuItem value="Salgado">Salgado</MenuItem>
              
            </Select>
          </FormControl> */}
        <TableContainer component={Paper} className={classes.tableContaneir}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>Relatórios</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow onClick={findAdmin} className={classes.adm}>
                <TableCell>Administradores Cadastrados</TableCell>
              </TableRow>
              <TableRow onClick={findSeller}className={classes.vendedor}>
                <TableCell>Vendedores Cadastrados</TableCell>
              </TableRow>
              <TableRow onClick={findProd}className={classes.produtos}>
                <TableCell>Estoque dos produtos</TableCell>
              </TableRow>
              <TableRow className={classes.vendas}>
                <TableCell>Vendas dos últimos 30 dias</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Reports;
