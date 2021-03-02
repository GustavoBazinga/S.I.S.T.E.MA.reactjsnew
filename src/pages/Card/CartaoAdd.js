import React, { Component } from 'react'

//FAZER CSS VENDEDORADD

import axios from 'axios'


import Sidebar from '../../components/Sidebar/sidebar.jsx';

import '../../styles/pages/cartaoadd.css'



class CartaoAdd extends Component {
	constructor(props) {
		super(props)

		this.state = {
			matricula: '',
			nome: '',
			email: '',
			saldo: ''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}
	
	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('https://sistemaifrj.herokuapp.com/users/', this.state)
			.then(response => {
				console.log(response)
				
			})
			.catch(error => {
				console.log(error)
			})
	}

	 

	render() {
		const { matricula, nome, email, saldo  } = this.state
		return (
			


			<div>

				<Sidebar/>

				<form onSubmit={this.submitHandler} className="form_addCartao">
				
					<div className="inputCartaoNome">
					
						<input
							type="text"
							name="nome"
							placeholder="Nome Completo"
							value={nome}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="inputCartaoEmail">
				
						<input
							type="text"
							name="email"
							placeholder="E-mail"
							value={email}
							onChange={this.changeHandler}
						/>
					</div>
					<div className="inputCartaoMatricula">
						
						<input
							type="text"
							name="matricula"
							placeholder="Matrícula"
							value={matricula}
							onChange={this.changeHandler}
						/>
					</div>
					

					
					<div className="inputCartaoSaldo">
						<input
							type="number"
							name="saldo"
							placeholder="Saldo"
							value={saldo}
							onChange={this.changeHandler}
						/>
					</div>



					
					<button type="submit" className="btnAddCartao">Salvar</button>



					<button type="submit" className="btnAddCartaoLimpar">Limpar</button>
				</form>
			</div>
		)
	}
}

export default CartaoAdd