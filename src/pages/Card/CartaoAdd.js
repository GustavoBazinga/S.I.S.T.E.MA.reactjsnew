import React, { useState } from "react";

import CurrencyInput from "react-currency-input";

//FAZER CSS VENDEDORADD

import axios from "axios";

import Sidebar from "../../components/Sidebar/sidebar.jsx";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "animate.css"
import "./cartaoadd.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';
function initialState() {
  return {
    matricula: "",
    nome: "",
    email: "",
    saldo: "",
  };
}


function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      fixedDecimalScale={true}
      decimalScale={2}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      prefix="R$"
    />
  );
}


const CartaoAdd = () => {


  const [values, setValues] = useState(initialState);



  function clearMan() {
    setValues(initialState);
  }
  function onSubmit(event) {
    event.preventDefault();

    if (values.nome !== "" && values.matricula !== "" && values.email !== ""){
      console.log("Entrou")
      axios
      .post("https://sistemaifrj.herokuapp.com/users/", {
        matricula: values.matricula,
        nome: values.nome,
        email: values.email,
        saldo: values.saldo.replace("R$ ", "").replace(/[\.,]+/g, "")
      })
      .then((response) => {
        store.addNotification({
          title: "Cadastro realizado",
          message: "Cartão cadastrado com sucesso!",
          type: "success",
          container: "top-right",
          insert:"top",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            showIcon: true
          }
        })
        clearMan()
      })
      .catch((error) => {
        store.addNotification({
          title: "Falha!",
          message: "ERICK, FAÇA UM RETORNO DE ERRO MELHOR!",
          type: "danger",
          container: "top-right",
          insert:"top",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            showIcon: true
          }
        })
        clearMan()
      });
    }else{
      store.addNotification({
        title: "Falha!",
            message: "Preencha todos os campos do formulário!",
            type: "warning",
            container: "top-right",
            insert:"top",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              showIcon: true
            }
      })
    }
  }
  function OnChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  

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

    matricula: {
      width: "38ch",
      marginLeft: "4ch",
    },
    saldo: {
      width: "80ch",
    },
    
  }));

  const classes = useStyles();
  
  return (
    <div>
      <ReactNotification />
      <div className="sidebarAddCard">
        <Sidebar />
      </div>
      <div className="titleAdmCard">
        <h1>Cadastrar Cartão</h1>
      </div>
      <form onSubmit={onSubmit} className={classes.root}>
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
          label="Matrícula"
          name= "matricula"
          value = {values.matricula}
          onChange={OnChange}
          className={classes.matricula}
          variant="outlined"
        />
        <TextField
          variant="outlined"
          label="Saldo"
          value={values.saldo}
          onChange={OnChange}
          name="saldo"
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
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

export default CartaoAdd;
