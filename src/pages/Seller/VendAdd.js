import React, { Component } from 'react'

//FAZER CSS VENDEDORADD

import axios from 'axios'

import '../../styles/pages/vendadd.css'

import Sidebar from '../../components/Sidebar/sidebar.jsx';

class VendAdd extends Component {
	constructor(props) {
		super(props)

		this.state = {
			matricula: '',
			nome: '',
			email: '',
			crpsenha: ''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('https://sistemaifrj.herokuapp.com/vendedores/', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { matricula, nome, email, crpsenha  } = this.state
		return (
			

			<div>

				<Sidebar/>

				<form onSubmit={this.submitHandler} className="form_addVend">
				
					<div className="inputVendNome">
					
						<input
							type="text"
							name="nome"
							placeholder="Nome Completo"
							value={nome}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="inputVendEmail">
				
						<input
							type="text"
							name="email"
							placeholder="E-mail"
							value={email}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="inputVendMatricula">
						
						<input
							type="text"
							name="matricula"
							placeholder="Matrícula"
							value={matricula}
							onChange={this.changeHandler}
						/>
					</div>
					

					
					<div className="inputVendSenha">
						<input
							type="password"
							name="crpsenha"
							placeholder="Senha"
							value={crpsenha}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="inputVendSenhaConfirmar">
						<input
							type="password"
							name="crpsenhax"
							placeholder="Confirmar Senha"
							
						/>
					</div>
					
					<button type="submit" className="btnAddVend">Salvar</button>
					<button type="submit" className="btnAddVendLimpar">Limpar</button>
				</form>
			</div>
		)
	}
}

export default VendAdd