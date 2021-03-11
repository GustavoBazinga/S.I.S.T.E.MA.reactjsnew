import React, { useEffect, useState } from "react";

import "../Admin/adminalt.css";

import axios from "axios";

import Sidebar from "../../components/Sidebar/sidebar.jsx";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import "animate.css";
import FormControl from '@material-ui/core/FormControl';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

function initialState() {
  return {
    nome: "",
    categoria: "",
    nome2: "",
  };
}

const AdminAlt = () => {
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    document.getElementById("nomeAltDep").disabled = true;
    document.getElementById("categoriaAltDep").disabled = true;
    document.getElementById("nome2AltDep").disabled = false;
  }, [])

  function toFind(event) {
    event.preventDefault();

    console.log(values);
    if (values.nome2 !== "") {
      axios
        .get("https://sistemaifrj.herokuapp.com/departamento/" + values.nome2)
        .then((response) => {
          console.log(response);
          document.getElementById("nomeAltDep").disabled = false;
          document.getElementById("categoriaAltDep").disabled = false;
          document.getElementById("nome2AltDep").disabled = true;
          OnFound({
            valueNome: response.data.nome,
            valueCategoria: response.data.categoria,
            
            
          });
          store.addNotification({
            title: "Localizado!",
            message: "Departamento localizado e dados exibidos!",
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
        title: "Não foi possível localizar o departamento!",
        message:
          "O campo de busca está vazio. Digite o nome do departamento desejado e tente novamente.",
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

  function OnFound({ valueNome, valueCategoria}) {
    setValues({
      ...values,
      ["nome"]: valueNome,
      ["categoria"]: valueCategoria,
    });
    setCateg(valueCategoria);
  }

  function clearMan() {
    setValues(initialState);
    setCateg('')
    document.getElementById("nome2AltDep").disabled = false;
    document.getElementById("nomeAltDep").disabled = true;
    document.getElementById("categoriaAltDep").disabled = true;

  }

  function onSubmit(event) {
    event.preventDefault();
    if (document.getElementById("nome2AltDep").disabled) {
      if (
        values.nome !== "" &&
        values.categoria !== ""
      ) {
          axios
            .put("https://sistemaifrj.herokuapp.com/departamento/" + values.nome2, values)
            .then((response) => {
              console.log(response);
              store.addNotification({
                title: "Cadastro atualizado",
                message: "Departamento atualizado com sucesso!",
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
    } else {
      store.addNotification({
        title: "Atualização bloqueada!",
        message:
          "É preciso localizar um departamento antes de tentar atualizar. Tente novamente.",
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

  async function onDelete(event) {
    event.preventDefault();
    console.log("ASDASDASD");
    
    if (document.getElementById("nome2AltDep").disabled) {
      axios
        .delete("https://sistemaifrj.herokuapp.com/departamento/" + values.nome2)
        .then((response) => {
          console.log(response);
          store.addNotification({
            title: "Exclusão realizada",
            message: "Departamento excluído com sucesso!",
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
          "É preciso localizar um departamento antes de tentar excluir. Tente novamente.",
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
    btnAdmLocalizar: {
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

    login: {
      width: "38ch",
      marginLeft: "4ch",
      marginTop: "2ch",
    },
    categoria: {
      width: "80ch",
      marginTop: "2ch",
    },
    senha: {
      width: "38ch",
      marginTop: "2ch",
    },
    senhaConfirmar: {
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
      <div className="sidebarAdmAlt">
        <Sidebar />
      </div>
      <div className="titleAdmAlt">
        <h1>Alterar Departamento</h1>
      </div>
      <form onSubmit={onSubmit} className={classes.root}>
        <TextField
          id="nome2AltDep"
          name="nome2"
          value={values.nome2}
          onChange={OnChange}
          label="Nome do Departamento para busca"
          variant="outlined"
          className={classes.nome2}
        />
        <Button
          variant="contained"
          onClick={toFind}
          className={classes.btnAdmLocalizar}
        >
          Localizar
        </Button>
        <TextField
          id="nomeAltDep"
          name="nome"
          value={values.nome}
          label="Nome do Departamento"
          variant="outlined"
          className={classes.nome}
          onChange={OnChange}
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
    </div>
  );
};

export default AdminAlt;
