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

const icones = [carrinho, perfil]

function IconesHeader() {
    return (
        <Icones>
            { icones.map( (icone) => (
              <Icone><img src={icone}></img></Icone>
            )) }
        </Icones>
    )
}

export default IconesHeader