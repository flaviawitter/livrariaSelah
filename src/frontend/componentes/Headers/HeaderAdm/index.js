import LogoAdm from '../../LogoAdm'
import OpcoesHeaderAdm from '../../OpcoesHeaderAdm'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    width: 100%;

`

function HeaderAdm() {
    return (
        <HeaderContainer>
            <LogoAdm/>
            <OpcoesHeaderAdm/>
        </HeaderContainer>
    )
}

export default HeaderAdm