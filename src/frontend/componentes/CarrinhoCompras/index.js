import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DadosLivro from "../DadosLivro";
import BotaoVermelho from "../Botões/BotaoVermelho"
import BotaoSimples from "../Botões/BotaoSimples"
import { useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext";
import { buscarEstoquePorId, diminuirQuantidadeLivro, acrescentarQuantidadeLivro } from "../../serviços/estoque";

const BotaoQuantidade = styled.button`
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background-color: #095F54;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin: 0 8px;

  &:hover {
    background-color: #0b7d6a;
  }
`;

const ControleQuantidade = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ContadorQuantidade = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin: 0 8px;
  width: 30px;
  text-align: center;
  color: #333;
  font-family: "Bookochi";
`;

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
  margin-top: 10px;
  
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
  const { showToast } = useToast();


useEffect(() => {
  const idClienteLogado = localStorage.getItem("idCliente");

  if (!idClienteLogado) {
    setLivrosSelecionados([]);
    return;
  }

  const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];

  const carrinhoDoCliente = carrinhoSalvo.filter(livro => 
    livro.clienteId === Number(idClienteLogado)
  ).map(livro => ({
    ...livro,
    quantidade: livro.quantidade || 1
  }));

  setLivrosSelecionados(carrinhoDoCliente);
}, []);


  useEffect(() => {
    const novoSubTotal = livrosSelecionados.reduce((acc, livro) => {
      const preco = livro.precoVenda ? parseFloat(livro.precoVenda) : 0;
      const qtd = livro.quantidade || 1;
      return acc + preco * qtd;
    }, 0);

    setSubTotal(novoSubTotal);
    setTotal(novoSubTotal + frete);
  }, [livrosSelecionados, frete]);

  const opcoesFrete = [
    { label: "Padrão (5-7 dias) - R$7,94", valor: 7.94 },
    { label: "Expresso (2-3 dias) - R$14,99", valor: 14.99 },
    { label: "Entrega no mesmo dia - R$29,99", valor: 29.99 }
  ];

  const removerDoCarrinho = async (index) => {
    const livro = livrosSelecionados[index]; 

    try {
      await acrescentarQuantidadeLivro(livro.id);
      const novoCarrinho = livrosSelecionados.filter((_, i) => i !== index);
      setLivrosSelecionados(novoCarrinho);
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      showToast('Livro removido do carrinho!', 'warning');
    } catch (error) {
      console.error("Erro ao acrescentar quantidade no estoque:", error);
      showToast('Erro ao remover livro do carrinho!', 'error');
    }
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

  const aumentarQuantidade = async (index) => {
    const novosLivros = [...livrosSelecionados];
    const estoque = await buscarEstoquePorId(novosLivros[index].id);

    if (estoque.data.quantidade === 0) {
      showToast('Este livro não há mais unidades disponíveis em estoque :(', 'warning');
    } else {
      await diminuirQuantidadeLivro(novosLivros[index].id);
      novosLivros[index].quantidade += 1;
      setLivrosSelecionados(novosLivros);
      localStorage.setItem('carrinho', JSON.stringify(novosLivros));
    }
  };

  const diminuirQuantidade = async (index) => {
    const novosLivros = [...livrosSelecionados];
    if (novosLivros[index].quantidade > 1) {
      await acrescentarQuantidadeLivro(novosLivros[index].id);
      novosLivros[index].quantidade -= 1;
      setLivrosSelecionados(novosLivros);
      localStorage.setItem('carrinho', JSON.stringify(novosLivros));
    } else {
      showToast("Quantidade mínima é 1!", "warning");
    }
  };


  return (
    <ContainerCarrinho>
      <Titulo>CARRINHO DE COMPRAS</Titulo>

      <LivrosContainer>
        {livrosSelecionados.map((livro, index) => (
          <LivroItem key={index}>
            <DadosLivro livros={[livro]} />

            <ControleQuantidade>
              <BotaoQuantidade id="carrinho-diminuiQuantidade" onClick={() => diminuirQuantidade(index)}>-</BotaoQuantidade>
              <ContadorQuantidade>{livro.quantidade}</ContadorQuantidade>
              <BotaoQuantidade id="carrinho-aumentarQuantidade" onClick={() => aumentarQuantidade(index)}>+</BotaoQuantidade>
            </ControleQuantidade>

            {livro.quantidade === 1 && (
              <BotaoSimples id="carrinho-remover" onClick={() => removerDoCarrinho(index)}>
                Remover do Carrinho
              </BotaoSimples>
            )}
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
        <BotaoVermelho id="carrinho-irEntrega" onClick={handleFinalizarPedido}>Ir para entrega</BotaoVermelho>

      </ResumoPedido>
    </ContainerCarrinho>
  );
}

export default CarrinhoCompras;