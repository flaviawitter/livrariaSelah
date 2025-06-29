import styled from 'styled-components';
import React, { useEffect, useState, useContext } from "react";
import { useAuth } from "../Context/AuthContext";
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

function PagCupom() {
  const navigate = useNavigate();
  const { idCliente } =  useAuth();

  const [cupons, setCupons] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");

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

  const cuponsFiltrados = cupons.filter(cupom => {
    const textoBusca = busca.toLowerCase();
    return (
      cupom.pedidoId.toString().includes(textoBusca) ||
      cupom.valor.toString().includes(textoBusca) ||
      (cupom.descricao && cupom.descricao.toLowerCase().includes(textoBusca))
    );
  });

  if (carregando) return <p>Carregando cupons...</p>;

  return (
    <Container>
      <Title>CUPONS</Title>
      <OrderList>
        {cuponsFiltrados.length > 0 ? (
          cuponsFiltrados.map((cupom) => (
            <OrderCard key={cupom.id}>
              <OrderInfo><strong>Cupom # {cupom.id}</strong></OrderInfo>
              <OrderInfo>Código do cupom: {cupom.descricao}</OrderInfo>
              <OrderInfo>Valor do cupom: R${cupom.valor}</OrderInfo>
              <OrderInfo>Cupom referente ao pedido: {cupom.pedidoId}</OrderInfo>
              <OrderInfo>
                {cupom.validade ? (
                  <span style={{ color: 'green' }}>Cupom válido</span>
                ) : (
                  <span style={{ color: 'red' }}>Cupom inválido</span>
                )}
              </OrderInfo>
            </OrderCard>
          ))
        ) : (
          <OrderInfo>Nenhum cupom encontrado.</OrderInfo>
        )}
      </OrderList>
    </Container>
  );
}

export default PagCupom;
