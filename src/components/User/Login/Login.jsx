import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from 'components/Store/Context';
import logoLogin from '../../../images/logoteste.svg';
import { FaUserCircle } from 'react-icons/fa';
import { BiHelpCircle } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';

import axios from 'axios'
import './Login.css';

function initialState() {
  return { login: '', senha: '' };
}

async function login({ login, senha }) {
  var sucess = false
  var localToken
  await axios
        .post('https://sistemaifrj.herokuapp.com/systemlogin',{
          login: login,
          senha: senha
        }
        )
        .then(response => {      
          console.log(response)
          console.log(response.data.token)
          sucess = true
          localToken = response.data.token
        })
        .catch(error => {
          console.log(error)
        })
        if (sucess){
          return { token: localToken}
        }
        else{
          return { error: 'Algo errado'}
        }
}

const UserLogin = () => {
  const [values, setValues] = useState(initialState);
  const [error, setError] = useState(null);
  const { setToken } = useContext(StoreContext);
  const history = useHistory();

  function onChange(event) {
    const { value, name } = event.target;

    setValues({
      ...values,
      [name]: value
    });
  }

  async function onSubmit(event) {
    event.preventDefault();

    const { token, error } = await login(values);

    if (token) {
      setToken(token);
      return history.push('/');
    }

    setError(error);
    setValues(initialState);
  }

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

