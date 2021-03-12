import React, { useEffect, useState } from "react";
import "./cartaodev.css";

import CurrencyInput from "react-currency-input";

import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import Sidebar from "../../components/Sidebar/sidebar.jsx";
import { set } from "js-cookie";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import PropTypes from "prop-types";

import NumberFormat from "react-number-format";
import { FaLastfmSquare } from "react-icons/fa";
import { SignalCellularNull } from "@material-ui/icons";

function initialState() {
  return {
    matricula2: "",
    disponivelDev: 0,
    devSolicitado: null,
  };
}
var valorAntigo = 0;

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

const CartaoDev = () => {
  const [values, setValues] = useState(initialState);
  var atual = values.saldo;


  function toFind(event) {
    event.preventDefault();

    console.log(values);
    if (values.matricula2 !== "") {
      axios
        .get("https://sistemaifrj.herokuapp.com/users/r/" + values.matricula2)
        .then((response) => {
          console.log(response);
          document.getElementById("matricula2DevCartao").disabled = true;
          document.getElementById("devSolicitadoCartao").disabled = false;
          OnFound({
            value: response.data,
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

  function OnFound({ value }) {
    setValues({
      ...values,
      ["disponivelDev"]: value / 100,
    });
  }

  async function clearMan() {
    document.getElementById("matricula2DevCartao").disabled = false;
    document.getElementById("devSolicitadoCartao").disabled = true;
    await setValues(initialState);
    // window.location.reload()
  }

  async function OnSubmit(event) {
    event.preventDefault();
    var saldoTotal;
    await axios
      .get("https://sistemaifrj.herokuapp.com/users/f/" + values.matricula2)
      .then((response) => {
        console.log(response);
        saldoTotal = response.data.saldo;
        console.log(saldoTotal);
      })
      .catch((error) => {
        console.log(error);
      });
    var saldoFinal = saldoTotal - values.devSolicitado * 100;
    console.log(saldoFinal);
    await axios
      .put("https://sistemaifrj.herokuapp.com/recargas/" + values.matricula2, {
        saldo: saldoFinal,
      })
      .then((response) => {
        console.log("PUT Response:");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    await axios
      .post("https://sistemaifrj.herokuapp.com/recargas/" + values.matricula2, {
        modo_pagto: "dinheiro",
        valor_recarga: values.devSolicitado * -100,
      })
      .then((response) => {
        console.log("POST Response:");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();

    //   axios
    //     .put("https://sistemaifrj.herokuapp.com/recargas/" + values.matricula2, {
    //       nome: values.nome,
    //       matricula: values.matricula,
    //       email: values.email,
    //       saldo: values.saldo,
    //     })
    //     .then((response) => {
    //       console.log(response)
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    //else {
    //   store.addNotification({
    //     title: "Atualização bloqueada!",
    //     message:
    //       "É preciso localizar um cartão antes de tentar atualizar. Tente novamente.",
    //     type: "danger",
    //     container: "top-right",
    //     insert: "top",
    //     animationIn: ["animate__animated", "animate__flash"],
    //     animationOut: ["animate__animated", "animate__fadeOut"],
    //     dismiss: {
    //       duration: 3000,
    //       showIcon: true,
    //     },
    //   });
    //    }
  }

  function OnChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  async function OnChangeDev(event) {
    var valorSolicitado = event.target.value * 100;
    console.log("Solicitado: " + valorSolicitado);
    var valorDisponivel = values.disponivelDev * 100;
    console.log(valorSolicitado + " A " + valorDisponivel);
    if (valorSolicitado > valorDisponivel) {
      console.log(valorAntigo);
      setValues({
        ...values,
        ["devSolicitado"]: valorAntigo / 100,
      });
      store.addNotification({
        title: "Erro!",
        message:
          "O valor de devolução solicitado não pode exeder o valor disponível!.",
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
      valorAntigo = valorSolicitado;
      setValues({
        ...values,
        ["devSolicitado"]: valorSolicitado / 100,
      });
    }
  }

  function Exibir(event) {
    event.preventDefault();
    console.log(values);
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
    },
    saldo3: {
      marginTop: "2ch",
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

  const classes = useStyles();
  return (
    <div>
      <ReactNotification />
      <div className="sidebarCardDev">
        <Sidebar />
      </div>
      <div className="titleCardDev">
        <h1>Devolução</h1>
      </div>

      <form onSubmit={OnSubmit} className={classes.root}>
        <TextField
          id="matricula2DevCartao"
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
          variant="outlined"
          label="Valor disponível"
          value={values.disponivelDev}
          onChange={OnChange}
          name="saldo"
          id="saldo3DevCartao"
          className={classes.saldo3}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />

        <TextField
          disabled
          variant="outlined"
          label="Devolução"
          value={values.devSolicitado}
          onChange={OnChangeDev}
          name="devSolicitado"
          id="devSolicitadoCartao"
          className={classes.saldo}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />

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
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CartaoDev;
