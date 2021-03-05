import React, { useState } from "react";

import "./productadd.css";

import axios from "axios";

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
	axios
		.post('https://sistemaifrj.herokuapp.com/produtos/', values)
		.then(response => {
			console.log(response)
		})
		.catch(error => {
			console.log(error)
		})

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
            type="text"
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
            type="text"
            name="preco"
            placeholder="Preço"
            value={values.preco}
            onChange={OnChange}
          />
        </div>
        <button type="submit" className="btnAddProduct">
          Salvar
        </button>
        <button type="button" className="btnAddAdmLimpar" onClick={clearMan}>
          Limpar
        </button>
      </form>
    </div>
  );
};

export default ProAdd;
