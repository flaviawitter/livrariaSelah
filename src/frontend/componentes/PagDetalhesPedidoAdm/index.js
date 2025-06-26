import styled from 'styled-components';
import CardDetalhesAdm from '../CardDetalhesAdm';
import { useLocation } from 'react-router-dom';

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

const OrderList = styled.div`
  width: 80%;
  margin-left: 20px;
`;

const OrderCard = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
`;

function PagDetalhesPedido() {
  const { state } = useLocation();
  const { pedidoSelecionado } = state || {};

  if (!pedidoSelecionado) return <p>Nenhum pedido selecionado.</p>;

  return (
    <Container>
      <Title>PEDIDO #{pedidoSelecionado.id}</Title>
      <OrderList>
        <OrderCard>
          <CardDetalhesAdm pedidoSelecionado={pedidoSelecionado} />
        </OrderCard>
      </OrderList>
    </Container>
  );
}

export default PagDetalhesPedido;
