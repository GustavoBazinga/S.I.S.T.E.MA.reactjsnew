import React, { useState, useEffect } from "react";

import "./productalt.css";

import axios from "axios";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";

import Sidebar from "../../components/Sidebar/sidebar.jsx";

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

function initialState() {
  return { estoque: "", nome: "", categoria: "", preco: "", nome2: "" };
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

const ProAlt = () => {
  const [values, setValues] = useState(initialState);

  useEffect(() =>{
    document.getElementById("nome2AltProduct").disabled = false;
    document.getElementById("nomeAltProduct").disabled = true;
    document.getElementById("categoriaAltProduct").disabled = true;
    document.getElementById("estoqueAltProduct").disabled = true;
    document.getElementById("precoAltProduct").disabled = true;
  }, [])

  function toFind(event) {
    event.preventDefault();

    console.log(values);
    if (values.nome2 !== "") {
      axios
        .get("https://sistemaifrj.herokuapp.com/produtos/f/" + values.nome2)
        .then((response) => {
          console.log(response);
          document.getElementById("nome2AltProduct").disabled = true;
          document.getElementById("nomeAltProduct").disabled = false;
          document.getElementById("categoriaAltProduct").disabled = false;
          document.getElementById("estoqueAltProduct").disabled = false;
          document.getElementById("precoAltProduct").disabled = false;
          OnFound({
            valueNome: response.data.nome,
            valueEstoque: response.data.estoque,
            valueCategoria: response.data.categoria,
            valuePreco: response.data.preco,
          });
          store.addNotification({
            title: "Localizado!",
            message: "Cartão localizado e dados exibidos!",
            type: "default",
            container: "top-right",
            insert: "top",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
              showIcon: true,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      store.addNotification({
        title: "Não foi possível localizar o produto!",
        message:
          "O campo de busca está vazio. Digite o produto desejado e tente novamente.",
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

  function OnFound({ valueNome, valueEstoque, valueCategoria, valuePreco }) {
    setValues({
      ...values,
      ["nome"]: valueNome,
      ["estoque"]: valueEstoque,
      ["categoria"]: valueCategoria,
      ["preco"]: valuePreco,
    });
    setCateg(valueCategoria);
  }

  function clearMan() {
    setValues(initialState);
    setCateg('')
    document.getElementById("nome2AltProduct").disabled = false;
    document.getElementById("nomeAltProduct").disabled = true;
    document.getElementById("categoriaAltProduct").disabled = true;
    document.getElementById("estoqueAltProduct").disabled = true;
    document.getElementById("precoAltProduct").disabled = true;
  }

  function onSubmit(event) {
    event.preventDefault();
    if (document.getElementById("nome2AltProduct").disabled) {
      axios
        .put("https://sistemaifrj.herokuapp.com/produtos/" + values.nome2, {
          nome: values.nome,
          estoque: values.estoque,
          categoria: values.categoria,
          preco: values.preco,
        })
        .then((response) => {
          console.log(response);
		  store.addNotification({
            title: "Cadastro atualizado",
            message: "Produto atualizado com sucesso!",
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
    }else{
		store.addNotification({
			title: "Atualização bloqueada!",
			message:
			  "É preciso localizar um produto antes de tentar atualizar. Tente novamente.",
			type: "danger",
			container: "top-right",
			insert: "top",
			animationIn: ["animate__animated", "animate__flash"],
			animationOut: ["animate__animated", "animate__fadeOut"],
			dismiss: {
			  duration: 3000,
			  showIcon: true,
			},
		  });
	}
  }

  function onDelete(event) {
    event.preventDefault();
    if (document.getElementById("nome2AltProduct").disabled) {
      axios
        .delete("https://sistemaifrj.herokuapp.com/produtos/" + values.nome2)
        .then((response) => {
          console.log(response);
          store.addNotification({
            title: "Exclusão realizada",
            message: "Produto excluído com sucesso!",
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
    } else {
      store.addNotification({
        title: "Exclusão bloqueada!",
        message:
          "É preciso localizar um produto antes de tentar excluir. Tente novamente.",
        type: "danger",
        container: "top-right",
        insert: "top",
        animationIn: ["animate__animated", "animate__flash"],
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
  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "10ch",

      "& > *": {
        width: "80ch",
        marginLeft: "35ch",
      },
      "& div.buttonGeral": {
        paddingLeft: "40ch",
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
    btnLocalizar: {
      width: "16.8ch",
      marginLeft: "1ch",
      height: '7ch',
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

    estoque: {
      width: "38ch",
      marginLeft: "4ch",
      marginTop: "2ch",
    },
    preco: {
      width: "38ch",
      marginTop: "2ch",
    },
    saldo:{
      marginTop:'2ch',
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
      <div className="sidebarProAlt">
        <Sidebar />
      </div>
      <div className="titleProAlt">
        <h1>Alterar Produto</h1>
      </div>

      <form onSubmit={onSubmit} className={classes.root}>
        <TextField
          id="nome2AltProduct"
          name="nome2"
          value={values.nome2}
          onChange={OnChange}
          label="Nome do produto para busca"
          variant="outlined"
          className={classes.nome2}
        />

        <Button
          variant="contained"
          onClick={toFind}
          className={classes.btnLocalizar}
        >
          Localizar
        </Button>

        
        <TextField
          id="nomeAltProduct"
          name="nome"
          value={values.nome}
          onChange={OnChange}
          label="Nome do Produto"
          variant="outlined"
          className={classes.nome}
          onChange={OnChange}
        />
        <TextField
          variant="outlined"
          label="Preço"
          value={values.preco}
          className={classes.preco}
          onChange={OnChange}
          name="preco"
          id="precoAltProduct"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
        />


        <TextField
          id="estoqueAltProduct"
          type="number"
          label="Estoque"
          name= "estoque"
          value = {values.estoque}
          onChange={OnChange}
          className={classes.estoque}
          variant="outlined"
        />
        <FormControl variant="filled" className={classes.formControl}>
          
            <InputLabel id="demo-simple-select-filled-label">Categoria</InputLabel>
            <Select
              
              labelId="demo-simple-select-filled-label"
              id="categoriaAltProduct"
              value={categ}
              onChange={handleChange}
            >
              <MenuItem value="Doce">Doce</MenuItem>
              <MenuItem value="Salgado">Salgado</MenuItem>
              
            </Select>
          </FormControl>

          <div className="buttonGeral">
          <Button
            variant="contained"
            onClick={clearMan}
            className={classes.buttonLimpar}
          >
            Limpar
          </Button>

          <Button
            type="button"
            variant="contained"
            color="primary"
            className={classes.buttonDeletar}
            onClick={onDelete}
          >
            Excluir
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonSalvar}
          >
            Salvar
          </Button>
        </div>

        

        
      </form>
      <form onSubmit={onDelete} className="form_altProduct">
        <button type="submit" className="btnExcProduct">
          Excluir
        </button>
      </form>
      <form onSubmit={toFind} className="form_altProduct">
        <button type="submit" className="btnFindProduct">
          Localizar
        </button>
      </form>
    </div>
  );
};

export default ProAlt;
