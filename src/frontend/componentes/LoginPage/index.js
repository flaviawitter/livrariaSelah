import { useState } from "react";
import Input from "../Inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Logo";
import BotaoVerde from "../Botões/BotaoVerde";
import BotaoAmarelo from "../Botões/BotaoAmarelo";
import { verificarLogin } from "../../serviços/login";
import { useAuth } from "../Context/AuthContext"
import { useContext } from "react";


const PageContainer = styled.section`
    height: 100vh;
    width: 100vw;
    max-width: 100%;
    max-height: 100%;
    margin: 0px;
    display: flex;
`;

const LeftContainer = styled.section`
    background-color: #095F54;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    height: 100vh;
    width: 40%;
    color: #FDC818;
`;

const RightContainer = styled.section`
    background-color: #FDC818;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    height: 100vh;
    width: 60%;
    color: #095F54;
`;

const Titulo = styled.h2`
    font-size: 30px;
    text-align: center;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
    margin-bottom: 15px;
`;

const InputContainer = styled.div`
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

    const textoPlaceHolders = ["Usuário", "Senha"];

    function LoginPage() {
        const [email, setEmail] = useState("");
        const [senha, setSenha] = useState("");
        const [erro, setErro] = useState("");
        const { login } =  useAuth();
        const navigate = useNavigate();

        async function handleLogin() {
            try {
                const response = await verificarLogin(email, senha);
        
                if (response.mensagem === "Login bem-sucedido") {
                    const userData = response.usuario; // Pegamos os dados completos do usuário do backend
                    if (userData.statusAtivo === true) {
                    localStorage.setItem("usuarioLogado", "true");
                    localStorage.setItem("idCliente", userData.id);
                    login(userData, userData.id); // Salvamos os dados completos no contexto
                    navigate("/");
                    }
                    else {
                        setErro("Usuário inativo. Por favor, entre em contato com o suporte.");
                    }
                }
            } catch (error) {
                setErro("Usuário ou senha inválidos");
            }
        }      
        

        return (
            <PageContainer>
                <LeftContainer>
                    <Titulo style={{ fontsize: "40px" }}>BEM VINDO</Titulo>
                    <Link to="/cadastrar" style={{ textDecoration: "none" }}>
                        <BotaoAmarelo id="login-botaoCadastrar" type="button">
                            Cadastre-se
                        </BotaoAmarelo>
                    </Link>
                </LeftContainer>
                <RightContainer>
                    <Logo />
                    <Titulo>FAÇA LOGIN</Titulo>
                    <InputContainer>
                        <div style={{ width: "48%" }}>
                            <Input 
                                placeholder="E-mail" 
                                id="login-email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{ width: "48%" }}>
                            <Input 
                                placeholder="Senha" 
                                id="login-senha"
                                type="password" 
                                value={senha} 
                                onChange={(e) => setSenha(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()} // Chama handleLogin ao pressionar Enter
                            />
                        </div>
                        {erro && <TextoPequeno style={{ color: "red" }}>{erro}</TextoPequeno>}
                        {/*<TextoPequeno>Esqueci a senha</TextoPequeno>*/}
                        <BotaoVerde id="login-botaoEntrar" type="button" onClick={handleLogin}>
                            Entrar
                        </BotaoVerde>
                        <Link id="login-adm" to="/adm" style={{ textDecoration: "none" }}>
                            <TextoPequeno>Entrar como administrador</TextoPequeno>
                        </Link>
                    </InputContainer>
                </RightContainer>
            </PageContainer>
        );
    }

    export default LoginPage;