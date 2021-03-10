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
    matricula: "",
    nome: "",
    email: "",
    saldo: 0,
    matricula2: "",
    saldo2: 0,
    saldo3: 0,
    modo: "",
  };
}
var somaRecarga = 0;
const CartaoRec = () => {
  const [values, setValues] = useState(initialState);
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
    setValues(initialState);
    document.getElementById("matricula2AltCartao").disabled = false;
    document.getElementById("nomeAltCartao").disabled = true;
    document.getElementById("emailAltCartao").disabled = true;
    document.getElementById("matriculaAltCartao").disabled = true;
    document.getElementById("saldoAltCartao").disabled = true;
  }

  async function criaRecarga() {
    await axios
      .post("https://sistemaifrj.herokuapp.com/recargas/" + values.matricula2, {
        modo_pagto: values.modo,
        valor_recarga: values.saldo2 * 100,
      })
      .then((response) => {
        console.log("POST Response:");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function atualizaSaldo() {
    await axios
      .put("https://sistemaifrj.herokuapp.com/recargas/" + values.matricula2, {
        saldo: values.saldo3 * 100,
      })
      .then((response) => {
        console.log("PUT Response:");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  async function onSubmit(event) {
    event.preventDefault();
    console.log(values.saldo * 100);
    console.log(values.saldo2 * 100);
    console.log(values.saldo3 * 100);
    criaRecarga();
    atualizaSaldo();

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

  function OnChangeSelect(event){
    event.preventDefault();
    console.log(event.target.value)
    setValues({
      ...values,
      ["modo"]: event.target.value
    })
  }
  function Exibir(event){
    event.preventDefault();
    console.log(values)
  }

  async function somaValor(event) {
    event.preventDefault();

    somaRecarga = somaRecarga + parseInt(event.target.name) * 100;
    var somaLocal = somaRecarga / 100;
    setValues({
      ...values,
      ["saldo2"]: somaLocal,
      ["saldo3"]: values.saldo + somaLocal,
    });
  }

  return (
    <div>
      <ReactNotification />
      <Sidebar />
      <label>asdasasdasdadsasdasddaadsdasads</label>
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
          <div>
            <input
              disabled
              id="nomeRecCartao"
              type="text"
              name="nome"
              placeholder="Nome Completo"
              value={values.nome}
              onChange={OnChange}
            />
          </div>

          <div>
            <input
              disabled
              id="emailRecCartao"
              type="text"
              name="email"
              placeholder="E-mail"
              value={values.email}
              onChange={OnChange}
            />
          </div>
          <button name="5" onClick={somaValor}>
            R$ 5
          </button>
          <button name="10" onClick={somaValor}>
            R$ 10
          </button>
          <button name="20" onClick={somaValor}>
            R$ 20
          </button>
          <button name="50" onClick={somaValor}>
            R$ 50
          </button>
          <button name="100" onClick={somaValor}>
            R$ 100
          </button>

          <CurrencyInput
            prefix="ValorRecargaR$ "
            decimalSeparator=","
            thousandSeparator="."
            placeholder="Saldo"
            name="saldo2"
            id="saldo2AltCartao2"
            value={values.saldo2}
            onChangeEvent={OnChange}
          />
          <CurrencyInput
            prefix="SaldoAtualR$ "
            decimalSeparator=","
            thousandSeparator="."
            placeholder="Saldo"
            name="saldo"
            id="saldoAltCartao"
            value={values.saldo}
            onChangeEvent={OnChange}
          />
          <CurrencyInput
            prefix="PosRecargaR$ "
            decimalSeparator=","
            thousandSeparator="."
            placeholder="Saldo"
            name="saldo"
            id="saldo3AltCartao"
            value={values.saldo3}
            onChangeEvent={OnChange}
          />
          <select onChange={OnChangeSelect}>
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao">Cartão</option>
          </select>
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

export default CartaoRec;
