import React, { useState } from 'react';

import './cartaoalt.css';

import axios from 'axios'

import Sidebar from '../../components/Sidebar/Sidebar.jsx';

function initialState() {
	return { matricula: '',
	 		nome: '',
	 		email: '',
			saldo: '',
 			matricula2: '',	 		
     }
  }

const CartaoAlt = () => {
	const [values, setValues] = useState(initialState)

	function toFind(event) {
		event.preventDefault()
		
		console.log(values)
		axios
		.get("https://sistemaifrj.herokuapp.com/users/f/" + values.matricula2)
		.then(response => {
			console.log(response)
			document.getElementById('matricula2AltCartao').disabled = true
			document.getElementById('nomeAltCartao').disabled=false
			document.getElementById('emailAltCartao').disabled=false
			document.getElementById('matriculaAltCartao').disabled=false
			document.getElementById('saldoAltCartao').disabled=false
			OnFound(
				{ 
					valueNome: response.data.nome,
					valueMatricula: response.data.matricula,
					valueEmail: response.data.email,
          valueSaldo: response.data.saldo
				}
			)
		})
		.catch(error => {
			console.log(error)
		})

	  }

	function OnFound({valueNome, valueMatricula, valueEmail, valueSaldo }){
		setValues(initialState);
		
	}


	function clearMan(){
		setValues(clearMan);
		document.getElementById('matricula2AltCartao').disabled = false
		document.getElementById('nomeAltCartao').disabled=true
		document.getElementById('emailAltCartao').disabled=true
		document.getElementById('matriculaAltCartao').disabled=true
		document.getElementById('saldoAltCartao').disabled=true
	}

	function onSubmit(event){
		event.preventDefault()
		axios
		.put("https://sistemaifrj.herokuapp.com/users/" + values.matricula2, {
			nome: values.nome,
			matricula: values.matricula,
			email: values.email,
			saldo: values.saldo
		})
		.then(response => {
			console.log(response)
			clearMan()
		})
		.catch(error => {
			console.log(error)
		})
	
	}

	function onDelete(event){
		event.preventDefault();
		axios
		.delete("https://sistemaifrj.herokuapp.com/users/" + values.matricula2)
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
		
		<form  onSubmit={onSubmit}className="form_altCartao">
		

			<div className="inputCartaoMatricula2_alt">
				
				<input
					id="matricula2AltCartao"
					type="text"
					name="matricula2"
					placeholder="Matricula de Busca"
					value={values.matricula2}
					onChange={OnChange}
				/>
			</div>

			<div className="inputCartaoNome_alt">
			
				<input
					disabled
					id="nomeAltCartao"
					type="text"
					name="nome"
					placeholder="Nome Completo"
					value={values.nome}
					onChange={OnChange}
				/>
			</div>

			<div className="inputCartaoEmail_alt">
		
				<input
					disabled
					id="emailAltCartao"
					type="text"
					name="email"
					placeholder="E-mail"
					value={values.email}
					onChange={OnChange}
				/>
			</div>

			<div className="inputCartaoMatricula_alt">
				
				<input
					disabled
					id="matriculaAltCartao"
					type="text"
					name="matricula"
					placeholder="Matricula"
					value={values.matricula}
					onChange={OnChange}
				/>
			</div>

			<div className="inputCartaoSaldo_alt">
				<input
					disabled
					id="saldoAltCartao"
					type="text"
					name="saldo"
					placeholder="Saldo"
					value={values.saldo}
					onChange={OnChange}
				/>
			</div>
			
			
			<button type="submit" className="btnAltCartao">Salvar</button>

			<button type="button" onClick={clearMan}className="btnAltCartaoLimpar">Limpar</button>

			
		
		</form>
		<form  onSubmit={onDelete}className="form_altCartao">
			<button type="submit" className="btnExcCartao">Excluir</button>
		</form>
		<form onSubmit={toFind} className="form_altCartao">
		<button type="submit" className="btnFindCartao">Localizar</button>
		</form>
	
		
	</div>
	)

	


}

export default CartaoAlt
