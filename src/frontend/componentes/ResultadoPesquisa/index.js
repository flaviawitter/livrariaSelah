import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import DadosLivro from '../DadosLivro';

const NovidadesContainer = styled.section`
    color: #FFF;
    text-align: center;
    min-height: 470px;
    width: 100%;
    margin: 25px;
`;

const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
    font-family: Bookochi;
    letter-spacing: 0.22em;
`;

const MensagemErro = styled.p`
    color: #095F54;
    font-size: 18px;
    text-align: left;
    margin-top: 20px;
    font-family: Bookochi;
`;

function ResultadoPesquisa() {
    const location = useLocation();
    const { resultado = [], termo = "" } = location.state || {};

    const livrosEncontrados = Array.isArray(resultado) && resultado.length > 0;

    return (
        <NovidadesContainer>
            <Titulo>RESULTADOS DA PESQUISA: {termo}</Titulo>
            {livrosEncontrados ? (
                <DadosLivro livros={resultado} />
            ) : (
                <MensagemErro>Nenhum livro encontrado.</MensagemErro>
            )}
        </NovidadesContainer>
    );
}

export default ResultadoPesquisa;
