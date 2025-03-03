import React, { useState } from "react";
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
`;
const TituloFrete = styled.h2`
    color: #095F54;
    font-size: 16px;
    text-align: left;
    width: 100%;
`;
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

const OpcoesFrete = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 10px 0;
    align-items: flex-start; 
`;

const OpcaoFrete = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 5px;
    font-size: 16px;
    color: #333;
    font-family: "Bookochi";
    letter-spacing: 0.22em;

    input {
        margin-right: 8px;
    }
`;

const CarrinhoCompras = () => {
    const livrosSelecionados = dadosLivrosCarrinho.slice();
    
    const subTotal = livrosSelecionados.reduce((acc, livro) => acc + parseFloat(livro.preco.replace("R$", "").replace(",", ".")), 0);
    const opcoesFrete = [
        { label: "Padrão (5-7 dias) - R$7,94", valor: 7.94 },
        { label: "Expresso (2-3 dias) - R$14,99", valor: 14.99 },
        { label: "Entrega no mesmo dia - R$29,99", valor: 29.99 }
    ];
    const [frete, setFrete] = useState(opcoesFrete[0].valor);
    const total = subTotal + frete;

    return (
        <ContainerCarrinho>
            <Titulo>CARRINHO DE COMPRAS</Titulo>
            <DadosLivro livros={livrosSelecionados} />
            <ResumoPedido>
               
                <OpcoesFrete>
                <TituloFrete>OPÇÕES DE FRETE</TituloFrete>
                    {opcoesFrete.map((opcao, index) => (
                        <OpcaoFrete key={index}>
                            <input
                                type="radio"
                                name="frete"
                                value={opcao.valor}
                                checked={frete === opcao.valor}
                                onChange={() => setFrete(opcao.valor)}
                            />
                            {opcao.label}
                        </OpcaoFrete>
                    ))}
                </OpcoesFrete>
                <TextoResumo>Sub-total: R${subTotal.toFixed(2)}</TextoResumo>
                <TextoResumo>Frete: R${frete.toFixed(2)}</TextoResumo>
                <TextoResumo><strong>Total: R${total.toFixed(2)}</strong></TextoResumo>
                <BotaoVermelho>Ir para entrega</BotaoVermelho>
            </ResumoPedido>
        </ContainerCarrinho>
    );
};

export default CarrinhoCompras;
