import styled from 'styled-components'
import dadosNovidade from './dadosNovidades'
import DadosLivro from '../DadosLivro'
import { listarLivros } from '../../serviços/livros'
import { useState } from 'react'
import { useEffect } from 'react'

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

   const [livro, setLivros] = useState([]); 
    const [carregando, setCarregando] = useState(true); 
  
    useEffect(() => {
      async function carregarLivros() {
        try {
          const resposta = await listarLivros(); 
          console.log(resposta.data);
          setLivros(resposta.data); 
        } catch (erro) {
          console.error("Erro ao buscar livros:", erro);
        } finally {
          setCarregando(false); 
        }
      }
  
      carregarLivros();
    }, []);
    

    return (
        <NovidadesContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em"  }}>NOVIDADES</Titulo>
            <DadosLivro livros={livro} />
        </NovidadesContainer>
    );
}

export default Novidades;