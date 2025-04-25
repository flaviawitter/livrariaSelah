import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/pedidos";

export const criarPedido = async (pedido) => {
  return await axios.post(`${API_BASE_URL}`, pedido);
};


export const atualizarPedido = async (id, status) => {
  return await axios.put(`http://localhost:5000/api/pedidos/${id}`, {
    status, // body da requisição
  });
};

const ITENS_PEDIDO_URL = "http://localhost:5000/api/itenspedido";

export const criarItemPedido = async (item) => {
  return await axios.post(ITENS_PEDIDO_URL, item);
};

const PEDIDOS_CLIENTE_URL = "http://localhost:5000/api/pedidoscliente";

export async function listarPedidos() {
  return await axios.get(API_BASE_URL);
}

export async function listarPedidosPorCliente(idCliente) {
  return await axios.get(`http://localhost:5000/api/pedidos/clienteId/${idCliente}`);
}

