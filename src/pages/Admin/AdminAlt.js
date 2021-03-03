import React, { useState } from 'react';

import '../../styles/pages/adminalt.css';

import axios from 'axios'

import Sidebar from '../../components/Sidebar/Sidebar.jsx';

function initialState() {
	return { login: '',
	 		nome: '',
	 		email: '',
			crpsenha: '',
 			login2: '',	 		
			crpsenhax:'' }
  }

const AdminAlt = () => {
	const [values, setValues] = useState(initialState)

	function toFind(event) {
		event.preventDefault()
		
		console.log(values)
		axios
		.get("https://sistemaifrj.herokuapp.com/admins/f/" + values.login2)
		.then(response => {
			console.log(response)
			document.getElementById('login2AltAdm').disabled = true
			document.getElementById('nomeAltAdm').disabled=false
			document.getElementById('emailAltAdm').disabled=false
			document.getElementById('loginAltAdm').disabled=false
			document.getElementById('passwordAltAdm').disabled=false
			document.getElementById('passwordConfirmedAltAdm').disabled=false
			OnFound(
				{ 
					valueNome: response.data.nome,
					valueLogin: response.data.login,
					valueEmail: response.data.email
				}
			)
		})
		.catch(error => {
			console.log(error)
		})

	  }

	function OnFound({valueNome, valueLogin, valueEmail }){
		setValues({
			...values,
			['nome']: valueNome,
			['login']: valueLogin,
			['email']: valueEmail
		});
		
	}


	function clearMan(){
		setValues({
			...values,
			['nome']: '',
			['login']: '',
			['email']: '',
			['login2']: '',
			['crpsenha']: '',
			['crpsenhax']: ''
		});
		document.getElementById('login2AltAdm').disabled = false
		document.getElementById('nomeAltAdm').disabled=true
		document.getElementById('emailAltAdm').disabled=true
		document.getElementById('loginAltAdm').disabled=true
		document.getElementById('passwordAltAdm').disabled=true
		document.getElementById('passwordConfirmedAltAdm').disabled=true
		
	}

	function onSubmit(event){
		event.preventDefault()
		if(values.crpsenha !== values.crpsenhax ){
			alert('Digita uma senha igual o nóia')
		}else{
		axios
		.put("https://sistemaifrj.herokuapp.com/admins/" + values.login2, {
			nome: values.nome,
			login: values.login,
			email: values.email,
			crpsenha: values.crpsenha
		})
		.then(response => {
			console.log(response)
			clearMan()
		})
		.catch(error => {
			console.log(error)
		})
	}
	}

	function onDelete(event){
		event.preventDefault();
		axios
		.delete("https://sistemaifrj.herokuapp.com/admins/l/" + values.login2)
		.then(response => {
			console.log(response)
			clearMan()
		})
		.catch(error => {
			console.log(error)
		})
	}
	
	function OnChange(event) {	
		const { value, name } = event.target;
			setValues({
				...values,
				[name]: value
			});
			
	  }

	  

	return(

		<div>
				
		<Sidebar/>
		
		<form  onSubmit={onSubmit}className="form_altAdmin">
		

			<div className="inputAdmLogin2_alt">
				
				<input
					id="login2AltAdm"
					type="text"
					name="login2"
					placeholder="Login de Busca"
					value={values.login2}
					onChange={OnChange}
				/>
			</div>

			<div className="inputAdmNome_alt">
			
				<input
					disabled
					id="nomeAltAdm"
					type="text"
					name="nome"
					placeholder="Nome Completo"
					value={values.nome}
					onChange={OnChange}
				/>
			</div>

			<div className="inputAdmEmail_alt">
		
				<input
					disabled
					id="emailAltAdm"
					type="text"
					name="email"
					placeholder="E-mail"
					value={values.email}
					onChange={OnChange}
				/>
			</div>

			<div className="inputAdmLogin_alt">
				
				<input
					disabled
					id="loginAltAdm"
					type="text"
					name="login"
					placeholder="Login"
					value={values.login}
					onChange={OnChange}
				/>
			</div>

			<div className="inputAdmSenha_alt">
				<input
					disabled
					id="passwordAltAdm"
					type="password"
					name="crpsenha"
					placeholder="Senha"
					value={values.crpsenha}
					onChange={OnChange}
				/>
			</div>
			
			<div className="inputAdmSenhaConfirmar_alt">
				<input
					disabled
					id="passwordConfirmedAltAdm"
					type="password"
					name="crpsenhax"
					placeholder="Confirmar Senha"
					value={values.crpsenhax}
					onChange={OnChange}
				/>
			</div>
			
			<button type="submit" className="btnAltAdm">Salvar</button>

			<button type="button" onClick={clearMan}className="btnAltAdmLimpar">Limpar</button>

			
		
		</form>
		<form  onSubmit={onDelete}className="form_altAdmin">
			<button type="submit" className="btnExcAdm">Excluir</button>
		</form>
		<form onSubmit={toFind} className="form_altAdmin">
		<button type="submit" className="btnFindAdm">Localizar</button>
		</form>
	
		
	</div>
	)

	


}

export default AdminAlt
