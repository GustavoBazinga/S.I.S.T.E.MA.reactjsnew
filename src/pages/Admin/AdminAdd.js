import React, { useState } from "react";
//import {useContext} from 'react'

//import StoreContext from "../../components/Store/Context";

import "./adminadd.css";

import axios from "axios";

import Sidebar from "../../components/Sidebar/sidebar.jsx";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
function initialState() {
  return { login: "", nome: "", email: "", crpsenha: "", crpsenhax: "" };
}

const AdminAdd = () => {
  const [values, setValues] = useState(initialState);
  //const {token} = useContext(StoreContext);
  //var tokenmineaspas = JSON.stringify(token).replace(/['"]+/g, "");
  function clearMan() {
    setValues(initialState);
  }

  function onSubmit(event) {
    event.preventDefault();
    if (
      values.nome === "" ||
      values.login === "" ||
      values.email === "" ||
      values.crpsenha === "" ||
      values.crpsenhax === ""
    ) {
      store.addNotification({
        title: "Falha!",
        message: "Preencha todos os campos do formulário!",
        type: "warning",
        container: "top-right",
        insert: "top",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          showIcon: true,
        },
      });
    } else if (values.crpsenha !== values.crpsenhax) {
      store.addNotification({
        title: "Falha!",
        message: "Digite uma senha igual, seu nóia!",
        type: "warning",
        container: "top-right",
        insert: "top",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          showIcon: true,
        },
      });
    } else {
      axios
        .post("https://sistemaifrj.herokuapp.com/admins/", values)
        .then((response) => {
          console.log(response);
          store.addNotification({
            title: "Cadastro realizado",
            message: "Adminstrador Cadastrado com Sucesso!",
            type: "success",
            container: "top-right",
            insert: "top",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              showIcon: true,
            },
          });
          clearMan();
        })
        .catch((error) => {
          store.addNotification({
            title: "Falha!",
            message: "ERICK, FAÇA UM RETORNO DE ERRO MELHOR!",
            type: "danger",
            container: "top-right",
            insert: "top",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              showIcon: true,
            },
          });
          clearMan();
        });
    }
  }

  function OnChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "10ch",

      "& > *": {
        width: "80ch",
        marginLeft: "35ch",
        marginTop: "2ch",
      },

      "& div.buttonGeral": {
        paddingLeft: "54.45ch",
        //marginTop: "-5ch",
      },
      "& button.btnLimpar": {
        width: "12ch",
        fontSize: "2.5ch",
      },
      "& button.btnSalvar": {
        width: "12ch",
        fontSize: "2.5ch",
      },
      "& label.Mui-focused": {
        color: "gray",
      },

      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "gray",
        },
      },
    },

    email: {
      width: "38ch",
    },

    buttonSalvar: {
      "&:hover": {
        backgroundColor: "green",
      },
      backgroundColor: "gray",
      width: "18ch",
      marginLeft: "1ch",
    },
    buttonLimpar: {
      backgroundColor: "white",
    },

    login: {
      width: "38ch",
      marginLeft: "4ch",
    },
    senha: {
      width: "38ch",
    },
    senhaConfirmar: {
      width: "38ch",
      marginLeft: "4ch",
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <ReactNotification />
      <div className="sidebarAddAdm">
        <Sidebar />
      </div>
      <div className="titleAdmAdd">
        <h1>Cadastrar Adminstrador</h1>
      </div>
      <form onSubmit={onSubmit} className={classes.root} name="FormAdmAdd">
        <TextField
          id="outlined-basic"
          name= "nome"
          value = {values.nome}
          onChange={OnChange}
          label="Nome Completo"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="E-mail"
          name= "email"
          value = {values.email}
          onChange={OnChange}
          className={classes.email}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Login"
          name= "login"
          value = {values.login}
          onChange={OnChange}
          className={classes.login}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          type= "password"
          label="Senha"
          name= "crpsenha"
          value = {values.crpsenha}
          onChange={OnChange}
          className={classes.senha}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          type= "password"
          name= "crpsenhax"
          value = {values.crpsenhax}
          onChange={OnChange}
          label="Confirmar Senha"
          className={classes.senhaConfirmar}
          variant="outlined"
        />
        <div className="buttonGeral">
          {/* <button type="button" className="btnLimpar">Limpar</button> */}
          {/* <button type="button" className="btnSalvar">Salvar</button> */}
          <Button variant="contained" onClick={clearMan} className={classes.buttonLimpar}>
            Limpar
          </Button>
          <Button
          type= "submit"
            variant="contained"
            color="primary"
            className={classes.buttonSalvar}
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminAdd;
