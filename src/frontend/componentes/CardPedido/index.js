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


function CardPedido({user}) {
  const { idCliente } = useContext(AuthContext);

  console.log("ID do cliente:", idCliente); // Verifica se o ID do cliente está sendo passado corretamente
    const formMethods = useForm();  // Adiciona useForm caso control não seja passado
    const pedido = user?.pedidos || [];

    const [pedidos, setPedidos] = React.useState([]); // Estado para armazenar os pedidos
    const [carregando, setCarregando] = React.useState(true); // Estado para controlar o carregamento

    useEffect(() => {
      async function carregarPedidos() {
        try {
          const resposta = await listarPedidosPorCliente(idCliente);
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
          <OrderInfo>Data do Pedido: {pedido.dataPedido}</OrderInfo>
          <OrderInfo>Status: {pedido.status}</OrderInfo>
          <OrderInfo>Quantidade de itens: {pedido.itens.length}</OrderInfo>
          <ButtonGroup>
            {pedido.status === "Aguardando aprovação" && (
              <BotaoVermelho>Cancelar Pedido</BotaoVermelho>
            )}
            {pedido.status === "Entregue" && (
              <>
                <BotaoVerde>Solicitar Troca</BotaoVerde>
                <BotaoVermelho>Solicitar Devolução</BotaoVermelho>
              </>
            )}
          </ButtonGroup>
        </OrderCard>
      ))}
    </>
  );
}

export default CardPedido;
