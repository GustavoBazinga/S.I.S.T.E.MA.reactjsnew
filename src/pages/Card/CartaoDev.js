import React, { useState } from "react";
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

import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { set } from "js-cookie";

function initialState() {
  return {
    matricula2: "",
    disponivelDev: 0,
    devSolicitado: 0,
  };
}
var valorAntigo = 0;
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
        title: "Não foi possível localizar o caartão!",
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
    console.log(value);
    setValues({
      ...values,
      ["disponivelDev"]: value / 100,
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

  async function onSubmit(event) {
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
    var valorSolicitado = parseInt(
      event.target.value.replace("DevoluçãoR$ ", "").replace(/[\.,]+/g, "")
    );
    var valorDisponivel = values.disponivelDev * 100;
    console.log(valorSolicitado + "  " + valorDisponivel);
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

  return (
    <div>
      <ReactNotification />
      <Sidebar />
      <label>yuiyuiyuiyuiyuiyuiyu</label>
      <div className="espacar">
        <form onSubmit={onSubmit}>
          <div>
            <input
              id="matricula2RecCartao"
              type="text"
              name="matricula2"
              placeholder="Matricula de Busca"
              value={values.matricula2}
              onChange={OnChange}
            />
          </div>
          <CurrencyInput
            prefix="DisponivelR$ "
            decimalSeparator=","
            thousandSeparator="."
            placeholder="Saldo"
            name="saldo"
            id="saldo3AltCartao"
            value={values.disponivelDev}
            onChangeEvent={OnChange}
          />
          <CurrencyInput
            prefix="DevoluçãoR$ "
            decimalSeparator=","
            thousandSeparator="."
            placeholder="Saldo"
            name="devSolicitado"
            id="saldo3AltCartao"
            value={values.devSolicitado}
            onChangeEvent={OnChangeDev}
          />

          <button onClick={Exibir}>ExibirValues</button>
          <button type="submit">Salvar</button>

          <button type="button" onClick={clearMan}>
            Limpar
          </button>
        </form>
        <form onSubmit={toFind}>
          <button type="submit">Localizar</button>
        </form>
      </div>
    </div>
  );
};

export default CartaoDev;
