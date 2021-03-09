import React, { useState } from "react";

import CurrencyInput from "react-currency-input";

//FAZER CSS VENDEDORADD

import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "animate.css"
import "./cartaoadd.css";

function initialState() {
  return {
    matricula: "",
    nome: "",
    email: "",
    saldo: "0",
  };
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

  return (
    <div>
      <ReactNotification />
      <Sidebar />

      <form onSubmit={onSubmit} className="form_addCartao">
        <div className="inputCartaoNome">
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            value={values.nome}
            onChange={OnChange}
          />
        </div>
        <div className="inputCartaoEmail">
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={values.email}
            onChange={OnChange}
          />
        </div>
        <div className="inputCartaoMatricula">
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={values.matricula}
            onChange={OnChange}
          />
        </div>

        <div className="inputCartaoSaldo">
          <CurrencyInput
            prefix="R$ "
            decimalSeparator=","
            thousandSeparator="."
            placeholder="Saldo"
            name="saldo"
            
            value={values.saldo}
            onChangeEvent={OnChange}
          />
        </div>

        <button type="submit" className="btnAddCartao">
          Salvar
        </button>
        <button type="button" className="btnAddAdmLimpar" onClick={clearMan}>
          Limpar
        </button>
      </form>
    </div>
  );
};

export default CartaoAdd;
