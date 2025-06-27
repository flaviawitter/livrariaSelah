import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const adicionarItemCarrinho = async (dados) => {
  const response = await api.post('/carrinho', dados);
  return response.data;
};

export const excluirItemCarrinho = async (clienteId) => {
  const response = await api.delete('/carrinho/' + clienteId);
  return response.data;
};


