import React, { useEffect, useState } from "react";
import "./cartaorec.css";

import CurrencyInput from "react-currency-input";

import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import { set } from "js-cookie";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";

import NumberFormat from "react-number-format";
import { FaPlusSquare } from "react-icons/fa";

function initialState() {
  return {
    matricula: "",
    nome: "",
    email: "",
    saldo: null,
    matricula2: "",
    saldo2: 0,
    saldo3: null,
    modo: "",
  };
}
var somaRecarga = 0;

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

const CartaoRec = () => {
  const [values, setValues] = useState(initialState);
  const [modoPgt, setModoPgt] = React.useState("");

  useEffect(() => {
    document.getElementById("saldo2RecCartao").disabled = true;
  }, []);

  var atual = values.saldo;

  function toFind(event) {
    event.preventDefault();

    console.log(values);
    if (values.matricula2 !== "") {
      axios
        .get("https://sistemaifrj.herokuapp.com/users/f/" + values.matricula2)
        .then((response) => {
          console.log(response);
          document.getElementById("matricula2RecCartao").disabled = true;
          document.getElementById("nomeRecCartao").disabled = false;
          document.getElementById("emailRecCartao").disabled = false;
          document.getElementById("saldo2RecCartao").disabled = false;
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
      ["matricula"]: valueEmail,
      ["email"]: valueEmail,
      ["saldo"]: valueSaldo / 100,
      ["saldo3"]: valueSaldo / 100,
    });
  }

  function clearMan() {
    somaRecarga = 0;
    setValues(initialState);
    setModoPgt('')
    
    document.getElementById("demo-simple-select-filled").displayEmpty = true
    
    document.getElementById("saldo2RecCartao").disabled = true;
    document.getElementById("matricula2RecCartao").disabled = false;
    // document.getElementById("matricula2AltCartao").disabled = false;
    // document.getElementById("nomeAltCartao").disabled = true;
    // document.getElementById("emailAltCartao").disabled = true;
    // document.getElementById("matriculaAltCartao").disabled = true;
    // document.getElementById("saldoAltCartao").disabled = true;
  }

  async function criaRecarga() {
    await axios.post(
      "https://sistemaifrj.herokuapp.com/recargas/" + values.matricula2,
      {
        modo_pagto: values.modo,
        valor_recarga: values.saldo2 * 100,
      }
    );
  }

  async function atualizaSaldo() {
    await axios.put(
      "https://sistemaifrj.herokuapp.com/recargas/" + values.matricula2,
      {
        saldo: values.saldo3 * 100,
      }
    );
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (document.getElementById("matricula2RecCartao").disabled) {
      if (values.saldo != values.saldo3) {
        if (values.modo != "") {
          criaRecarga();
          atualizaSaldo();
          store.addNotification({
            title: "Recarga realizada!",
            message: "A recarga foi concluída com sucesso!",
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
          clearMan()
        } else {
          store.addNotification({
            title: "Modo de pagamento em branco!",
            message: "Selecione um modo de pagamento e tente novamente.",
            type: "warning",
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
      } else {
        store.addNotification({
          title: "Recarga inválida!",
          message:
            "Nenhum valor foi adicionado a essa recarga. Tente novamente.",
          type: "warning",
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
    } else {
      store.addNotification({
        title: "Recarga bloqueada!",
        message:
          "É preciso localizar um vendedor antes de tentar recarregar. Tente novamente.",
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

  async function OnChange(event) {
    const { value, name } = event.target;
    await setValues({
      ...values,
      [name]: value,
    });
    if (name == "saldo2") {
      somaRecarga = parseFloat(value);
      await somaValor(somaRecarga, true);
    }
  }

  function OnChangeSelect(event) {
    event.preventDefault();
    console.log(event.target.value);
    setValues({
      ...values,
      ["modo"]: event.target.value,
    });
  }

  async function somaValor(valor, jump) {
    if (document.getElementById("matricula2RecCartao").disabled) {
      if (!jump) somaRecarga = somaRecarga + valor;
      else somaRecarga = valor;
      await setValues({
        ...values,
        ["saldo2"]: somaRecarga,
        ["saldo3"]: values.saldo + somaRecarga,
      });
    }
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
        paddingLeft: "54.45ch",
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
      "& .MuiFilledInput-underline:after": {
        borderColor: "gray",
      },
    },
    btnLocalizar: {
      width: "16.8ch",
      marginLeft: "1ch",
      height: "7ch",
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

    buttonLimpar: {
      backgroundColor: "white",
      marginTop: "2ch",
    },

    GrupoButtons: {
      marginTop: "2ch",

      height: "6.2ch",
    },

    matricula2: {
      width: "64.7ch",
    },

    nome: {
      "&:disabled": {
        color: "white",
      },
      width: "38ch",
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
      marginLeft: "4ch",
    },
    saldo: {
      marginTop: "2ch",
      width: "38ch",
    },
    saldo3: {
      marginTop: "2ch",
      width: "38ch",
      marginLeft: "4ch",
    },
    saldo2: {
      marginTop: "2ch",
      width: "38ch",
      marginLeft: "-38ch",
    },
    GrupoButtons1: {
      width: "9.05ch",
    },
    GrupoButtons2: {
      width: "9.05ch",
    },
    GrupoButtons3: {
      width: "9.05ch",
    },
    GrupoButtons4: {
      width: "9.05ch",
    },
    GrupoButtons5: {
      width: "9.05ch",
    },
    formControl: {
      minWidth: 120,
      marginTop: "2ch",
    },
  }));

  const handleChange = (event) => {
    setModoPgt(event.target.value);
    values.modo = event.target.value;
  };

  const classes = useStyles();
  return (
    <div>
      <ReactNotification />
      <div className="sidebarCardRec">
        <Sidebar />
      </div>
      <div className="titleCardRec">
        <h1>Recarregar Cartão</h1>
      </div>
      <form onSubmit={onSubmit} className={classes.root}>
        <TextField
          id="matricula2RecCartao"
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
          disabled
          id="nomeRecCartao"
          name="nome"
          value={values.nome}
          onChange={OnChange}
          label="Nome Completo"
          variant="outlined"
          className={classes.nome}
          onChange={OnChange}
        />

        <TextField
          disabled
          id="emailRecCartao"
          label="E-mail"
          name="email"
          value={values.email}
          onChange={OnChange}
          className={classes.email}
          variant="outlined"
          onChange={OnChange}
        />

        <ButtonGroup
          className={classes.GrupoButtons}
          aria-label="outlined secondary button group"
        >
          <Button
            id="R5"
            onClick={() => {
              somaValor(5, false);
            }}
            className={classes.GrupoButtons1}
          >
            R$5
          </Button>
          <Button
            id="R10"
            onClick={() => {
              somaValor(10, false);
            }}
            className={classes.GrupoButtons2}
          >
            R$10
          </Button>
          <Button
            id="R20"
            onClick={() => {
              somaValor(20, false);
            }}
            className={classes.GrupoButtons3}
          >
            R$20
          </Button>
          <Button
            id="R50"
            onClick={() => {
              somaValor(50, false);
            }}
            className={classes.GrupoButtons4}
          >
            R$50
          </Button>
          <Button
            id="R100"
            onClick={() => {
              somaValor(100, false);
            }}
            className={classes.GrupoButtons5}
          >
            R$100
          </Button>
        </ButtonGroup>

        <TextField
          variant="outlined"
          label="Valor da Recarga"
          value={values.saldo2}
          onChange={OnChange}
          name="saldo2"
          id="saldo2RecCartao"
          className={classes.saldo2}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />

        <TextField
          disabled
          variant="outlined"
          label="Saldo Atual"
          value={values.saldo}
          onChange={OnChange}
          name="saldo"
          id="saldoRecCartao"
          className={classes.saldo}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />

        <TextField
          disabled
          variant="outlined"
          label="Pós Recarga"
          value={values.saldo3}
          onChange={OnChange}
          name="saldo3"
          id="saldo3RecCartao"
          className={classes.saldo3}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel id="demo-simple-select-filled-label">
            Modo de pagamento
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={modoPgt}
            onChange={handleChange}
          >
            <MenuItem value="dinheiro">Dinheiro</MenuItem>
            <MenuItem value="cartao">Cartão</MenuItem>
          </Select>
        </FormControl>

        <div className="buttonGeral">
          {/* <button type="button" className="btnLimpar">Limpar</button> */}
          {/* <button type="button" className="btnSalvar">Salvar</button> */}
          <Button
            variant="contained"
            onClick={clearMan}
            className={classes.buttonLimpar}
          >
            Limpar
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonSalvar}
          >
            Recarregar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CartaoRec;
