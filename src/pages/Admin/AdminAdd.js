import React, { Component, useState } from 'react'

import '../../styles/pages/adminadd.css'

import axios from 'axios'

import Sidebar from '../../components/Sidebar/sidebar.jsx';


function initialState() {
	return { login: '',
	 		nome: '',
	 		email: '',
			crpsenha: '', 		
			crpsenhax:'' }
  }

const AdminAdd = ()  => {
	const [values, setValues] = useState(initialState)

	function onSubmit(event){
		event.preventDefault();
		if(values.crpsenha !== values.crpsenhax){
			alert('Digita uma senha igual o nóia')
		}else{
			axios
				.post('https://sistemaifrj.herokuapp.com/admins/', values)
				.then(response => {
					console.log(response)
				})
				.catch(error => {
					console.log(error)
				})
		}
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

				<form onSubmit={onSubmit} className="form_addAdmin" name="FormAdmAdd">
				
					<div className="inputAdmNome">
					
						<input
							type="text"
							name="nome"
							placeholder="Nome Completo"
							value={values.nome}
							onChange={OnChange}
						/>
					</div>
					<div className="inputAdmEmail">
				
						<input
							type="text"
							name="email"
							placeholder="E-mail"
							value={values.email}
							onChange={OnChange}
						/>
					</div>
					<div className="inputAdmLogin">
						
						<input
							type="text"
							name="login"
							placeholder="Login"
							value={values.login}
							onChange={OnChange}
						/>
					</div>
					

					
					<div className="inputAdmSenha">
						<input
							type="password"
							name="crpsenha"
							placeholder="Senha"
							value={values.crpsenha}
							onChange={OnChange}
						/>
					</div>
					<div className="inputAdmSenhaConfirmar">
						<input
							type="password"
							name="crpsenhax"
							placeholder="Confirmar Senha"
							value={values.crpsenhax}
							onChange={OnChange}
						/>
					</div>
					
					<button type="submit" className="btnAddAdm">Salvar</button>
					<button type="submit" className="btnAddAdmLimpar">Limpar</button>
				</form>
			</div>

	)
}


export default AdminAdd