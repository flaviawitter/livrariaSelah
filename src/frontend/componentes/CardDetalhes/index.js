import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import BotaoVerde from '../Botões/BotaoVerde';
import BotaoVermelho from '../Botões/BotaoVermelho';
import { buscarLivroPorId } from '../../serviços/livros';

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

function DetalhesPedido() {
  const { state } = useLocation();
  const { pedidoSelecionado } = state || {};

  const [livros, setLivros] = useState({});

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
                  <BotaoVerde>Solicitar Troca</BotaoVerde>
                  <BotaoVermelho>Solicitar Devolução</BotaoVermelho>
                </>
              )}
            </ButtonGroup>
          </div>
        );
      })}
    </OrderCard>
  );
}

export default DetalhesPedido;
