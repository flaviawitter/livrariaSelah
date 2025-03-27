import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Opcao = styled.li`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    widht: 100%;
    padding: 0 15px;
    cursor: pointer;
    min-width: 80px;
    color: #C7511B;
    font-family: 'Bookochi';
    letter-spacing: 0.22em;
`

const Opcoes = styled.ul`
    display: flex;
`

const textoOpcoes = [
    { nome: "Clientes", rota: "/clientesadm", id: "header-opcaoCliente" }, 
    { nome: "Pedidos", rota: "/pedidosadm", id: "header-opcaoPedidos" },
    { nome: "Relatórios", rota: "/relatorio", id: "header-opcaoRelatorios" }, 
    { nome: "Sair", rota: "/login", id: "header-opcaoSair" }
  ];

function OpcoesHeaderAdm() {
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

export default OpcoesHeaderAdm