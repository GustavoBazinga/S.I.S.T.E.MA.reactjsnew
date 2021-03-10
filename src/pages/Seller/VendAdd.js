import React, { useState } from "react";

//FAZER CSS VENDEDORADD

import axios from "axios";

import "./vendadd.css";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";

import Sidebar from "../../components/Sidebar/Sidebar.jsx";

function initialState() {
  return { matricula: "", nome: "", email: "", crpsenha: "", crpsenhax: "" };
}

const VenAdd = () => {
  const [values, setValues] = useState(initialState);
  function clearMan() {
    setValues(initialState);
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log("");
    if (
      values.nome !== "" &&
      values.matricula !== "" &&
      values.email !== "" &&
      values.crpsenha !== "" &&
      values.crpsenhax !== ""
    ) {
      if (values.crpsenha !== values.crpsenhax) {
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
        console.log("");
        axios
          .post("https://sistemaifrj.herokuapp.com/vendedores/", values)
          .then((response) => {
            console.log(response);
            store.addNotification({
              title: "Cadastro realizado",
              message: "Vendedor Cadastrado com Sucesso!",
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
      }
    } else {
      console.log("");
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

      <form onSubmit={onSubmit} className="form_addVend">
        <div className="inputVendNome">
          <input
            type="text"
            name="nome"
            placeholder="Nome Completo"
            value={values.nome}
            onChange={OnChange}
          />
        </div>
        <div className="inputVendEmail">
          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={values.email}
            onChange={OnChange}
          />
        </div>
        <div className="inputVendMatricula">
          <input
            type="text"
            name="matricula"
            placeholder="Matrícula"
            value={values.matricula}
            onChange={OnChange}
          />
        </div>

        <div className="inputVendSenha">
          <input
            type="password"
            name="crpsenha"
            placeholder="Senha"
            value={values.crpsenha}
            onChange={OnChange}
          />
        </div>
        <div className="inputVendSenhaConfirmar">
          <input
            type="password"
            name="crpsenhax"
            placeholder="Confirmar Senha"
            value={values.crpsenhax}
            onChange={OnChange}
          />
        </div>

        

        <button type="submit" className="btnAddVend">
          Salvar
        </button>
        <button type="button" className="btnAddVendLimpar" onClick={clearMan}>
          Limpar
        </button>
      </form>
    </div>
  );
};

export default VenAdd;
