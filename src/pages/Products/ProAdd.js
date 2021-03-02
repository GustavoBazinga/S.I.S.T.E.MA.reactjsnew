import React, { Component } from 'react'

import '../../styles/pages/productadd.css'

import axios from 'axios'

import Sidebar from '../../components/Sidebar/sidebar.jsx';

class ProAdd extends Component {
	constructor(props) {
		super(props)

		this.state = {
			nome: '',
            preco: '',
			estoque: '',
			categoria: ''
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		axios
			.post('https://sistemaifrj.herokuapp.com/produtos/', this.state)
			.then(response => {
				console.log(response)
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { nome, preco, estoque, categoria  } = this.state
		return (
			

			<div>

				<Sidebar/>
                
				<form onSubmit={this.submitHandler} className="form_addProduct">
				
                <div className="inputProductNome">
					
						<input
							type="text"
							name="nome"
							placeholder="Nome do Produto"
							value={nome}
							onChange={this.changeHandler}
						/>
					</div>
					
          
					
          <div className="inputProductEstoque">
						<input
							type="text"
							name="estoque"
							placeholder="Estoque"
							value={estoque}
							onChange={this.changeHandler}
						/>
					</div>
					

					
					<div className="inputProductCategoria">
						<input
							type="text"
							name="categoria"
							placeholder="Categoria"
							value={categoria}
							onChange={this.changeHandler}
						/>
					</div>

					<div className="inputProductPreco">
						<input
							type="text"
							name="preco"
							placeholder="Preço"
							value={preco}
							onChange={this.changeHandler}
						/>
					</div>
					
					
					<button type="submit" className="btnAddProduct">Salvar</button>
					<button type="submit" className="btnAddProductLimpar">Limpar</button>
				</form>
			</div>
		)
	}
}

export default ProAdd