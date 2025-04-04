import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DadosLivro from "../DadosLivro";
import BotaoVermelho from "../Botões/BotaoVermelho"
import dadosLivrosCarrinho from "./dadosLivrosCarrinho";
import { useNavigate } from "react-router-dom";

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
const RemoverCarrinho = styled.a`
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
`
const LivroItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 15px;
  position: relative;

  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`
const LivrosContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os livros quebrem para a linha de baixo */
  
  gap: 20px; /* Espaço entre os livros */
  justify-content: flex-start; /* Alinhamento à esquerda */
  margin-top: 20px;
`;

const MensagemErro = styled.p`
    color: #000;
    font-size: 16px;
    text-align: left;
    margin-top: 20px;
    font-family: Bookochi;
`;

const CarrinhoCompras = () => {
  const [livrosSelecionados, setLivrosSelecionados] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [frete, setFrete] = useState(7.94);
  const [total, setTotal] = useState(0);


  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    setLivrosSelecionados(carrinhoSalvo);
  }, []);

  useEffect(() => {
    const novoSubTotal = livrosSelecionados.reduce((acc, livro) => {
      const preco = livro.precoVenda ? parseFloat(livro.precoVenda) : 0;
      return acc + preco;
    }, 0);

    setSubTotal(novoSubTotal);
    setTotal(novoSubTotal + frete);
  }, [livrosSelecionados, frete]);

  const opcoesFrete = [
    { label: "Padrão (5-7 dias) - R$7,94", valor: 7.94 },
    { label: "Expresso (2-3 dias) - R$14,99", valor: 14.99 },
    { label: "Entrega no mesmo dia - R$29,99", valor: 29.99 }
  ];

  const removerDoCarrinho = (index) => {
    const novoCarrinho = livrosSelecionados.filter((_, i) => i !== index);
    setLivrosSelecionados(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  const navigate = useNavigate();
  const [erroCarrinho, setErroCarrinho] = useState(false);

  const handleFinalizarPedido = () => {
    if (livrosSelecionados.length > 0) {
      setErroCarrinho(false);
      navigate("/resumo", {
        state: {
          livros: livrosSelecionados,
          subtotal: subTotal,
          frete: frete,
          total: total
        }
      });
    } else {
      setErroCarrinho(true);
    }
  };



  return (
    <ContainerCarrinho>
      <Titulo>CARRINHO DE COMPRAS</Titulo>
      {erroCarrinho && (
          <MensagemErro>Não é possível ir para entrega, o carrinho está vazio!</MensagemErro>
        )}
      <LivrosContainer>
        {livrosSelecionados.map((livro, index) => (
          <LivroItem key={index}>
            <DadosLivro livros={[livro]} />
            <RemoverCarrinho href="#" onClick={() => removerDoCarrinho(index)}>
              Remover do Carrinho
            </RemoverCarrinho>
          </LivroItem>
        ))}
      </LivrosContainer>

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
        <BotaoVermelho onClick={handleFinalizarPedido}>Ir para entrega</BotaoVermelho>
        
      </ResumoPedido>
    </ContainerCarrinho>
  );
}

export default CarrinhoCompras;