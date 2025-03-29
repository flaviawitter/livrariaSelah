import styled from 'styled-components';
import BotaoVerde from '../Botões/BotaoVerde';
import BotaoVermelho from '../Botões/BotaoVermelho';
import BotaoCinza from '../Botões/BotaoCinza';
import dadosCardAdm from './dadosCardAdm';

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


function CardPedidoAdm() {
  return (
    <>
      {dadosCardAdm.map((pedido) => (
        <OrderCard key={pedido.id}>
          <OrderInfo><strong>Pedido #{pedido.numPedido}</strong></OrderInfo>
          <OrderInfo>Cliente: {pedido.nomeCliente}</OrderInfo>
          <OrderInfo>Data do Pedido: {pedido.dataPedido}</OrderInfo>
          <OrderInfo>Status: {pedido.status}</OrderInfo>
          <ButtonGroup>
            {pedido.status === "Aguardando aprovação" && (
              <>
              <BotaoVerde>Aprovar Pedido</BotaoVerde>
              <BotaoVermelho>Cancelar Pedido</BotaoVermelho>
              </>
            )}
            {pedido.status === "Troca solicitada" && (
              <>
                <BotaoVerde>Aprovar Troca</BotaoVerde>
                <BotaoVermelho>Recusar Troca</BotaoVermelho>
              </>
            )}
            {pedido.status === "Devolução solicitada" && (
              <>
                <BotaoVerde>Aprovar Devolução</BotaoVerde>
                <BotaoVermelho>Recusar Devolução</BotaoVermelho>
              </>
            )}
          </ButtonGroup>
        </OrderCard>
      ))}
    </>
  );
}

export default CardPedidoAdm;
