import styled from 'styled-components';
import React from "react";
import { useEffect } from 'react'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { listarCuponsPorCliente } from '../../serviços/cupom';

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

function PagCupom() {

  const navigate = useNavigate();

 
  const { idCliente } = useContext(AuthContext);

  const [cupons, setCupons] = React.useState([]);
  const [carregando, setCarregando] = React.useState(true);

  useEffect(() => {
    async function carregarCupons() {
      try {
        const resposta = await listarCuponsPorCliente(idCliente);
        console.log("Cupons retornados:", resposta.data);
        setCupons(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar cupons:", erro);
      } finally {
        setCarregando(false);
      }
    }

    if (idCliente) {
      carregarCupons();
    }
  }, [idCliente]);

  if (carregando) return <p>Carregando cupons...</p>;

  return (
    <Container>
      <Title>CUPONS</Title>
      <FilterSection>
        <label>Filtrar pedidos:</label>
        <input type="text" placeholder="Data inicial" />
        <input type="text" placeholder="Data final" />
      </FilterSection>
      <OrderList>
        <OrderCard>
        <>
          {cupons.map((cupom) => (
            <OrderCard key={cupom.id}>
              <OrderInfo><strong>Cupom # {cupom.id}</strong></OrderInfo>
              <OrderInfo>Código do cupom: {cupom.descricao}</OrderInfo>
            </OrderCard>
          ))}
        </>
        </OrderCard>
      </OrderList>
    </Container>
  );
}

export default PagCupom;




  

