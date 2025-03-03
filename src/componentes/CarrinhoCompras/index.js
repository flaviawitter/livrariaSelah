import React from "react";
import styled from "styled-components";
import DadosLivro from "../DadosLivro";
import BotaoVermelho from "../BotaoVermelho";
import dadosLivrosCarrinho from "./dadosLivrosCarrinho";

const ContainerCarrinho = styled.div`
    width: 90%;
    color: #FFF;
    text-align: center;
    height: 470px;
    margin: 25px;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
`;
const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
`
const ResumoPedido = styled.div`
    text-align: right;
    margin-top: 20px;
`;
const TextoResumo = styled.p`
    font-size: 16px;
    color: #333;
    margin: 5px 0;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
`;
const CarrinhoCompras = () => {
    const livrosSelecionados = dadosLivrosCarrinho.slice();
    
    const subTotal = livrosSelecionados.reduce((acc, livro) => acc + parseFloat(livro.preco.replace("R$", "").replace(",", ".")), 0);
    const frete = 7.94;
    const total = subTotal + frete;

    return (
        <ContainerCarrinho>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em"  }}>CARRINHO DE COMPRAS</Titulo>
            <DadosLivro livros={livrosSelecionados} />
            <ResumoPedido>
                <TextoResumo>Sub-total: R${subTotal.toFixed(2)}</TextoResumo>
                <TextoResumo>Frete: R${frete}</TextoResumo>
                <TextoResumo><strong>Total: R${total.toFixed(2)}</strong></TextoResumo>
                <BotaoVermelho>Ir para entrega</BotaoVermelho>
            </ResumoPedido>
        </ContainerCarrinho>
    );
};

export default CarrinhoCompras;
