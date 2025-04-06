import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/pedidos";

export const criarPedido = async (pedido) => {
  return await axios.post(`${API_BASE_URL}`, pedido);
};

const ITENS_PEDIDO_URL = "http://localhost:5000/api/itenspedido";

export const criarItemPedido = async (item) => {
  return await axios.post(ITENS_PEDIDO_URL, item);
};

const PEDIDOS_CLIENTE_URL = "http://localhost:5000/api/pedidoscliente";

export async function listarPedidos() {
  return await axios.get(`${PEDIDOS_CLIENTE_URL}`);
}