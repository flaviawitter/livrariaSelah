import styled from 'styled-components'
import DadosLivro from './dadosLivro'
import BotaoCinza from '../Botões/BotaoCinza'
import BotaoVermelho from '../Botões/BotaoVermelho';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { useParams } from "react-router-dom";
import { buscarLivro, buscarLivroPorId } from "../../serviços/livros";
import { useEffect, useState } from "react";
import dadosFavoritos from "../Favoritos/dadosFavoritos";
import { useToast } from "../Context/ToastContext";
import { acrescentarQuantidadeLivro, buscarEstoquePorId, diminuirQuantidadeLivro } from '../../serviços/estoque';
import { adicionarItemCarrinho, excluirItemCarrinho } from '../../serviços/carrinho';


const ContainerPrincipal = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 100%;
    margin: 25px;
    margin-bottom: 20px;
`
const ContainerLivro = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: auto;
  width: 100%;
  margin-bottom: 20px;
`;
const ImagemLivro = styled.img`
  width: 20%;
  height: auto;
  border-radius: 5px;
`;
const InfoLivro = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: auto;
`;
const TextoSinopse = styled.p`
  color: #333;
  font-family: "Bookochi";
  letter-spacing: 0.22em;
  font-size: 14px;
  line-height: 1.5;
  width: 75%; 
  text-align: justify;
  margin-left: 25px;
`;
const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: auto;
  gap-min: 15px;
  width: 25%; 
  margin-top: 0; 
  margin-right: 15px;
`;
const TipoLivro = styled.div`
border: 2px solid #004A33;
color: #004A33;
padding: 10px;
border-radius: 20px;
font-size: 18px;
font-family: "Bookochi";
letter-spacing: 0.22em;
text-align: center;
width: fit-content;
`
const AvaliacaoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: "Bookochi";
  letter-spacing: 0.22em;
  color: #000;
  margin: 20px;
`

const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} color="#ff9900" />);
    } else if (i - 0.5 === rating) {
      stars.push(<FaStarHalfAlt key={i} color="#ff9900" />);
    } else {
      stars.push(<FaRegStar key={i} color="#ff9900" />);
    }
  }
  return stars;
};


function PaginaLivro() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const { showToast } = useToast();

  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  useEffect(() => {
    async function carregarLivro() {
      try {
        const livroEncontrado = await buscarLivroPorId(id);
        console.log("Livro encontrado:", livroEncontrado);
        setLivro(livroEncontrado);
      } catch (erro) {
        console.error("Erro ao buscar livro:", erro);
      }
    }
    carregarLivro();
  }, [id]);


  if (!livro) return <p>Carregando...</p>;

  const imagensLivros = {};
  dadosFavoritos.forEach((livro) => {
    imagensLivros[livro.titulo] = livro.src;
  });

  const adicionarAoCarrinho = async () => {
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    const idCliente = localStorage.getItem("idCliente"); // Pegando id do cliente logado



    if (!idCliente) {
      showToast('É necessário estar logado para adicionar ao carrinho.', 'alert');
      return;
    }

    try {
      const estoque = await buscarEstoquePorId(livro.id);

      if (estoque.data.quantidade === 0) {
        showToast('Este livro não consta em estoque :(', 'warning', 'livro-sem-estoque');
      } else {
        const body = {
          clienteId: Number(idCliente),
          livroId: Number(livro.id),
          quantidade: 1,
          precoUnidade: livro.precoVenda
        };
        const adicionandoCarrinho = await adicionarItemCarrinho(body);
        await diminuirQuantidadeLivro(livro.id);
        
        console.log(adicionandoCarrinho);

        if (adicionandoCarrinho && adicionandoCarrinho.id) {
          const livroComClienteId = { ...livro, clienteId: Number(idCliente), quantidade: 1 };
          carrinhoAtual.push(livroComClienteId);
          localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
          showToast('Livro adicionado ao carrinho!', 'success');
          console.log("Carrinho atualizado:", carrinhoAtual);

          // Limpeza após 3 minutos
          clearTimeout(window.carrinhoTimeout);

          window.carrinhoTimeout = setTimeout(async () => {
            localStorage.removeItem('carrinho');
            await excluirItemCarrinho(idCliente);
            showToast('O carrinho foi limpo após 3 minutos de inatividade.', 'alert', 'carrinho-vazio');
          }, 300000);
        } else {
          const erro = await adicionandoCarrinho.json();
          showToast(erro.message, 'error');
        }
      }
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      showToast('Erro ao adicionar ao carrinho!', 'error');
    }
  };

  return (
    <ContainerPrincipal>
      <h2 style={{ fontFamily: "Bookochi", letterSpacing: "0.22em", color: "#095F54", fontSize: "26px", textAlign: "left" }}>{livro.titulo}</h2>
      <h3 style={{ fontFamily: "Bookochi", letterSpacing: "0.22em", color: "#555", fontSize: "16px", textAlign: "left" }}>por {livro.autores?.nome || "Autor desconhecido"}</h3>

      <ContainerLivro>
        <ImagemLivro src={imagensLivros[livro.titulo] || ''} alt={livro.titulo} style={{ width: "20%", height: "auto" }} />

        <InfoLivro>
          <TextoSinopse>{livro.sinopse}</TextoSinopse>
          <ContainerBotoes>
            {/*<AvaliacaoContainer>
                    {renderStars(livro.avaliacao)} <span style={{ marginLeft: "4px" }}>{livro.avaliacao}</span>
                </AvaliacaoContainer>
                //<TipoLivro>{livro.tipoCapa} <br /> <strong>{livro.preco}</strong></TipoLivro>*/}
            <BotaoVermelho id="livro-adicionar" onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</BotaoVermelho>
            {/*<BotaoCinza>Adicionar aos Favoritos</BotaoCinza>*/}
          </ContainerBotoes>
        </InfoLivro>
      </ContainerLivro>
      <h3 style={{ fontFamily: "Bookochi", letterSpacing: "0.22em", color: "#095F54", fontSize: "22px", textAlign: "left", marginTop: "50px" }}>
        Detalhes do Produto
      </h3>
      <p style={{ fontFamily: "Bookochi", letterSpacing: "0.22em", textAlign: "left", fontSize: "16px", color: "#555", lineHeight: "1.5" }}>
        <strong>Editora:</strong> {livro.editora}<br />
        <strong>Edição:</strong> {livro.edicao} ({livro.ano})<br />
        <strong>Idioma:</strong> Português<br />
        <strong>ISBN:</strong> {livro.isbn} <br />
        <strong>Páginas:</strong> {livro.paginas}<br />
        <strong>Peso:</strong> {livro.peso}g<br />
        <strong>Dimensões:</strong> {livro.altura}cm x {livro.largura}cm x {livro.profundidade}cm
      </p>
    </ContainerPrincipal>

  );

}

export default PaginaLivro;