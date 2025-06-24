import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const adicionarItemCarrinho = async (dados) => {
  const response = await api.post('/carrinho', dados);
  return response.data;
};
