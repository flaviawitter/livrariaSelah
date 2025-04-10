import styled from 'styled-components'
import DadosLivro from './dadosLivro'
import BotaoCinza from '../Botões/BotaoCinza'
import BotaoVermelho from '../Botões/BotaoVermelho';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { useParams } from "react-router-dom";
import { buscarLivro } from "../../serviços/livros"; 
import { useEffect, useState } from "react";
import dadosFavoritos from "../Favoritos/dadosFavoritos";
import { useToast } from "../Context/ToastContext";


const ContainerPrincipal = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 100%;
    margin: 25px;
`
const ContainerLivro = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: auto;
  width: 100%;
  margin-top: 20px;
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
  font-size: 16px;
  line-height: 1.5;
  width: 65%; 
  text-align: justify;
  margin-left: 15px;
`;
const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: auto;
  gap-min: 15px;
  width: 40%; 
  margin-top: 0; 
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
              const livroEncontrado = await buscarLivro(id);
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

  const adicionarAoCarrinho = () => {
    try{
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinhoAtual.push(livro);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    console.log("${livro.titulo} foi adicionado ao carrinho!");
        
    clearTimeout(window.carrinhoTimeout);

    window.carrinhoTimeout = setTimeout(() => {
        localStorage.removeItem('carrinho');
        console.log("O carrinho foi limpo após 3 minutos de inatividade.");
    }, 300000);

  showToast('Livro adicionado ao carrinho!', 'success');
  console.log("carrinho", carrinhoAtual);

} catch (erro) {
  setMensagem('Erro ao adicionar ao carrinho!');
  setTipoMensagem('error');
}

setTimeout(() => setMensagem(''), 3000);
  };

  
    return (
      <ContainerPrincipal>
        <h2 style={{ fontFamily: "Bookochi", letterSpacing: "0.22em", color: "#095F54", fontSize: "26px", textAlign: "left" }}>{livro.titulo}</h2>
        <h3 style={{ fontFamily: "Bookochi", letterSpacing: "0.22em", color: "#555", fontSize: "16px", textAlign: "left" }}>por {livro.autores?.nome || "Autor desconhecido"}</h3>
  
        <ContainerLivro>
          <ImagemLivro  src={imagensLivros[livro.titulo] || ''} alt={livro.titulo} style={{ width: "20%", height: "auto" }} />
  
          <InfoLivro>
            <TextoSinopse>{livro.sinopse}</TextoSinopse>
            <ContainerBotoes>
               {/*<AvaliacaoContainer>
                    {renderStars(livro.avaliacao)} <span style={{ marginLeft: "4px" }}>{livro.avaliacao}</span>
                </AvaliacaoContainer>
                //<TipoLivro>{livro.tipoCapa} <br /> <strong>{livro.preco}</strong></TipoLivro>*/}
                <BotaoVermelho onClick={adicionarAoCarrinho}>Adicionar ao Carrinho</BotaoVermelho>
                <BotaoCinza>Adicionar aos Favoritos</BotaoCinza>
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