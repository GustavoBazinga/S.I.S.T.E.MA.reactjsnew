import React, { useState } from "react";
//import {useContext} from 'react'

//import StoreContext from "../../components/Store/Context";

import "./adminadd.css";

import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "animate.css"


function initialState() {
  return { login: "", nome: "", email: "", crpsenha: "", crpsenhax: "" };
}

const AdminAdd = () => {
  const [values, setValues] = useState(initialState);
  //const {token} = useContext(StoreContext); 
  //var tokenmineaspas = JSON.stringify(token).replace(/['"]+/g, "");
  function clearMan(){
		setValues(initialState);
	}

  function onSubmit(event) {
    event.preventDefault();
    if (values.nome === "" || values.login === "" || values.email === "" || values.crpsenha === "" || values.crpsenhax === ""){
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
    else if (values.crpsenha !== values.crpsenhax) {
      store.addNotification({
        title: "Falha!",
            message: "Digite uma senha igual, seu nóia!",
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
      <ReactNotification/>
      <Sidebar />
      <div className="titleAdmAdd">
        <h1>Cadastrar Adminstrador</h1>
      </div>
      <form onSubmit={onSubmit} className="form_addAdmin" name="FormAdmAdd">
        <div className="inputAdmNome">
          <input
            type="text"
            name="nome"
            value={values.nome}
            onChange={OnChange}
            required
          />
          <div className="underlineAdmNome"></div>
          <label className="labelAdmNome">Nome</label>
        </div>
        <div className="inputAdmEmail">
          <input
            type="text"
            name="email"
            required
            value={values.email}
            onChange={OnChange}
          />
          <div className="underlineAdmEmail"></div>
          <label className="labelAdmEmail">Email</label>
        </div>
        <div className="inputAdmLogin">
          <input
            type="text"
            name="login"
            required
            value={values.login}
            onChange={OnChange}
          />
          <div className="underlineAdmLogin"></div>
          <label className="labelAdmLogin">Login </label>
        </div>

        <div className="inputAdmSenha">
          <input
            type="password"
            name="crpsenha"
            required
            value={values.crpsenha}
            onChange={OnChange}
          />
          <div className="underlineAdmSenha"></div>
          <label className="labelAdmSenha">Senha </label>
        </div>
        <div className="inputAdmSenhaConfirmar">
          <input
            type="password"
            name="crpsenhax"
            required
            value={values.crpsenhax}
            onChange={OnChange}
          />
          <div className="underlineAdmSenhaConfirmar"></div>
          <label className="labelAdmSenhaConfirmar">Confirmar Senha </label>
        </div>

        <button type="submit" className="btnAddAdm">
          Salvar
        </button>
        <button type="button" className="btnAddAdmLimpar" onClick={clearMan}>
          Limpar
        </button>
      </form>
    </div>
  );
};

export default AdminAdd;
