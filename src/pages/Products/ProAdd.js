import React, { useState } from "react";

import "./productadd.css";

import axios from "axios";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "animate.css"

import Sidebar from "../../components/Sidebar/Sidebar.jsx";

function initialState() {
  return {
    nome: "",
    preco: "",
    estoque: "",
    categoria: "",
  };
}

const ProAdd = () => {
  const [values, setValues] = useState(initialState);
  function clearMan(){
		setValues(initialState);
	}

function onSubmit(event){
	event.preventDefault();
  console.log("")
  if (values.nome !== "" && values.estoque !== "" && values.preco !== "" && values.categoria !== ""){
    axios
		.post('https://sistemaifrj.herokuapp.com/produtos/', values)
		.then(response => {
      console.log(response)
      store.addNotification({
        title: "Cadastro realizado",
        message: "Produto cadastrado com sucesso!",
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
		.catch(error => {
      console.log(error)
		})
    
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

      <form onSubmit={onSubmit} className="form_addProduct">
        <div className="inputProductNome">
          <input
            type="text"
            name="nome"
            placeholder="Nome do Produto"
            value={values.nome}
            onChange={OnChange}
          />
        </div>
        <div className="inputProductEstoque">
          <input
            type="number"
            name="estoque"
            placeholder="Estoque"
            value={values.estoque}
            onChange={OnChange}
          />
        </div>
        <div className="inputProductCategoria">
          <input
            type="text"
            name="categoria"
            placeholder="Categoria"
            value={values.categoria}
            onChange={OnChange}
          />
        </div>
        <div className="inputProductPreco">
          <input
            type="number"
            name="preco"
            placeholder="Preço"
            value={values.preco}
            onChange={OnChange}
          />
        </div>
        <button type="submit" className="btnAddProduct">
          Salvar
        </button>
        <button type="button" className="btnAddProductLimpar" onClick={clearMan}>
          Limpar
        </button>
      </form>
    </div>
  );
};

export default ProAdd;
