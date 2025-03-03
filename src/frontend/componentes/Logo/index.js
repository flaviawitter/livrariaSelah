import logo from '../../imagens/logo.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const LogoImage = styled.img`
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 20px;
    width: 200px;
    height: 40px
`

function Logo() {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <LogoImage src={logo} alt="Logo" />
        </Link>
    )
}

export default Logo