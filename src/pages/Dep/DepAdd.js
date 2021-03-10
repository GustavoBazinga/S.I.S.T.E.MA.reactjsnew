import React, { useState } from "react";
//import { useContext } from 'react'

//import StoreContext from "../../components/Store/Context";

import "../Admin/adminadd.css";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "animate.css"

import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar.jsx";

function initialState() {
  return { nome: "", categoria: "" };
}

const DepAdd = () => {
  const [values, setValues] = useState(initialState);
  function clearMan(){
		setValues(initialState);
	}
  //const { token } = useContext(StoreContext);
  function onSubmit(event) {
    event.preventDefault();
    if(values.nome !== "" && values.categoria !== ""){
      axios
      .post("https://sistemaifrj.herokuapp.com/departamento/", values)
      .then((response) => {
        console.log(response);
        store.addNotification({
          title: "Cadastro realizado",
          message: "Departamento cadastrado com sucesso!",
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
      })
      .catch((error) => {
        console.log(error);
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
      <form onSubmit={onSubmit} className="form_addAdmin" name="FormAdmAdd">
        <div className="inputAdmNome">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={values.nome}
            onChange={OnChange}
          />
        </div>
        <div className="inputAdmEmail">
          <input
            type="text"
            name="categoria"
            placeholder="Categoria"
            value={values.categoria}
            onChange={OnChange}
          />
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

export default DepAdd;
