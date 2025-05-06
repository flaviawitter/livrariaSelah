import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import BotaoVerde from '../Botões/BotaoVerde';
import BotaoVermelho from '../Botões/BotaoVermelho';
import { buscarLivroPorId } from '../../serviços/livros';
import { atualizarPedido } from '../../serviços/pedido';
import { useToast } from "../Context/ToastContext";
import { atualizarItemPedido } from '../../serviços/itensPedido';

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

function CardDetalhes() {
  const { state } = useLocation();
  const { pedidoSelecionado } = state || {};
  const [livros, setLivros] = useState({});
  const { showToast } = useToast();

  useEffect(() => {
    async function buscarLivros() {
      const resultados = {};
      for (const item of pedidoSelecionado.itens) {
        try {
          const resposta = await buscarLivroPorId(item.livroId);
          resultados[item.livroId] = resposta;
        } catch (erro) {
          console.error(`Erro ao buscar livro ${item.livroId}:`, erro);
        }
      }
      setLivros(resultados);
    }

    if (pedidoSelecionado) {
      buscarLivros();
    }
  }, [pedidoSelecionado]);

  if (!pedidoSelecionado) return <p>Pedido não encontrado.</p>;

  const handleSolicitarTroca = async (idPedido, idItem) => {
    const statusPedido = "Troca Solicitada";
    const bodyAtualizado = {
      id: idItem,
      status: statusPedido
    }
    try {      
      await atualizarItemPedido(bodyAtualizado);
      await atualizarPedido(idPedido, statusPedido);
      showToast('Troca solicitada com sucesso!', 'success');
    } catch (error) {
      console.error("Erro ao solicitar troca:", error);
      showToast('Erro ao solicitar troca.', 'error');
    }
  };

  const handleSolicitarDevolucao = async (idPedido, idItem) => {
    const statusPedido = "Devolução Solicitada";
      const bodyAtualizado = {
        id: idItem,
        status: statusPedido
      }
    try {
      await atualizarItemPedido(bodyAtualizado);
      await atualizarPedido(idPedido, statusPedido);
      showToast('Devolução solicitada com sucesso!', 'success');
    } catch (error) {
      console.error("Erro ao solicitar devolução:", error);
      showToast('Erro ao solicitar devolução.', 'error');
    }
  };
  
  const handlePedido = async (idPedido, idItem, status) => {
    const bodyAtualizado = {
      id: idItem,
      status: status
    }
    try {
      await atualizarItemPedido(bodyAtualizado);
      await atualizarPedido(idPedido, status);
      showToast('Pedido cancelado com sucesso!', 'success');
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      showToast('Erro ao atualizar pedido.', 'error');
    }
  };

  return (
    <OrderCard>
      <OrderInfo><strong>Itens do Pedido:</strong></OrderInfo>
      {pedidoSelecionado.itens.map((item, index) => {
        const livro = livros[item.livroId];
        return (
          <div key={index}>
            <OrderInfo><strong>Livro:</strong> {livro ? livro.titulo : 'Carregando...'}</OrderInfo>
            <OrderInfo>Preço Unitário: R$ {livro ? livro.precoVenda : 'Carregando...'}</OrderInfo>
            <OrderInfo>Quantidade: {item.quantidade}</OrderInfo>
            <OrderInfo>Status do Item: {item.status}</OrderInfo>
            <ButtonGroup>
              {item.status === "Pendente" && (
                <BotaoVermelho onClick={() => handlePedido(pedidoSelecionado.id, item.livroId, "Cancelado")}>Cancelar Pedido</BotaoVermelho>
              )}
              {item.status === "Entregue" && (
                <>
                  <BotaoVerde onClick={() => handleSolicitarTroca(pedidoSelecionado.id, item.livroId)}>Solicitar Troca</BotaoVerde>
                  <BotaoVermelho onClick={() => handleSolicitarDevolucao(pedidoSelecionado.id, item.livroId)}>Solicitar Devolução</BotaoVermelho>
                </>
              )}
            </ButtonGroup>
          </div>
        );
      })}
    </OrderCard>
  );
}

export default CardDetalhes;
