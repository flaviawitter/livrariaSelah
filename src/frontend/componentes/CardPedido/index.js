import styled from 'styled-components';
import BotaoVerde from '../Botões/BotaoVerde';
import BotaoVermelho from '../Botões/BotaoVermelho';
import React from "react";
import { useEffect } from 'react'
import { listarPedidosPorCliente } from '../../serviços/pedido';
import { useContext } from "react";
import { useAuth } from "../Context/AuthContext";
import BotaoSimples from '../Botões/BotaoSimples';
import { useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext";
import { atualizarPedido } from '../../serviços/pedido';
import { atualizarItensPorPedidoId } from '../../serviços/itensPedido';


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

function CardPedido({filtroId  }) {
  const { showToast } = useToast();

  const navigate = useNavigate();

  const handleLivroClick = (pedido) => {
    navigate(`/detalhes`, { state: { pedidoSelecionado: pedido } });
  };

  const handleSolicitarTroca = async (idPedido) => {
    try {
      const status = "Troca Solicitada";
      await atualizarItensPorPedidoId(idPedido, status);
      await atualizarPedido(idPedido, status);
      showToast('Troca solicitada com sucesso!', 'success');
      
    } catch (error) {
      console.error("Erro ao solicitar troca:", error);
      showToast('Erro ao solicitar troca.', 'error');
    }
  };
  
  const handleSolicitarDevolucao = async (idPedido) => {
    try {
      const status = "Devolução Solicitada";
      await atualizarItensPorPedidoId(idPedido, status);
      await atualizarPedido(idPedido, status);
      showToast('Devolução Solicitada!', 'success');

    } catch (error) {
      console.error("Erro ao solicitar Devolução:", error);
    }
  }

  const { idCliente } =  useAuth();

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
      {pedidos
      .filter((pedido) => {
          if (!filtroId) return true; // mostra todos se não houver filtro
          return pedido.id.toString().includes(filtroId);
        })
      .sort((a, b) => b.id - a.id)
      .map((pedido) => (
        <OrderCard key={pedido.id}>
          <OrderInfo><strong>Pedido # {pedido.id}</strong></OrderInfo>
          <OrderInfo>Data do Pedido: {new Date(pedido.dataPedido).toLocaleDateString("pt-BR")}</OrderInfo>
          <OrderInfo>Status: {pedido.status}</OrderInfo>
          <OrderInfo>Preço: {Number(pedido.totalPreco).toFixed(2)}</OrderInfo>
          <OrderInfo>
            Quantidade de itens: {pedido.itens ? pedido.itens.length : 0}
          </OrderInfo>

          <ButtonGroup>
            <BotaoSimples id="pedidos-detalhes" onClick={() => handleLivroClick(pedido)}>+ Detalhes</BotaoSimples>
          </ButtonGroup>
          <ButtonGroup>
            {pedidos.status === "Pendente" && (
              <BotaoVermelho id="pedidos-cancelar">Cancelar Pedido</BotaoVermelho>
            )}
            {pedido.status === "Entregue" && (
              <>
                <BotaoVerde id="pedidos-solicitarTroca" onClick={() => handleSolicitarTroca(pedido.id)}> Solicitar Troca</BotaoVerde>
                <BotaoVermelho id="pedidos-solicitarDevolucao" onClick={() => handleSolicitarDevolucao(pedido.id)}>Solicitar Devolução</BotaoVermelho>
              </>
            )}
          </ButtonGroup>


        </OrderCard>
      ))}
    </>
  );
}

export default CardPedido;
