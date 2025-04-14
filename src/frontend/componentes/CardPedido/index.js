import styled from 'styled-components';
import BotaoVerde from '../Botões/BotaoVerde';
import BotaoVermelho from '../Botões/BotaoVermelho';
import dadosCard from './dadosCard';
import React from "react";
import { useEffect } from 'react'
import { useForm, Controller } from "react-hook-form";
import { listarPedidos, listarPedidosPorCliente } from '../../serviços/pedido';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const OrderCard = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
`;
const OrderInfo = styled.p`
  font-size: 14px;
  color: #333;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ExibirDetalhes = (pedido) => {
  console.log("Detalhes do pedido:", pedido.itens);
};

function CardPedido({ user }) {
  const { idCliente } = useContext(AuthContext);
  const formMethods = useForm();

  const [pedidos, setPedidos] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const resposta = await listarPedidosPorCliente(idCliente);
        console.log("Pedidos retornados:", resposta.data);
        setPedidos(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar pedidos:", erro);
      } finally {
        setCarregando(false);
      }
    }

    if (idCliente) {
      carregarPedidos();
    }
  }, [idCliente]);

  if (carregando) return <p>Carregando pedidos...</p>;

  return (
    <>
      {pedidos.map((pedido) => (
        <OrderCard key={pedido.id}>
          <OrderInfo><strong>Pedido # {pedido.id}</strong></OrderInfo>
          <OrderInfo>Data do Pedido: {new Date(pedido.dataPedido).toLocaleDateString("pt-BR")}</OrderInfo>
          <OrderInfo>Status: {pedido.status}</OrderInfo>
          <OrderInfo>Preço: {pedido.totalPreco}</OrderInfo>
          <OrderInfo>
            Quantidade de itens: {pedido.itens ? pedido.itens.length : 0}
          </OrderInfo>

          <ButtonGroup>
            {pedido.status === "Pendente" && (
              <BotaoVermelho>Cancelar Pedido</BotaoVermelho>
            )}
            {pedido.status === "Entregue" && (
              <>
                <BotaoVerde>Solicitar Troca</BotaoVerde>
                <BotaoVermelho>Solicitar Devolução</BotaoVermelho>
              </>
            )}
          </ButtonGroup>

          <BotaoVerde onClick={() => ExibirDetalhes(pedido)}>
            Exibir detalhes
          </BotaoVerde>
        </OrderCard>
      ))}
    </>
  );
}

export default CardPedido;
