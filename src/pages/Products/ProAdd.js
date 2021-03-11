import React, { useState } from "react";

import "./productadd.css";

import axios from "axios";

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "animate.css"
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';
import Sidebar from "../../components/Sidebar/sidebar.jsx";

function initialState() {
  return {
    nome: "",
    preco: "",
    estoque: "",
    categoria: "",
  };
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      fixedDecimalScale={true}
      decimalScale={2}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      prefix="R$"
    />
  );
}

const ProAdd = () => {
  const [values, setValues] = useState(initialState);
  function clearMan(){
		setValues(initialState);
    setCateg('')
	}

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

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

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "10ch",

      "& > *": {
        width: "80ch",
        marginLeft: "35ch",
      },
      "& div.buttonGeral": {
        paddingLeft: "54.45ch",
        //marginTop: "-5ch",
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
    btnAdmLocalizar: {
      width: "16.8ch",
      marginLeft: "1ch",
      marginTop: "2.4ch",
    },
    buttonSalvar: {
      "&:hover": {
        backgroundColor: "green",
      },
      backgroundColor: "#707070",
      width: "18ch",
      marginLeft: "1ch",
      marginTop: "2ch",
    },
    buttonDeletar: {
      "&:hover": {
        backgroundColor: "red",
      },
      backgroundColor: "gray",
      width: "16ch",
      marginLeft: "1ch",
      marginTop: "2ch",
    },
    buttonLimpar: {
      backgroundColor: "white",
      marginTop: "2ch",
    },

    nome2: {
      width: "64.7ch",
    },

    nome: {
      "&:disabled": {
        color: "white",
      },
      width: "80ch",
      marginTop: "2ch",
    },

    login: {
      width: "38ch",
      marginLeft: "4ch",
      marginTop: "2ch",
    },
    categoria: {
      width: "80ch",
      marginTop: "2ch",
    },
    estoque: {
      width: "38ch",
      marginTop: "2ch",
    },
    preco: {
      width: "38ch",
      marginLeft: "4ch",
      marginTop: "2ch",
    },
    formControl:{
      marginTop:'2ch',
    }
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
       <div className="sidebarProAdd">
        <Sidebar />
      </div>
      <div className="titleProAdd">
        <h1>Adicionar produto</h1>
      </div>

      <form onSubmit={onSubmit} className={classes.root}>
        
        <TextField
          id="outlined-basic"
          name= "nome"
          value = {values.nome}
          onChange={OnChange}
          label="Nome do Produto"
          variant="outlined"
        />
        
        <TextField
          id="outlined-basic"
          type="number"
          label="Estoque"
          name= "estoque"
          value = {values.estoque}
          onChange={OnChange}
          className={classes.estoque}
          variant="outlined"
        />
        <TextField
          variant="outlined"
          label="Preço"
          value={values.preco}
          className={classes.preco}
          onChange={OnChange}
          name="preco"
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />
        
        <FormControl variant="filled" className={classes.formControl}>
          
            <InputLabel id="demo-simple-select-filled-label">Categoria</InputLabel>
            <Select
              
              labelId="demo-simple-select-filled-label"
              id="categoriaAltDep"
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

export default ProAdd;
