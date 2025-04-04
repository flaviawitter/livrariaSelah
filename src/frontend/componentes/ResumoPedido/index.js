import React, { useState } from "react";
import styled from "styled-components";
import DadosLivro from "../DadosLivro";
import BotaoVermelho from "../Botões/BotaoVermelho";
import dadosLivrosCarrinho from "./dadosLivrosCarrinho";
import { useNavigate } from "react-router-dom";

const ContainerResumo = styled.div`
    width: 90%;
    color: #333;
    margin: 25px auto;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
`;

const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
`;

const Secao = styled.div`
    margin-top: 20px;
    padding: 15px;
    border-top: 1px solid #ccc;
`;

const LivroItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
`;

const LivrosContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
    margin-top: 20px;
`;

const OpcoesLista = styled.div`
    display: flex;
    justify-content: space-between;
`;

const OpcaoItem = styled.div`
    flex: 1;
    padding: 10px;
`;

const TextoResumo = styled.p`
    font-size: 16px;
    color: #333;
    margin: 5px 0;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
`;

const ResumoPedido = () => {
    const livrosSelecionados = dadosLivrosCarrinho.slice();
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
    const [cartaoSelecionado, setCartaoSelecionado] = useState(null);

    const enderecos = [
        { id: 1, cep: "99999-999", rua: "Nome da Rua" },
        { id: 2, cep: "99999-999", rua: "Nome da Rua" },
        { id: 3, cep: "99999-999", rua: "Nome da Rua" }
    ];

    const cartoes = [
        { id: 1, apelido: "Cartão 1", final: "9999", validade: "99/99" },
        { id: 2, apelido: "Cartão 2", final: "9999", validade: "99/99" }
    ];

    const navigate = useNavigate();

    const handleFinalizarPedido = () => {
        navigate("/pedidos");
    };

    return (
        <ContainerResumo>
            <Titulo>RESUMO DO PEDIDO</Titulo>
            
            <Secao>
                <h3>Conteúdo do Carrinho</h3>
                <LivrosContainer>
                    {livrosSelecionados.map((livro, index) => (
                        <LivroItem key={index}>
                            <DadosLivro livros={[livro]} />
                        </LivroItem>
                    ))}
                </LivrosContainer>
            </Secao>

            <Secao>
                <h3>Selecione um endereço:</h3>
                <OpcoesLista>
                    {enderecos.map((endereco) => (
                        <OpcaoItem key={endereco.id}>
                            <input 
                                type="radio" 
                                name="endereco" 
                                value={endereco.id} 
                                onChange={() => setEnderecoSelecionado(endereco.id)}
                            />
                            {` Endereço ${endereco.id}, CEP: ${endereco.cep}, Rua: ${endereco.rua}`}
                            
                            {` Endereço ${endereco.id}, CEP: ${endereco.cep}, Rua: ${endereco.rua}`}
                        </OpcaoItem>
                    ))}
                </OpcoesLista>
            </Secao>

            <Secao>
                <h3>Selecione um Cartão:</h3>
                <OpcoesLista>
                    {cartoes.map((cartao) => (
                        <OpcaoItem key={cartao.id}>
                            <input 
                                type="radio" 
                                name="cartao" 
                                value={cartao.id} 
                                onChange={() => setCartaoSelecionado(cartao.id)}
                            />
                            {` ${cartao.apelido}, Final: ${cartao.final}, Validade: ${cartao.validade}`}
                        </OpcaoItem>
                    ))}
                </OpcoesLista>
                <Secao>
                    <TextoResumo>Sub-total: R$</TextoResumo>
                    <TextoResumo>Frete: R$</TextoResumo>
                    <TextoResumo><strong>Total: R$</strong></TextoResumo>
                </Secao>
            </Secao>

            <BotaoVermelho onClick={handleFinalizarPedido}>Finalizar Pedido</BotaoVermelho>
        </ContainerResumo>
    );
};

export default ResumoPedido;
