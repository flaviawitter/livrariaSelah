import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

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
const TipoCapa = styled.p`
  font-size: 14px;
  color: #666;
  margin: 4px 0;
`;
const Preco = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 4px 0;
`;
const AvaliacaoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #000;
`;

const DadosLivro = ({ livros }) => {
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

  return (
    <ContainerPrincipal>
      {livros.map((livro, index) => (
        <ContainerLivro key={index}>
          <img src={livro.src} alt={livro.titulo} style={{ width: "100px", height: "auto" }} />
          <ContainerTexto>
            <Titulo>{livro.titulo}</Titulo>
            <Autor>por {livro.autor}</Autor>
            <TipoCapa>{livro.tipoCapa}</TipoCapa>
            <Preco>{livro.preco}</Preco>
            <AvaliacaoContainer>
              {renderStars(livro.avaliacao)} <span style={{ marginLeft: "4px" }}>{livro.avaliacao}</span>
            </AvaliacaoContainer>
          </ContainerTexto>
        </ContainerLivro>
      ))}
    </ContainerPrincipal>
  );
};

export default DadosLivro;
