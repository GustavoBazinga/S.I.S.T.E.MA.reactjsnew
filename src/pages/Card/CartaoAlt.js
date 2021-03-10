import React, { useState } from "react";

import CurrencyInput from "react-currency-input";

import "./cartaoalt.css";

import axios from "axios";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";

import Sidebar from "../../components/Sidebar/Sidebar.jsx";

function initialState() {
  return { matricula: "", nome: "", email: "", saldo: "", matricula2: "" };
}

const CartaoAlt = () => {
  const [values, setValues] = useState(initialState);

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
      ["matricula"]: valueEmail,
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

  return (
    <div>
      <ReactNotification />
      <Sidebar />

      <form onSubmit={onSubmit} className="form_altCartao">
        <div className="inputCartaoMatricula2_alt">
          <input
            id="matricula2AltCartao"
            type="text"
            name="matricula2"
            placeholder="Matricula de Busca"
            value={values.matricula2}
            onChange={OnChange}
          />
        </div>

        <div className="inputCartaoNome_alt">
          <input
            disabled
            id="nomeAltCartao"
            type="text"
            name="nome"
            placeholder="Nome Completo"
            value={values.nome}
            onChange={OnChange}
          />
        </div>

        <div className="inputCartaoEmail_alt">
          <input
            disabled
            id="emailAltCartao"
            type="text"
            name="email"
            placeholder="E-mail"
            value={values.email}
            onChange={OnChange}
          />
        </div>

        <div className="inputCartaoMatricula_alt">
          <input
            disabled
            id="matriculaAltCartao"
            type="text"
            name="matricula"
            placeholder="Matricula"
            value={values.matricula}
            onChange={OnChange}
          />
        </div>

        <div className="inputCartaoSaldo_alt">
          <CurrencyInput
            prefix="R$ "
            decimalSeparator=","
            thousandSeparator="."
            placeholder="Saldo"
            name="saldo"
            id="saldoAltCartao"
            value={values.saldo}
            onChangeEvent={OnChange}
          />
        </div>

        <button type="submit" className="btnAltCartao">
          Salvar
        </button>

        <button type="button" onClick={clearMan} className="btnAltCartaoLimpar">
          Limpar
        </button>
      </form>
      <form onSubmit={onDelete} className="form_altCartao">
        <button type="submit" className="btnExcCartao">
          Excluir
        </button>
      </form>
      <form onSubmit={toFind} className="form_altCartao">
        <button type="submit" className="btnFindCartao">
          Localizar
        </button>
      </form>
    </div>
  );
};

export default CartaoAlt;
