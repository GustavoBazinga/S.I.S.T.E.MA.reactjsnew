import React, { useState, useEffect } from "react";

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

function initialState() {
  return {
    matricula: "",
    nome: "",
    email: "",
    crpsenha: "",
    matricula2: "",
    crpsenhax: "",
  };
}

const VenAlt = () => {
  const [values, setValues] = useState(initialState);

  useEffect(() => {
    document.getElementById("matricula2AltVen").disabled = false;
          document.getElementById("nomeAltVen").disabled = true;
          document.getElementById("emailAltVen").disabled = true;
          document.getElementById("matriculaAltVen").disabled = true;
          document.getElementById("passwordAltVen").disabled = true;
          document.getElementById("passwordConfirmedAltVen").disabled = true;
  })

  function toFind(event) {
    event.preventDefault();

    console.log(values);
    if (values.matricula2 !== "") {
      axios
        .get("https://sistemaifrj.herokuapp.com/vendedores/f/" + values.matricula2)
        .then((response) => {
          console.log(response);
          document.getElementById("matricula2AltVen").disabled = true;
          document.getElementById("nomeAltVen").disabled = false;
          document.getElementById("emailAltVen").disabled = false;
          document.getElementById("matriculaAltVen").disabled = false;
          document.getElementById("passwordAltVen").disabled = false;
          document.getElementById("passwordConfirmedAltVen").disabled = false;
          OnFound({
            valueNome: response.data.nome,
            valueMatricula: response.data.matricula,
            valueEmail: response.data.email,
          });
          store.addNotification({
            title: "Localizado!",
            message: "Administrador localizado e dados exibidos!",
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
        title: "Não foi possível localizar o vendedor!",
        message:
          "O campo de busca está vazio. Digite o Login do Administrador desejado e tente novamente.",
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

  function OnFound({ valueNome, valueMatricula, valueEmail }) {
    setValues({
      ...values,
      ["nome"]: valueNome,
      ["matricula"]: valueMatricula,
      ["email"]: valueEmail,
    });
  }

  function clearMan() {
    setValues(initialState);
    document.getElementById("matricula2AltVen").disabled = false;
    document.getElementById("nomeAltVen").disabled = true;
    document.getElementById("emailAltVen").disabled = true;
    document.getElementById("matriculaAltVen").disabled = true;
    document.getElementById("passwordAltVen").disabled = true;
    document.getElementById("passwordConfirmedAltVen").disabled = true;
  }

  function onSubmit(event) {
    event.preventDefault();
    if (document.getElementById("matricula2AltVen").disabled) {
      if (
        values.nome !== "" &&
        values.login !== "" &&
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
          axios
            .put("https://sistemaifrj.herokuapp.com/vendedores/" + values.matricula2, {
              nome: values.nome,
              matricula: values.matricula,
              email: values.email,
              crpsenha: values.crpsenha,
            })
            .then((response) => {
              console.log(response);
              store.addNotification({
                title: "Cadastro atualizado",
                message: "Vendedor atualizado com sucesso!",
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
          "É preciso localizar um vendedor antes de tentar atualizar. Tente novamente.",
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
    if (document.getElementById("matricula2AltVen").disabled) {
      axios
        .delete("https://sistemaifrj.herokuapp.com/vendedores/m/" + values.matricula2)
        .then((response) => {
          console.log(response);
          store.addNotification({
            title: "Exclusão realizada",
            message: "Vendedor excluído com sucesso!",
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
          "É preciso localizar um vendedor antes de tentar excluir. Tente novamente.",
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

    login2: {
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
    email: {
      width: "38ch",
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
  }));
  const classes = useStyles();
  return (
    <div>
      <ReactNotification />
      <div className="sidebarAdmAlt">
        <Sidebar />
      </div>
      <div className="titleAdmAlt">
        <h1>Alterar Vendedor (Atulizar não funcionando. Erick nóia)</h1>
      </div>
      <form onSubmit={onSubmit} className={classes.root}>
        <TextField
          id="matricula2AltVen"
          name="matricula2"
          value={values.matricula2}
          onChange={OnChange}
          label="Matrícula de busca"
          variant="outlined"
          className={classes.login2}
        />

        <Button
          variant="contained"
          onClick={toFind}
          className={classes.btnLocalizar}
        >
          Localizar
        </Button>
        <TextField
          
          id="nomeAltVen"
          name="nome"
          value={values.nome}
          onChange={OnChange}
          label="Nome Completo"
          variant="outlined"
          className={classes.nome}
          onChange={OnChange}
        />
        <TextField
    
          id="emailAltVen"
          label="E-mail"
          name="email"
          value={values.email}
          onChange={OnChange}
          className={classes.email}
          variant="outlined"
          onChange={OnChange}
        />
        <TextField

          id="matriculaAltVen"
          name="matricula"
          value={values.matricula}
          onChange={OnChange}
          label="Matrícula"
          variant="outlined"
          className={classes.login}
        />

        <TextField

          id="passwordAltVen"
          type="password"
          label="Senha"
          name="crpsenha"
          value={values.crpsenha}
          onChange={OnChange}
          className={classes.senha}
          variant="outlined"
        />
        <TextField
          id="passwordConfirmedAltVen"
          type="password"
          name="crpsenhax"
          value={values.crpsenhax}

          label="Confirmar Senha"
          className={classes.senhaConfirmar}
          variant="outlined"
          onChange={OnChange}
        />
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

export default VenAlt;
