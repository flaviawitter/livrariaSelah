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

const textoOpcoes = [
    { nome: "Início", rota: "/", id: "header-opcaoInicio" }, 
    { nome: "Favoritos", rota: "/favoritos", id: "header-opcaoFavoritos" },
    { nome: "Pedidos", rota: "/pedidoscliente", id: "header-opcaoPedidos" },
    { nome: "Cupons", rota: "/cuponscliente", id: "header-opcaoCupons" }
  ];

function OpcoesHeader() {
    return (
    <Opcoes>
        {textoOpcoes.map((opcao, index) => (
            <Link key={index} to={opcao.rota} style={{ textDecoration: "none" }}>
            <Opcao>{opcao.nome}</Opcao>
            </Link>
      ))}
    </Opcoes>
    )
}

export default OpcoesHeader