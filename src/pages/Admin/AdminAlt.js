import React, { useState, useEffect } from "react";

import "./adminalt.css";

import axios from "axios";

import Sidebar from "../../components/Sidebar/sidebar.jsx";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import Autocomplete from "@material-ui/lab/Autocomplete";

import "animate.css";
import { ContactlessTwoTone } from "@material-ui/icons";
import CircularProgress from "@material-ui/core/CircularProgress";

function initialState() {
  return {
    login: "",
    nome: "",
    email: "",
    crpsenha: "",
    login2: "",
    crpsenhax: "",
  };
}

const AdminAlt = () => {
  const [admins, setAdmins] = useState([]);
  const [once, setOnce] = useState(false);
  const [cbreset, setcbreset] = useState([]);
  useEffect(() => {
    const getAllAdmins = async () => {
      try {
        const response = await axios.get(
          "https://sistemaifrj.herokuapp.com/admins/"
        );
        setAdmins(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("error");
      }
    };
    getAllAdmins();

    document.getElementById("nomeAltAdm").disabled = true;
    document.getElementById("emailAltAdm").disabled = true;
    document.getElementById("loginAltAdm").disabled = true;
    document.getElementById("passwordAltAdm").disabled = true;
    document.getElementById("passwordConfirmedAltAdm").disabled = true;
  }, []);

  const optionsAdm = [];

  admins.map((result) => {
    optionsAdm.push(result.login);
  });

  const [values, setValues] = useState(initialState);

  function toFind(valor) {
    axios
      .get("https://sistemaifrj.herokuapp.com/admins/f/" + valor)
      .then((response) => {
        console.log(response);
        document.getElementById("nomeAltAdm").disabled = false;
        document.getElementById("emailAltAdm").disabled = false;
        document.getElementById("loginAltAdm").disabled = false;
        document.getElementById("passwordAltAdm").disabled = false;
        document.getElementById("passwordConfirmedAltAdm").disabled = false;
        OnFound({
          valueNome: response.data.nome,
          valueLogin: response.data.login,
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
  }

  function OnFound({ valueNome, valueLogin, valueEmail }) {
    setValues({
      ...values,
      ["nome"]: valueNome,
      ["login"]: valueLogin,
      ["email"]: valueEmail,
    });
  }

  function clearMan() {
    setValues(initialState);
    setValue(null);
    document.getElementById("nomeAltAdm").disabled = true;
    document.getElementById("emailAltAdm").disabled = true;
    document.getElementById("loginAltAdm").disabled = true;
    document.getElementById("passwordAltAdm").disabled = true;
    document.getElementById("passwordConfirmedAltAdm").disabled = true;
  }

  function onSubmit(event) {
    event.preventDefault();
    if (!document.getElementById("nomeAltAdm").disabled) {
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
            .put("https://sistemaifrj.herokuapp.com/admins/" + document.getElementById("login2AltAdm").value, {
              nome: values.nome,
              login: values.login,
              email: values.email,
              crpsenha: values.crpsenha,
            })
            .then((response) => {
              console.log(response);
              axios
                .get("https://sistemaifrj.herokuapp.com/admins")
                .then(async (response) => {
                  optionsAdm.length = 0;
                  response.data.map((result) => {
                    optionsAdm.push(result.login);
                  });
                  console.log(optionsAdm);
                  await setOnce(true);
                  setcbreset(optionsAdm);
                });
              store.addNotification({
                title: "Cadastro atualizado",
                message: "Adminstrador atualizado com sucesso!",
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
          "É preciso localizar um administrador antes de tentar atualizar. Tente novamente.",
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
    if (!document.getElementById("nomeAltAdm").disabled) {
      console.log(values);
      axios
        .delete(
          "https://sistemaifrj.herokuapp.com/admins/l/" +
            document.getElementById("login2AltAdm").value
        )
        .then((response) => {
          console.log(response);
          axios
            .get("https://sistemaifrj.herokuapp.com/admins")
            .then(async (response) => {
              optionsAdm.length = 0;
              response.data.map((result) => {
                optionsAdm.push(result.login);
              });
              console.log(optionsAdm);
              await setOnce(true);
              setcbreset(optionsAdm);
            });
          store.addNotification({
            title: "Exclusão realizada",
            message: "Adminstrador excluído com sucesso!",
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
          "É preciso localizar um adminstrador antes de tentar excluir. Tente novamente.",
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

    document.getElementById("login2AltAdm").disabled = false;
  }

  function OnChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  function OnChange2(valueLogin) {
    setValues({
      ...values,
      ["login2"]: valueLogin,
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
      marginLeft: "118.2ch",
      marginBottom: "-9.4ch",
      height: "7ch",
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
      width: "80ch",
      // height:"7ch",
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

  const [value, setValue] = React.useState("");

  return (
    <div>
      <ReactNotification />
      <div className="sidebarAdmAlt">
        <Sidebar />
      </div>
      <div className="titleAdmAlt">
        <h1>Alterar Adminstrador</h1>
      </div>

      <form onSubmit={onSubmit} className={classes.root}>
        {once == false && (
          <Autocomplete
            className={classes.login2}
            id="login2AltAdm"
            value={value}
            onChange={async (event, newValue) => {
              await setValue(newValue);
              await OnChange2(newValue);
              if (newValue == null) {
                clearMan();
              } else {
                toFind(newValue);
              }
            }}
            options={optionsAdm}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Login de Busca"
                variant="outlined"
              />
            )}
          />
        )}

        {once == true && (
          <Autocomplete
            className={classes.login2}
            id="login2AltAdm"
            value={value}
            onChange={async (event, newValue) => {
              await setValue(newValue);
              await OnChange2(newValue);
              if (newValue == null) {
                clearMan();
              } else {
                toFind(newValue);
              }
            }}
            options={cbreset}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Login de Busca"
                variant="outlined"
              />
            )}
          />
        )}

        <TextField
          id="nomeAltAdm"
          name="nome"
          value={values.nome}
          onChange={OnChange}
          label="Nome Completo"
          variant="outlined"
          className={classes.nome}
          onChange={OnChange}
        />
        <TextField
          id="emailAltAdm"
          label="E-mail"
          name="email"
          value={values.email}
          onChange={OnChange}
          className={classes.email}
          variant="outlined"
          onChange={OnChange}
        />
        <TextField
          id="loginAltAdm"
          name="login"
          value={values.login}
          onChange={OnChange}
          label="Login"
          variant="outlined"
          className={classes.login}
          onChange={OnChange}
        />

        <TextField
          id="passwordAltAdm"
          type="password"
          label="Senha"
          name="crpsenha"
          value={values.crpsenha}
          onChange={OnChange}
          className={classes.senha}
          variant="outlined"
          onChange={OnChange}
        />
        <TextField
          id="passwordConfirmedAltAdm"
          type="password"
          name="crpsenhax"
          value={values.crpsenhax}
          onChange={OnChange}
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

export default AdminAlt;
