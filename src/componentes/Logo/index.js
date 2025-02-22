import logo from '../../imagens/logo.png'
import styled from 'styled-components'

const LogoImage = styled.img`
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 20px;
    width: 200px;
    height: 40px
`

function Logo() {
    return (
            <LogoImage
                src={logo}
                alt='logo' 
            />
    )
}

export default Logo