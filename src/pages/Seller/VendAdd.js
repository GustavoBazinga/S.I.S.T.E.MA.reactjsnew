import React, { useState, useEffect } from "react";

//FAZER CSS VENDEDORADD

import axios from "axios";

import "./vendadd.css";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";

import Sidebar from "../../components/Sidebar/sidebar.jsx";


import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Popper from '@material-ui/core/Popper';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
function initialState() {
  return {adminnames:"", matricula: "", nome: "", email: "", crpsenha: "", crpsenhax: "" };
}


const VenAdd = () => {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const response = await axios.get("https://sistemaifrj.herokuapp.com/departamento/");
        setAdmins(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("error");
      }
    };
    getAllAdmins();
  }, []);
  

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
        marginTop:'1ch',
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
    },

    email: {
      width: "38ch",
    },

    paper: {
      border: '1px solid',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      width:'13ch',
      borderRadius:'1ch',
      
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

    matricula: {
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
    interruptor:{
      width: "6.5ch",
      marginLeft:'1ch',
      marginTop:'0ch',
    },
    acesso:{
      marginLeft:'102.5ch',
      color:'#353839',
      
      
    },
  }));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const classes = useStyles();


  const [categ, setCateg] = React.useState('');

  const handleChange = (event) => {
    setCateg(event.target.value); 
  };

  return (
    <div>
      <ReactNotification />
      <div className="sidebarAddSeller">
        <Sidebar />
      </div>
      <div className="titleSellerAdd">
        <h1>Cadastrar Vendedor</h1>
      </div>

      <form onSubmit={onSubmit} className={classes.root}>
        
        <TextField
          id="outlined-basic"
          name= "nome"
          value = {values.nome}
          onChange={OnChange}
          label="Nome Completo"
          variant="outlined"
        />
        
        <TextField
          id="outlined-basic"
          label="E-mail"
          name= "email"
          value = {values.email}
          onChange={OnChange}
          className={classes.email}
          variant="outlined"
        />
        

        <TextField
          id="outlined-basic"
          label="Matrícula"
          name= "matricula"
          value = {values.matricula}
          onChange={OnChange}
          className={classes.matricula}
          variant="outlined"
        />

        <TextField
          id="outlined-basic"
          type= "password"
          label="Senha"
          name= "crpsenha"
          value = {values.crpsenha}
          onChange={OnChange}
          className={classes.senha}
          variant="outlined"
        />
        
        <TextField
          id="outlined-basic"
          type= "password"
          name= "crpsenhax"
          value = {values.crpsenhax}
          onChange={OnChange}
          label="Confirmar Senha"
          className={classes.senhaConfirmar}
          variant="outlined"
        />
        <FormControl variant="filled" className={classes.formControl} >
            <InputLabel id="demo-simple-select-filled-label">Departamento</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={categ}
              onChange={handleChange}
            >
              {admins.map(result=> 
            <MenuItem className="option" value={result.nome}>{result.nome}</MenuItem>
              )}
            
            </Select>
          </FormControl>
        <label className={classes.acesso} >Acesso</label>
        
        <Switch className={classes.interruptor} color="primary"inputProps={{ 'aria-label': 'primary checkbox' }} />

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

export default VenAdd;