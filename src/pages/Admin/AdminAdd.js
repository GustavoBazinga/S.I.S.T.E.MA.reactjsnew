import React, { Component } from 'react'

import '../../styles/pages/adminadd.css'

import axios from 'axios'

import Sidebar from '../../components/Sidebar/sidebar.jsx';

class PostForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			login: '',
			nome: '',
			email: '',
			crpsenha: '',
			crpsenhax: ''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		if(this.state.crpsenha !== this.state.crpsenhax){
			alert('Digita uma senha igual o nóia')
		}else{
			console.log(this.state)
			axios
				.post('https://sistemaifrj.herokuapp.com/admins/', this.state)
				.then(response => {
					console.log(response)
				})
				.catch(error => {
					console.log(error)
				})
		}
		
	}

	render() {
		const { login, nome, email, crpsenha, crpsenhax  } = this.state
		return (
			

			<div>

				<Sidebar/>

				<form onSubmit={this.submitHandler} className="form_addAdmin" name="FormAdmAdd">
				
					<div className="inputAdmNome">
					
						<input
							type="text"
							name="nome"
							placeholder="Nome Completo"
							value={nome}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="inputAdmEmail">
				
						<input
							type="text"
							name="email"
							placeholder="E-mail"
							value={email}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="inputAdmLogin">
						
						<input
							type="text"
							name="login"
							placeholder="Login"
							value={login}
							onChange={this.changeHandler}
						/>
					</div>
					

					
					<div className="inputAdmSenha">
						<input
							type="password"
							name="crpsenha"
							placeholder="Senha"
							value={crpsenha}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="inputAdmSenhaConfirmar">
						<input
							type="password"
							name="crpsenhax"
							placeholder="Confirmar Senha"
							value={crpsenhax}
							onChange={this.changeHandler}
						/>
					</div>
					
					<button type="submit" className="btnAddAdm">Salvar</button>
					<button type="submit" className="btnAddAdmLimpar">Limpar</button>
				</form>
			</div>
		)
	}
}

export default PostForm