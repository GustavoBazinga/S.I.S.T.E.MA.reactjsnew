import React, { useEffect, useState } from "react";

import CurrencyInput from "react-currency-input";

import "./cartaoalt.css";

import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';

function initialState() {
  return { matricula: "", nome: "", email: "", saldo: "", matricula2: "" };
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


const CartaoAlt = () => {
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    document.getElementById("matricula2AltCartao").disabled = false;
    document.getElementById("nomeAltCartao").disabled = true;
    document.getElementById("emailAltCartao").disabled = true;
    document.getElementById("matriculaAltCartao").disabled = true;
    document.getElementById("saldoAltCartao").disabled = true;
  }, [])

  function toFind(event) {
    event.preventDefault();

    console.log(values);
    if (values.matricula2 !== "") {
      axios
        .get("https://sistemaifrj.herokuapp.com/users/f/" + values.matricula2)
        .then((response) => {
          console.log(response);
          document.getElementById("matricula2AltCartao").disabled = true;
          document.getElementById("nomeAltCartao").disabled = false;
          document.getElementById("emailAltCartao").disabled = false;
          document.getElementById("matriculaAltCartao").disabled = false;
          document.getElementById("saldoAltCartao").disabled = false;
          OnFound({
            valueNome: response.data.nome,
            valueMatricula: response.data.matricula,
            valueEmail: response.data.email,
            valueSaldo: response.data.saldo,
          });
          store.addNotification({
            title: "Localizado!",
            message: "Cartão localizado e dados exibidos!",
            type: "default",
            container: "top-right",
            insert: "top",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              showIcon: true,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      store.addNotification({
        title: "Não foi possível localizar o cartão!",
        message:
          "O campo de busca está vazio. Digite o matrícula do cartão desejado e tente novamente.",
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
    }
  }

  function OnFound({ valueNome, valueMatricula, valueEmail, valueSaldo }) {
    setValues({
      ...values,
      ["nome"]: valueNome,
      ["matricula"]: valueMatricula,
      ["email"]: valueEmail,
      ["saldo"]: valueSaldo / 100,
    });
  }

  function clearMan() {
    setValues(initialState);
    document.getElementById("matricula2AltCartao").disabled = false;
    document.getElementById("nomeAltCartao").disabled = true;
    document.getElementById("emailAltCartao").disabled = true;
    document.getElementById("matriculaAltCartao").disabled = true;
    document.getElementById("saldoAltCartao").disabled = true;
  }

  function onSubmit(event) {
    event.preventDefault();
    if (document.getElementById("matricula2AltCartao").disabled) {
      axios
        .put("https://sistemaifrj.herokuapp.com/users/" + values.matricula2, {
          nome: values.nome,
          matricula: values.matricula,
          email: values.email,
          saldo: values.saldo,
        })
        .then((response) => {
          console.log(response);
          store.addNotification({
            title: "Cadastro atualizado",
            message: "Cartão atualizado com sucesso!",
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
          console.log(error);
        });
    } else {
      store.addNotification({
        title: "Atualização bloqueada!",
        message:
          "É preciso localizar um cartão antes de tentar atualizar. Tente novamente.",
        type: "danger",
        container: "top-right",
        insert: "top",
        animationIn: ["animate__animated", "animate__flash"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          showIcon: true,
        },
      });
    }
  }

  function onDelete(event) {
    event.preventDefault();
    if (document.getElementById("matricula2AltCartao").disabled) {
      axios
        .delete("https://sistemaifrj.herokuapp.com/users/" + values.matricula2)
        .then((response) => {
          console.log(response);
          store.addNotification({
            title: "Exclusão realizada",
            message: "Cartão excluído com sucesso!",
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
          console.log(error);
        });
    } else {
      store.addNotification({
        title: "Exclusão bloqueada!",
        message:
          "É preciso localizar um cartão antes de tentar excluir. Tente novamente.",
        type: "danger",
        container: "top-right",
        insert: "top",
        animationIn: ["animate__animated", "animate__flash"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          showIcon: true,
        },
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
      },
      "& div.buttonGeral": {
        paddingLeft: "40ch",
        //marginTop: "-5ch",
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
    btnLocalizar: {
      width: "16.8ch",
      marginLeft: "1ch",
      height: '7ch',
    },
    buttonSalvar: {
      "&:hover": {
        backgroundColor: "green",
      },
      backgroundColor: "#707070",
      width: "18ch",
      marginLeft: "1ch",
      marginTop: "2ch",
    },
    buttonDeletar: {
      "&:hover": {
        backgroundColor: "red",
      },
      backgroundColor: "gray",
      width: "16ch",
      marginLeft: "1ch",
      marginTop: "2ch",
    },
    buttonLimpar: {
      backgroundColor: "white",
      marginTop: "2ch",
    },

    matricula2: {
      width: "64.7ch",
    },

    nome: {
      "&:disabled": {
        color: "white",
      },
      width: "80ch",
      marginTop: "2ch",
    },

    matricula: {
      width: "38ch",
      marginLeft: "4ch",
      marginTop: "2ch",
    },
    email: {
      width: "38ch",
      marginTop: "2ch",
    },
    saldo:{
      marginTop:'2ch',
    },
    
  }));

  

  const classes = useStyles();
  return (
    <div>
      <ReactNotification />
      <div className="sidebarCardAlt">
        <Sidebar />
      </div>
      <div className="titleCardAlt">
        <h1>Alterar Cartão</h1>
      </div>
      <form onSubmit={onSubmit} className={classes.root}>
        <TextField
          id="matricula2AltCartao"
          name="matricula2"
          value={values.matricula2}
          onChange={OnChange}
          label="Matricula de Busca"
          variant="outlined"
          className={classes.matricula2}
        />

        <Button
          variant="contained"
          onClick={toFind}
          className={classes.btnLocalizar}
        >
          Localizar
        </Button>
        <TextField
          
          id="nomeAltCartao"
          name="nome"
          value={values.nome}
          onChange={OnChange}
          label="Nome Completo"
          variant="outlined"
          className={classes.nome}
          onChange={OnChange}
        />
        <TextField
          
          id="emailAltCartao"
          label="E-mail"
          name="email"
          value={values.email}
          onChange={OnChange}
          className={classes.email}
          variant="outlined"
          onChange={OnChange}
        />
        <TextField
          
          id="matriculaAltCartao"
          name="matricula"
          value={values.matricula}
          onChange={OnChange}
          label="Matricula"
          variant="outlined"
          className={classes.matricula}
          onChange={OnChange}
        />
        <TextField
          
          variant="outlined"
          label="Saldo"
          value={values.saldo}
          onChange={OnChange}
          name="saldo"
          id="saldoAltCartao"
          className={classes.saldo}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        

        <div className="buttonGeral">
          <Button
            variant="contained"
            onClick={clearMan}
            className={classes.buttonLimpar}
          >
            Limpar
          </Button>

          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.buttonDeletar}
            onClick={onDelete}
          >
            Excluir
          </Button>

          <Button
            type="submit"
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

export default CartaoAlt;
