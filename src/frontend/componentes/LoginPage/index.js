import Input from '../Input' 
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../Logo'
import BotaoVerde from '../BotaoVerde'
import BotaoAmarelo from '../BotaoAmarelo'

const PageContainer = styled.section`
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    max-height: 100%;
    margin: 0px;
    display: flex;
`
const LeftContainer = styled.section`
    background-color: #095F54;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    height: 100vh;
    width: 40%;
    color: #FDC818;
`
const RightContainer = styled.section`
    background-color: #FDC818;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    height: 100vh;
    width: 60%;
    color: #095F54;
`
const Titulo = styled.h2`
    font-size: 30px;
    text-align: center;
    fontFamily: "Bookochi";
    letter-spacing: 0.22em;
    margin-bottom: 15px;
`
const Opcao = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    padding: 0;
    list-style-type: none;
    margin-top: 20px;
`
const InputContainer = styled.li`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
`;
const TextoPequeno = styled.p`
    font-size: 14px;
    color: #095F54;
    margin-top: 5px;
    text-align: center;
`;

const textoPlaceHolders = ['Usuário', 'Senha']

function LoginPage() {
    return (
        <PageContainer>
            <LeftContainer>
                <Titulo style={{fontsize: "40px"}}>BEM VINDO</Titulo> 
                <Link to="/cadastrar" style={{ textDecoration: 'none' }}>
                    <BotaoAmarelo id="login-botaoCadastrar" type="button">
                        Cadastre-se
                    </BotaoAmarelo>
                </Link>   
            </LeftContainer>
            <RightContainer>
                <Logo />
                <Titulo >FAÇA LOGIN</Titulo>
                <InputContainer>
                    {textoPlaceHolders.map((placeholder, index) => (
                        <li key={index} style={{ width: '48%' }}>
                            <Input placeholder={placeholder} />
                        </li>
                    ))}
                    <TextoPequeno>Esqueci a senha</TextoPequeno>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <BotaoVerde id="login-botaoEntrar" type="button">
                            Entrar
                        </BotaoVerde>
                    </Link>
                </InputContainer>
            </RightContainer>
        </PageContainer>
    )
}

export default LoginPage;
