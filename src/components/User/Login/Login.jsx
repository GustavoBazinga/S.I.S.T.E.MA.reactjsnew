import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from 'components/Store/Context';
import logoLogin from '../../../images/logoteste.svg';
import { FaUserCircle } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';

import axios from 'axios'
import './Login.css';

//Função InitialState para iniciar os campos como vazios.
function initialState() {
  return { login: '', senha: '' };
}

//Função login executa o login em contato com a API.
async function login({ login, senha }) {
  var sucess = false
  var localToken

  //Conecta com a API via Axios no metodo POST passando o corpo JSON.
  await axios
        .post('https://sistemaifrj.herokuapp.com/systemlogin',{
          login: login,
          senha: senha
        }
        )

        //Se login Bem Sucedido, sucess e localToken são atribuidos.
        .then(response => {      
          console.log(response)
          console.log(response.data.token)
          sucess = true
          localToken = response.data.token
        })

        //Se login Mal Sucedido, mensagem de erro no console.
        //PS: Fazer tratamento de erro.
        .catch(error => {
          console.log(error)
        })

        //Se sucess = true, retorna o token de localToken.
        if (sucess){
          return { token: localToken}
        }

        //Se sucess = false, retorna erro.
        else{
          return { error: 'Algo errado'}
        }
}


//Página
const UserLogin = () => {
  const [values, setValues] = useState(initialState); //Valores dos campos.
  const [error, setError] = useState(null); //Erro retornado.
  const { setToken } = useContext(StoreContext); //Função para estabelecer Token Global com Context.
  const history = useHistory(); //Paginação.

  //Função onChange atualiza dados dos campos.
  function onChange(event) {
    const { value, name } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  //Função onSubmit inicia processo de Login e salva token global.
  async function onSubmit(event) {
    event.preventDefault();

    //Chama login e espera receber token ou error.
    const { token, error } = await login(values);

    //Se receber token, salva token global e redireciona para Home do App.
    if (token) {
      setToken(token); //Salva token global.
      return history.push('/');//Redireciona para Home.
    }

    //Se receber error, salva error e reinicia campos.
    setError(error);
    setValues(initialState);
  }

  //Página HTML
  return (
    <div id="page-login">
      <div className="logo">
        <img src={logoLogin}  alt=""/>
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
              <div className="input-login">
                <label htmlFor="login">Login</label>
                <input
                  id="login"
                  type="text"
                  name="login"
                  onChange={onChange}
                  value={values.user}
                />
              </div>
              <div className="input-password">
                <label htmlFor="senha">Senha</label>
                <input
                  id="senha"
                  type="password"
                  name="senha"
                  onChange={onChange}
                  value={values.password}
                />
              </div>
              {error && (
                <div className="user-login__error">{error}</div>
              )}
              <div className="enter-app" >
                <IoIosArrowForward size="33px" color="white" onClick={onSubmit} />
              </div>
              
            </form>
            <a href="/" className="forget-password">Esqueceu a senha?</a>
          </div> 
          <div className="help">
            <BiHelpCircle size="30px" color="white" />
          </div> 
      </div>
    </div>
  );
};

export default UserLogin;

