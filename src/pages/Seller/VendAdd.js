import React, { useState } from 'react'

//FAZER CSS VENDEDORADD

import axios from 'axios'

import '../../styles/pages/vendadd.css'

import Sidebar from '../../components/Sidebar/sidebar.jsx';



function initialState() {
	return { matricula: '',
	 		nome: '',
	 		email: '',
			crpsenha: '', 		
			crpsenhax:'' }
  }

const VenAdd = () => {
	const [values, setValues] = useState(initialState)

	function onSubmit(event){
		event.preventDefault();
		if(values.crpsenha !== values.crpsenhax){
			alert('Digita uma senha igual o nóia')
		}else{
			axios
				.post('https://sistemaifrj.herokuapp.com/vendedores/', values)
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


	return (

		<div>

				<Sidebar/>

				<form onSubmit={onSubmit} className="form_addVend">
				
					<div className="inputVendNome">
					
						<input
							type="text"
							name="nome"
							placeholder="Nome Completo"
							value={values.nome}
							onChange={OnChange}
						/>
					</div>
					<div className="inputVendEmail">
				
						<input
							type="text"
							name="email"
							placeholder="E-mail"
							value={values.email}
							onChange={OnChange}
						/>
					</div>
					<div className="inputVendMatricula">
						
						<input
							type="text"
							name="matricula"
							placeholder="Matrícula"
							value={values.matricula}
							onChange={OnChange}
						/>
					</div>
					

					
					<div className="inputVendSenha">
						<input
							type="password"
							name="crpsenha"
							placeholder="Senha"
							value={values.crpsenha}
							onChange={OnChange}
						/>
					</div>
					<div className="inputVendSenhaConfirmar">
						<input
							type="password"
							name="crpsenhax"
							placeholder="Confirmar Senha"
							value={values.crpsenhax}
							onChange={OnChange}
						/>
					</div>
					
					<button type="submit" className="btnAddVend">Salvar</button>
					<button type="submit" className="btnAddVendLimpar">Limpar</button>
				</form>
			</div>
	)

}


export default VenAdd