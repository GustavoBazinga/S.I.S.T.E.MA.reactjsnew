import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import StoreContext from "components/Store/Context";
import logoLogin from "../../images/logoteste.svg";
import { FaUserCircle } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import logoAnimated from "../../images/LogoGIF.gif";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Minimize from "@material-ui/icons/Minimize";
import CropSquare from "@material-ui/icons/CropSquare";
import FilterNone from "@material-ui/icons/FilterNone";
import axios from "axios";
import "./Login.css";

const useStyles = makeStyles((theme) => ({
  Barr: {
    WebkitAppRegion: "drag",
    flexGrow: 1,
    backgroundColor: "#303030",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

//Função InitialState para iniciar os campos como vazios.
function initialState() {
  return { login: "", senha: "" };
}

//Função login executa o login em contato com a API.
async function login({ login, senha }) {
  var sucess = false;
  var localToken, localLogin, localId;

  //Conecta com a API via Axios no metodo POST passando o corpo JSON.
  await axios
    .post("https://sistemaifrj.herokuapp.com/systemlogin", {
      login: login,
      senha: senha,
    })

    //Se login Bem Sucedido, sucess e localToken são atribuidos.
    .then((response) => {
      console.log(response);
      console.log(response.data.token);
      sucess = true;
      localId = response.data.id;
      localToken = response.data.token;
      localLogin = response.data.admin.login;
    })

    //Se login Mal Sucedido, mensagem de erro no console.
    //PS: Fazer tratamento de erro.
    .catch((error) => {
      console.log(error);
    });

  //Se sucess = true, retorna o token de localToken.
  if (sucess) {
    console.log(localLogin + " SIM");
    return {
      idC: localId,
      loginC: localLogin,
      token: localToken,
    };
  }

  //Se sucess = false, retorna erro.
  else {
    return { error: "Algo errado" };
  }
}

//Página
const UserLogin = () => {
  const [values, setValues] = useState(initialState); //Valores dos campos.
  const [error, setError] = useState(null); //Erro retornado.
  const { setToken, setLoginC, setIdC } = useContext(StoreContext); //Função para estabelecer Token Global com Context.
  const history = useHistory(); //Paginação.
  const classes = useStyles();

  //Função onChange atualiza dados dos campos.
  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  //Função onSubmit inicia processo de Login e salva token global.
  async function onSubmit(event) {
    event.preventDefault();

    //Chama login e espera receber token ou error.
    const { token, loginC, idC, error } = await login(values);

    //Se receber token, salva token global e redireciona para Home do App.
    if (token) {
      console.log(loginC + " SIM2");
      setToken(token); //Salva token global.
      setLoginC(loginC);
      setIdC(idC);
      return history.push("/"); //Redireciona para Home.
    }

    //Se receber error, salva error e reinicia campos.
    setError(error);
    setValues(initialState);
  }

  //Página HTML
  return (
      <div id="page-login">
        <div className="logo">
          <img src={logoAnimated} width="500px" alt="" />
        </div>
        <div className="coluna">
          <h1>S.I.S.T.E.MA</h1>
          <div className="circleIconLogin">
            <div className="iconLogin">
              <FaUserCircle size={88} />
            </div>
          </div>
          <div className="square">
            <form onSubmit={onSubmit} className="form_addAdmin">
              <div className="input-login input-data">
                <label>Login</label>
                <input
                  id="login"
                  type="text"
                  name="login"
                  onChange={onChange}
                  value={values.user}
                />
              </div>
              <div className="input-password ">
                <label>Senha</label>
                <input
                  id="senha"
                  type="password"
                  name="senha"
                  onChange={onChange}
                  value={values.password}
                />
              </div>
              {error && <div className="user-login__error">{error}</div>}
              <div className="enter-app">
                <IoIosArrowForward
                  size="33px"
                  color="white"
                  onClick={onSubmit}
                />
              </div>
            </form>
            <a href="/" className="forget-password">
              Esqueceu a senha?
            </a>
          </div>
          <div className="help">
            <BiHelpCircle size="30px" color="white" />
          </div>
        </div>
      </div>

  );
};

export default UserLogin;
