import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import BotaoVerde from '../Botões/BotaoVerde';
import BotaoVermelho from '../Botões/BotaoVermelho';
import { atualizarPedido, listarPedidos } from '../../serviços/pedido';
import { criarCupom } from '../../serviços/cupom';
import { useToast } from "../Context/ToastContext";
import { AuthContext } from "../Context/AuthContext";

// Styled Components
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

function gerarCodigoCupom(tamanho = 5) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < tamanho; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    codigo += caracteres[indice];
  }
  return codigo;
}


function CardPedidoAdm({ user }) {
  const { showToast } = useToast();
  const { idCliente } = useContext(AuthContext);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const response = await listarPedidos();
        console.log(response.data);
        setPedidos(response.data);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        showToast('Erro ao buscar pedidos.', 'error');
      }
    }

    fetchPedidos();
  }, []);

  const agendarEntrega = (idPedido) => {
    setTimeout(async () => {
      try {
        console.log("pedido recebido");
        
        await atualizarPedido(idPedido, "Entregue");
        showToast(`Pedido #${idPedido} entregue automaticamente!`, 'success');

        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === idPedido ? { ...pedido, status: "Entregue" } : pedido
          )
        );
      } catch (error) {
        console.error(`Erro ao atualizar para entregue o pedido ${idPedido}:`, error);
        showToast(`Erro ao marcar pedido #${idPedido} como entregue.`, 'error');
      }
    }, 3500);
  };

  const agendarTrocaConcluida = (idPedido) => {
    setTimeout(async () => {
      try {
        console.log("troca recebida");
        
        await atualizarPedido(idPedido, "Troca Concluída");
        showToast(`Pedido #${idPedido} trocado automaticamente!`, 'success');

        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === idPedido ? { ...pedido, status: "Troca Concluída" } : pedido
          )
        );
      } catch (error) {
        console.error(`Erro ao atualizar para troca concluída o pedido ${idPedido}:`, error);
        showToast(`Erro ao marcar pedido #${idPedido} como troca concluída.`, 'error');
      }
    }, 3500);
  };

  const agendarDevolucaoConcluida = (idPedido) => {
    setTimeout(async () => {
      try {
        console.log("troca recebida");
        
        await atualizarPedido(idPedido, "Devolução Concluída");
        showToast(`Pedido #${idPedido} devolvido automaticamente!`, 'success');

        setPedidos((prevPedidos) =>
          prevPedidos.map((pedido) =>
            pedido.id === idPedido ? { ...pedido, status: "Devolução Concluída" } : pedido
          )
        );
      } catch (error) {
        console.error(`Erro ao atualizar para devolução concluída o pedido ${idPedido}:`, error);
        showToast(`Erro ao marcar pedido #${idPedido} como devolução concluída.`, 'error');
      }
    }, 3500);
  };


  const handlePedido = async (idPedido, status) => {
    try {
      await atualizarPedido(idPedido, status);
      showToast('Pedido atualizado com sucesso!', 'success');
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error);
      showToast('Erro ao atualizar pedido.', 'error');
    }
  };

  const handleSolicitarDevolucao = async (idPedido, status) => {
    try {
      const novoCupom = {
        descricao: gerarCodigoCupom(),
        clientId: idCliente,
        validade: true
      };

      await criarCupom(novoCupom);
      await atualizarPedido(idPedido, status);
    } catch (error) {
      console.error("Erro ao solicitar Devolução:", error);
      showToast('Erro ao solicitar devolução.', 'error');
    }
  };

  
  return (
    <>
      {pedidos.map((pedido) => (        
        <OrderCard key={pedido.id}>
          <OrderInfo><strong>Pedido #{pedido.id}</strong></OrderInfo>
          <OrderInfo>Cliente: {pedido.cliente.nome}</OrderInfo>
          <OrderInfo>Data do Pedido: {pedido.dataPedido}</OrderInfo>
          <OrderInfo>Status: {pedido.status}</OrderInfo>
          <OrderInfo>Valor do Pedido: R$ {pedido.totalPreco}</OrderInfo>
          <OrderInfo>Cupom: {pedido.cupons.descricao}</OrderInfo>


          <ButtonGroup>
            {pedido.status === "Troca Solicitada" && (
              <>
                <BotaoVerde onClick={async () => {handlePedido(pedido.id, "Troca Aprovada");agendarTrocaConcluida(pedido.id);}}>Aprovar Troca</BotaoVerde>
                <BotaoVermelho onClick={() => handlePedido(pedido.id, "Troca Reprovada")}>Recusar Troca</BotaoVermelho>
              </>
            )}
            {pedido.status === "Devolução Solicitada" && (
              <>
                <BotaoVerde onClick={async () => {handleSolicitarDevolucao(pedido.id, "Devolução Aprovada");agendarDevolucaoConcluida(pedido.id);}}>Aprovar Devolução</BotaoVerde>
                <BotaoVermelho onClick={() => handlePedido(pedido.id, "Devolução Reprovada")}>Recusar Devolução</BotaoVermelho>
              </>
            )}
            {pedido.status === "Pendente" && (
              <>
                <BotaoVerde onClick={async () => {handlePedido(pedido.id, "Em transporte");agendarEntrega(pedido.id);}}>Aprovar Pedido</BotaoVerde>
                <BotaoVermelho onClick={() => handlePedido(pedido.id, "Pedido Reprovado")}>Recusar Pedido</BotaoVermelho>
              </>
            )}
          </ButtonGroup>
        </OrderCard>
      ))}
    </>
  );
}

export default CardPedidoAdm;
