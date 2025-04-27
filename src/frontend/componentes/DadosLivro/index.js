import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dadosFavoritos from "../Favoritos/dadosFavoritos";

const ContainerPrincipal = styled.section`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  font-family: Bookochi, sans-serif;
  width: 100%;
`;

const ContainerLivro = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 300px;
  padding: 10px;
  cursor: pointer;
`;

const ContainerTexto = styled.div`
  text-align: left;
`;

const Titulo = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin: 0;
`;

const Autor = styled.p`
  font-size: 14px;
  color: #999;
  margin: 4px 0;
`;

const Preco = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 4px 0;
`;

{/*const AvaliacaoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #000;
`;*/}

const imagensLivros = {};
dadosFavoritos.forEach((livro) => {
  imagensLivros[livro.titulo] = livro.src;
});

const DadosLivro = ({ livros }) => {
  const navigate = useNavigate();

  const handleLivroClick = (livro) => {
    navigate(`/livro/${livro.id}`);
  };

  {/*const renderStars = (rating) => {
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
  };*/}

  return (
    <ContainerPrincipal>
      {Array.isArray(livros) && livros.length > 0 ? (
        livros.map((livro, index) => (
          <ContainerLivro key={index} onClick={() => handleLivroClick(livro)}>
            <img src={imagensLivros[livro.titulo] || ''} alt={livro.titulo} style={{ width: "100px", height: "auto" }} />
            <ContainerTexto>
              <Titulo>{livro.titulo}</Titulo>
              <Autor>por {livro.autores?.nome || "Autor desconhecido"}</Autor>
              <Preco>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(livro.precoVenda)}</Preco>
              {/*<AvaliacaoContainer>
                {renderStars(livro.avaliacao)} <span style={{ marginLeft: "4px" }}>{livro.avaliacao}</span>
              </AvaliacaoContainer>*/}
            </ContainerTexto>
          </ContainerLivro>
        ))
      ) : (
        <p>Nenhum livro encontrado.</p>
      )}
    </ContainerPrincipal>
  );
};

export default DadosLivro;
