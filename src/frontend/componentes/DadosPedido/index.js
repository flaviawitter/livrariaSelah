import React from "react";
import styled from "styled-components";
import pedidos from "./pedidos"; 
import InputFiltro from "../Inputs/InputFiltro";

const ContainerPrincipal = styled.section`
  width: 80%;
  margin: auto;
  font-family: "Arial", sans-serif;
`;
const Titulo = styled.h2`
  font-size: 32px;
  font-weight: bold;
  fontFamily: "Bookochi";
  letterSpacing: "0.22em";
  color: #2b6149;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;
const PedidoContainer = styled.div`
  border-top: 1px solid #ccc;
  padding: 15px 0;
`;
const NumPedido = styled.p`
  font-size: 18px;
  font-weight: bold;
  fontFamily: "Bookochi";
  letterSpacing: "0.22em";
  margin: 0;
`;
const InfoPedido = styled.p`
  font-size: 16px;
  color: #333;
  fontFamily: "Bookochi";
  letterSpacing: "0.22em";
  margin: 5px 0;
`;
const ItensPedido = styled.ul`
  list-style: none;
  padding: 0;
  margin: 10px 0;
`;
const ItemLivro = styled.li`
  font-size: 16px;
  fontFamily: "Bookochi";
  letterSpacing: "0.22em";
  color: #666;
`;
const TrocaPedido = styled.a`
  font-size: 12px;
  fontFamily: "Bookochi";
  letterSpacing: "0.22em";
  color: #2b6149;
  text-decoration: none;
  font-weight: bold;
  display: block;
  margin-top: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;
const TrocaItem = styled.a`
  font-size: 12px;
  fontFamily: "Bookochi";
  letterSpacing: "0.22em";
  color: #2b6149;
  text-decoration: none;
  font-weight: bold;
  display: block;
  margin-top: 5px;
  margin-bottom: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const DadosPedido = () => {
  return (
    <ContainerPrincipal>
      <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em"  }}>Meus Pedidos</Titulo>
      <InputFiltro />
      {pedidos.map((pedido, index) => (
        <PedidoContainer key={index}>
          <NumPedido>Pedido #{pedido.numPedido}</NumPedido>
          <InfoPedido>Data do pedido: {pedido.dataPedido}</InfoPedido>
          <InfoPedido>Status: {pedido.status}</InfoPedido>

          {pedido.status === "Entregue" && (
            <TrocaPedido href="#">Solicitar troca do pedido</TrocaPedido>
          )}

      <ItensPedido>
        {pedido.qntLivro1 && (
          <ItemLivro>
            {pedido.qntLivro1}x {pedido.livro1}
            {pedido.status === "Entregue" && <TrocaItem href="#">Solicitar troca de item</TrocaItem>}
          </ItemLivro>
        )}
        
        {pedido.qntLivro2 && (
          <ItemLivro>
            {pedido.qntLivro2}x {pedido.livro2}
            {pedido.status === "Entregue" && <TrocaItem href="#">Solicitar troca de item</TrocaItem>}
          </ItemLivro>
        )}
        
        {pedido.qntLivro3 && (
          <ItemLivro>
            {pedido.qntLivro3}x {pedido.livro3}
            {pedido.status === "Entregue" && <TrocaItem href="#">Solicitar troca de item</TrocaItem>}
          </ItemLivro>
        )}
      </ItensPedido>
              </PedidoContainer>
            ))}
    </ContainerPrincipal>
  );
};
export default DadosPedido;