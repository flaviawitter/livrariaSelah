import styled from 'styled-components'
import dadosPesquisa from './dadosPesquisa'
import DadosLivro from '../DadosLivro'

const NovidadesContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: 470px;
    width: 100%;
    margin: 25px;
`
const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
`


function ResultadoPesquisa() {
    const livros = dadosPesquisa; 
    const tituloPesquisado = ['Olhos Vazios'];

    return (
        <NovidadesContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em"  }}>RESULTADOS DA PESQUISA:{tituloPesquisado}</Titulo>
            <DadosLivro livros={livros} />
        </NovidadesContainer>
    );
}

export default ResultadoPesquisa;