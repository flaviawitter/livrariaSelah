import { useLocation } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
import styled from 'styled-components';
import BotaoVerde from '../Botões/BotaoVerde';
import BotaoVermelho from '../Botões/BotaoVermelho';
import { buscarLivroPorId } from '../../serviços/livros';
import { atualizarPedido } from '../../serviços/pedido';
import { useToast } from "../Context/ToastContext";

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

  // === Funções de solicitar troca e devolução ===
  const handleSolicitarTroca = async (idPedido) => {
    try {
      const status = "Troca Solicitada";
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
      await atualizarPedido(idPedido, status);
      showToast('Devolução solicitada com sucesso!', 'success');
    } catch (error) {
      console.error("Erro ao solicitar devolução:", error);
      showToast('Erro ao solicitar devolução.', 'error');
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
              {pedidoSelecionado.status === "Pendente" && (
                <BotaoVermelho>Cancelar Pedido</BotaoVermelho>
              )}
              {pedidoSelecionado.status === "Entregue" && (
                <>
                  <BotaoVerde onClick={() => handleSolicitarTroca(pedidoSelecionado.id)}>Solicitar Troca</BotaoVerde>
                  <BotaoVermelho onClick={() => handleSolicitarDevolucao(pedidoSelecionado.id)}>Solicitar Devolução</BotaoVermelho>
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
