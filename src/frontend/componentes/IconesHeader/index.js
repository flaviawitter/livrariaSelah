import { Link } from "react-router-dom";
import perfil from '../../imagens/perfil.png'
import carrinho from '../../imagens/carrinho.png'
import styled from 'styled-components'

const Icone = styled.li`
    margin-right: 40px;

    img{
        width: 25px;
        height: 25px;
    }
`
const Icones = styled.ul`
    display: flex;
    align-items: center;
`
const icones = [
  { imagem: carrinho, rota: "/carrinho", id: "header-iconeCarrinho" },
  { imagem: perfil, rota: "/dados", id: "header-iconePerfil" }
];


function IconesHeader() {
    return (
        <Icones>
        {icones.map((icone, index) => (
          <Link key={index} to={icone.rota} style={{ textDecoration: "none" }}>
            <Icone>
              <img src={icone.imagem} alt="" />
            </Icone>
          </Link>
        ))}
      </Icones>
    )
}

export default IconesHeader

