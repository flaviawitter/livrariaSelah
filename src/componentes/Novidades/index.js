import styled from 'styled-components'
import dadosNovidade from './dadosNovidades'
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

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    p {
        width: 200px;
    }

    img {
        width: 100px;
    }

    &:hover {
        border: 1px solid white;
    }
`

function Novidades() {
    const livros = dadosNovidade; // Corrigindo a atribuição

    return (
        <NovidadesContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em"  }}>NOVIDADES</Titulo>
            <DadosLivro livros={livros} />
        </NovidadesContainer>
    );
}

export default Novidades;