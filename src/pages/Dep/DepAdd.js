import React, { useState } from "react";
//import { useContext } from 'react'

//import StoreContext from "../../components/Store/Context";

import "./depadd.css";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "animate.css"

import axios from "axios";

import Sidebar from "../../components/Sidebar/sidebar.jsx";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

function initialState() {
  return { nome: "", categoria: "" };
}

const DepAdd = () => {
  const [values, setValues] = useState(initialState);
  function clearMan(){
		setValues(initialState);
    setCateg('')
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

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "10ch",

      "& > *": {
        width: "80ch",
        marginLeft: "35ch",
        marginTop: "2ch",
      },

      "& div.buttonGeral": {
        paddingLeft: "54.45ch",
        //marginTop: "-5ch",
      },
      "& button.btnLimpar": {
        width: "12ch",
        fontSize: "2.5ch",
      },
      "& button.btnSalvar": {
        width: "12ch",
        fontSize: "2.5ch",
      },
      "& label.Mui-focused": {
        color: "gray",
      },

      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "gray",
        },  
      },
      "& .MuiFilledInput-underline:after":{
        borderColor: "gray",
      },
    },

    

    buttonSalvar: {
      "&:hover": {
        backgroundColor: "green",
      },
      backgroundColor: "gray",
      width: "18ch",
      marginLeft: "1ch",
    },
    buttonLimpar: {
      backgroundColor: "white",
    },

    login: {
      width: "38ch",
      marginLeft: "4ch",
    },
    senha: {
      width: "38ch",
    },
    senhaConfirmar: {
      width: "38ch",
      marginLeft: "4ch",
    },
    formControl: {
      minWidth: 120,
      marginTop:'2ch',
      
    },
  }));

  const [categ, setCateg] = React.useState('');

  const handleChange = (event) => {
    setCateg(event.target.value);
    values.categoria= event.target.value
    if(values.categoria != ""){
      console.log(values.categoria)
    }else{
      console.log("Não leu ainda")
    }
    
  };

  const classes = useStyles();

  return (
    <div>
      <ReactNotification />
      <div className="sidebarAddDep">
        <Sidebar />
      </div>
      <div className="titleDepAdd">
        <h1>Cadastrar Departamento</h1>
      </div>
      <form onSubmit={onSubmit} className={classes.root} name="FormAdmAdd">
        
        <TextField
          id="outlined-basic"
          name= "nome"
          value = {values.nome}
          onChange={OnChange}
          label="Nome do Departamento"
          variant="outlined"
        />
        
        {/* <TextField
          id="outlined-basic"
          label="Categoria"
          name= "categoria"
          value = {values.categoria}
          onChange={OnChange}
          
          variant="outlined"
        /> */}
        <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="demo-simple-select-filled-label">Categoria</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={categ}
              onChange={handleChange}
            >
              <MenuItem value="Doce">Doce</MenuItem>
              <MenuItem value="Salgado">Salgado</MenuItem>
              
            </Select>
          </FormControl>
        <div className="buttonGeral">
          {/* <button type="button" className="btnLimpar">Limpar</button> */}
          {/* <button type="button" className="btnSalvar">Salvar</button> */}
          <Button variant="contained" onClick={clearMan} className={classes.buttonLimpar}>
            Limpar
          </Button>
          <Button
          type= "submit"
            variant="contained"
            color="primary"
            className={classes.buttonSalvar}
          >
            Salvar
          </Button>
          </div>
      </form>
    </div>
  );
};

export default DepAdd;
