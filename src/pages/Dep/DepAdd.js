import React, { useState } from "react";
//import { useContext } from 'react'

//import StoreContext from "../../components/Store/Context";

import "../../styles/pages/adminadd.css";

import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar.jsx";

function initialState() {
  return { nome: "", categoria: "" };
}

const DepAdd = () => {
  const [values, setValues] = useState(initialState);
  //const { token } = useContext(StoreContext);
  function onSubmit(event) {
    event.preventDefault();
    if (values.crpsenha !== values.crpsenhax) {
      alert("Digita uma senha igual o nóia");
    } else {
      axios
        .post("https://sistemaifrj.herokuapp.com/departamento/", values)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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
        <button type="submit" className="btnAddAdmLimpar">
          Limpar
        </button>
      </form>
    </div>
  );
};

export default DepAdd;
