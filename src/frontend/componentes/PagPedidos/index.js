import styled from 'styled-components';
import BotaoVerde from '../Botões/BotaoVerde';
import BotaoVermelho from '../Botões/BotaoVermelho';
import BotaoCinza from '../Botões/BotaoCinza';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;  
  font-family: 'Bookochi';
  letter-spacing: 0.22em;
`;

const Title = styled.h2`
  color: #095F54;
  font-size: 32px;
  font-family: 'Bookochi';
  letter-spacing: 0.22em;
  margin-left: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
  margin-left: 20px;

  label {
    font-size: 14px;
    color: #333;
  }

  input, select {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const OrderList = styled.div`
  width: 80%;
  margin-left: 20px;
`;

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


function PagPedidos() {
  return (
    <Container>
      <Title>PEDIDOS</Title>
      <FilterSection>
        <label>Filtrar pedidos:</label>
        <input type="text" placeholder="Data inicial" />
        <input type="text" placeholder="Data final" />
      </FilterSection>
      <OrderList>
        <OrderCard>
          <OrderInfo><strong>Pedido #123</strong></OrderInfo>
          <OrderInfo>Cliente: Nome do Cliente</OrderInfo>
          <OrderInfo>Data do Pedido: 02/03/2025</OrderInfo>
          <OrderInfo>Status: Aguardando Aprovação</OrderInfo>
          <ButtonGroup>
            <BotaoVerde>Aprovar Pedido</BotaoVerde>
            <BotaoVermelho>Cancelar Pedido</BotaoVermelho>
          </ButtonGroup>
        </OrderCard>
        <OrderCard>
          <OrderInfo><strong>Pedido #123</strong></OrderInfo>
          <OrderInfo>Cliente: Nome do Cliente</OrderInfo>
          <OrderInfo>Data do Pedido: 02/03/2025</OrderInfo>
          <OrderInfo>Status: Troca Solicitada</OrderInfo>
          <ButtonGroup>
            <BotaoCinza>Gerar Cupom de Troca</BotaoCinza>
            <BotaoVermelho>Recusar Troca</BotaoVermelho>
          </ButtonGroup>
        </OrderCard>
      </OrderList>
    </Container>
  );
}

export default PagPedidos;
