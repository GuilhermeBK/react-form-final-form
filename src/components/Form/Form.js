import React, { useState } from 'react';
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	FormMessage,
	FormButton,
	FormTitle,
} from './FormStyles';
import { Container } from '../../globalStyles';
import validateForm from './validateForm';
import { useHistory } from 'react-router';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


const Form = () => {
	const [quantidade, setQuantidade] = useState('');
	const [nome, setNome] = useState('');
	const [descricao, setDescricao] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [data, setData] = useState(null);

	let history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		const resultError = validateForm({ quantidade, nome, descricao });

		if (resultError !== null) {
			setError(resultError);
			return;
		}
		
		setError(null);

		setQuantidade(quantidade)
		setDescricao(descricao)

		const payload = {
			"itens" : [
				{
					quantidade: quantidade,
					//nome: null,
					descricao: descricao
				}
			]
		}

		const json = JSON.stringify(payload);

		const headers = {
			'Content-Type': 'application/json',
		}

		console.log(json)

		axios.post('http://localhost:8082/pedidos/', json, {
			headers: headers
		}).then(response => setData(response.data))
		.catch(error => { 
			setError(error.response.data.message)
			console.log(error)
		 })
		 
	
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'Quantidade', value: quantidade, onChange: (e) => setQuantidade(e.target.value), type: 'text' },
		{ label: 'Nome do produto', value: nome, onChange: (e) => setNome(e.target.value), type: 'text' },
		{ label: 'Descricao', value: descricao, onChange: (e) => setDescricao(e.target.value), type: 'text' },
	];

	const pag = (e) => {
		console.log("AQUI")
		return (
			<>
				PAGAMENTOS
			</>
		);
	}
	return (
		<FormSection>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>PEDIDO</FormTitle>
						<FormWrapper onSubmit={handleSubmit}>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}
							<FormButton type="submit">Fazer</FormButton>
						</FormWrapper>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)}
					</FormColumn>
				</FormRow>
				<Pagamento nome descricao quantidade></Pagamento>
			</Container>
		</FormSection>
	);
};

const Pagamento = (propsNome, propsDescricao, propsQuantidade) => {
	const [quantidade, setQuantidade] = useState('');
	const [descricao, setDescricao] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [numero, setNumero] = useState(null);
	const [nome, setNome] = useState(null);
	const [codigo, setCodigo] = useState(null);
	const [pedidoId, setPedidoId] = useState(null);
	const [valor, setValor] = useState(null);
	const [formaDePagamentoId, setIdPagamento] = useState(null);
	const [expiracao, setExpiracao] = useState(null);
	const [data, setData] = useState(null);

	let history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		const resultError = validateForm({ quantidade, nome, descricao, numero, codigo, pedidoId });

		if (resultError !== null) {
			setError(resultError);
			return;
		}
		
		setError(null);

		const payload = {
			"itens" : [
				{
					quantidade: quantidade,
					descricao: descricao
				}
			]
		}

		

		const jsonPedido = JSON.stringify(payload);

		const headers = {
			'Content-Type': 'application/json',
		}

		console.log(jsonPedido)
		

		axios.post('http://localhost:8082/pedidos/', jsonPedido, {
			headers: headers
		}).then(response => setPedidoId(response.id))
		.catch(error => {
			console.log(error.data)
		 })

		 const payloadFinanceiro = {
			valor: valor,
			nome: nome,
			numero: numero,
			expiracao: expiracao,
			codigo: codigo,
			pedidoId: pedidoId,
			formaDePagamentoId: formaDePagamentoId
		}

		const jsonFinanceiro = JSON.stringify(payloadFinanceiro);
		console.log(jsonFinanceiro)

		axios.post('http://localhost:8081/pagamentos/', jsonFinanceiro, {
			headers: headers
		}).then(response => setData(response.data))
		.catch(error => { 
			setError(error.message)
			console.log(error)
		 })

	
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const form = [
		{ label: 'Quantidade', value: quantidade, onChange: (e) => setQuantidade(e.target.value), type: 'text' },
		{ label: 'Descricao', value: descricao, onChange: (e) => setDescricao(e.target.value), type: 'text' },		
		{ label: 'Seu nome', value: nome, onChange: (e) => setNome(e.target.value), type: 'text' },
		{ label: 'Numero do cartão', value: numero, onChange: (e) => setNumero(e.target.value), type: 'text' },
		{ label: 'Codigo do verso', value: codigo, onChange: (e) => setCodigo(e.target.value), type: 'text' },
		{ label: 'Expiracao', value: expiracao, onChange: (e) => setExpiracao(e.target.value), type: 'number' },
		{ label: 'formaDePagamentoId', value: formaDePagamentoId, onChange: (e) => setIdPagamento(e.target.value), type: 'text' },
		{ label: 'Total', value: valor, onChange: (e) => setValor(100 * quantidade), type: 'text' },
	];
	return (
		<FormSection>
			<Container>
				<FormRow>
				<FormColumn small>
						<FormTitle>Pedido</FormTitle>
						<FormWrapper onSubmit={handleSubmit}>
							{form.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}
							<FormButton type="submit">Fazer</FormButton>
							
						</FormWrapper>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)}
					</FormColumn>
				</FormRow>
			</Container>
		</FormSection>
	);
};

export default Form;
