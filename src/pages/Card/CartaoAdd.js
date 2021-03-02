import React, { useState } from "react";

//FAZER CSS VENDEDORADD

import axios from "axios";

import Sidebar from "../../components/Sidebar/sidebar.jsx";

import "../../styles/pages/cartaoadd.css";

function initialState() {
  return {
    matricula: "",
    nome: "",
    email: "",
    saldo: "",
  };
}

const CartaoAdd = () => {
  const [values, setValues] = useState(initialState);

  function onSubmit(event){
	event.preventDefault();
	axios
		.post('https://sistemaifrj.herokuapp.com/users/', values)
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
          <input
            type="number"
            name="saldo"
            placeholder="Saldo"
            value={values.saldo}
            onChange={OnChange}
          />
        </div>

        <button type="submit" className="btnAddCartao">
          Salvar
        </button>

        <button type="submit" className="btnAddCartaoLimpar">
          Limpar
        </button>
      </form>
    </div>
  );
};

export default CartaoAdd;
