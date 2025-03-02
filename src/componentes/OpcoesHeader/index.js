import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Opcao = styled.li`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    widht: 100%
    padding: 0 15px;
    cursor: pointer;
    min-width: 80px;
    color: #C7511B;
`

const Opcoes = styled.ul`
    display: flex;
`

const textoOpcoes = ['Início', 'Favoritos']

function OpcoesHeader() {
    return (
        <Opcoes>
            { textoOpcoes.map( (texto) => (
                <Opcao><p>{texto}</p></Opcao>
            ) ) }
      </Opcoes>
    )
}

export default OpcoesHeader