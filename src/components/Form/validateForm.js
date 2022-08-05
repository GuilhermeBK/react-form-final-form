export default function validateForm({ quantidade, nome, descricao, numero, codigo  }) {
	if (!descricao) {
		return 'Nome do produto é obrigatorio!';
	}
	if (quantidade <= 0) {
		return 'Quantidade deve ser maior que zero!';
	}

	if (!nome) {
		return 'Digite seu nome!';
	}

	return null;
}
