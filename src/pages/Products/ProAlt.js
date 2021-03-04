import React, { useState } from 'react';

import '../../styles/pages/productalt.css';

import axios from 'axios'

import Sidebar from '../../components/Sidebar/Sidebar.jsx';

function initialState() {
	return { estoque: '',
	 		nome: '',
	 		categoria: '',
			preco: '',
 			nome2: '',	 		
     }
  }

const ProAlt = () => {
	const [values, setValues] = useState(initialState)

	function toFind(event) {
		event.preventDefault()
		
		console.log(values)
		axios
		.get("https://sistemaifrj.herokuapp.com/produtos/f/" + values.nome2)
		.then(response => {
			console.log(response)
			document.getElementById('nome2AltProduct').disabled = true
			document.getElementById('nomeAltProduct').disabled=false
			document.getElementById('categoriaAltProduct').disabled=false
			document.getElementById('estoqueAltProduct').disabled=false
			document.getElementById('precoAltProduct').disabled=false
			OnFound(
				{ 
					valueNome: response.data.nome,
					valueEstoque: response.data.estoque,
					valueCategoria: response.data.categoria,
          valuePreco: response.data.preco
				}
			)
		})
		.catch(error => {
			console.log(error)
		})

	  }

	function OnFound({valueNome, valueEstoque, valueCategoria, valuePreco }){
		setValues({
			...values,
			['nome']: valueNome,
			['estoque']: valueEstoque,
			['categoria']: valueCategoria,
      ['preco']: valuePreco
		});
		
	}


	function clearMan(){
		setValues(initialState);
		document.getElementById('nome2AltProduct').disabled = false
		document.getElementById('nomeAltProduct').disabled=true
		document.getElementById('categoriaAltProduct').disabled=true
		document.getElementById('estoqueAltProduct').disabled=true
		document.getElementById('precoAltProduct').disabled=true
	}

	function onSubmit(event){
		event.preventDefault()
		axios
		.put("https://sistemaifrj.herokuapp.com/produtos/" + values.nome2, {
			nome: values.nome,
			estoque: values.estoque,
			categoria: values.categoria,
			preco: values.preco
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
		.delete("https://sistemaifrj.herokuapp.com/produtos/" + values.nome2)
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
		
		<form  onSubmit={onSubmit}className="form_altProduct">
		

			<div className="inputProductNome2_alt">
				
				<input
					id="nome2AltProduct"
					type="text"
					name="nome2"
					placeholder="Nome do produto para busca"
					value={values.nome2}
					onChange={OnChange}
				/>
			</div>

			<div className="inputProductNome_alt">
			
				<input
					disabled
					id="nomeAltProduct"
					type="text"
					name="nome"
					placeholder="Nome do Produto"
					value={values.nome}
					onChange={OnChange}
				/>
			</div>

			<div className="inputProductCategoria_alt">
		
				<input
					disabled
					id="categoriaAltProduct"
					type="text"
					name="categoria"
					placeholder="Categoria"
					value={values.categoria}
					onChange={OnChange}
				/>
			</div>

			<div className="inputProductEstoque_alt">
				
				<input
					disabled
					id="estoqueAltProduct"
					type="text"
					name="estoque"
					placeholder="Estoque"
					value={values.estoque}
					onChange={OnChange}
				/>
			</div>

			<div className="inputProductPreco_alt">
				<input
					disabled
					id="precoAltProduct"
					type="text"
					name="preco"
					placeholder="Preço"
					value={values.preco}
					onChange={OnChange}
				/>
			</div>
			
			
			<button type="submit" className="btnAltProduct">Salvar</button>

			<button type="button" onClick={clearMan}className="btnAltProductLimpar">Limpar</button>

			
		
		</form>
		<form  onSubmit={onDelete}className="form_altProduct">
			<button type="submit" className="btnExcProduct">Excluir</button>
		</form>
		<form onSubmit={toFind} className="form_altProduct">
		<button type="submit" className="btnFindProduct">Localizar</button>
		</form>
	
		
	</div>
	)

}

export default ProAlt
