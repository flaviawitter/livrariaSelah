import Input from '../Inputs/Input'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../Logo'
import BotaoVerde from '../Botões/BotaoVerde'
import BotaoAmarelo from '../Botões/BotaoAmarelo'
import { criarCadastro } from '../../serviços/cliente';
import React, { useContext } from "react";
import { AuthContext } from "../../componentes/Context/AuthContext";
import InputMask from 'react-input-mask';
import { useForm, Controller } from "react-hook-form";


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
    width: 60%;
    color: #FDC818;
`
const RightContainer = styled.section`
    background-color: #FDC818;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    height: 100vh;
    width: 40%;
    color: #095F54;
`
const Titulo = styled.h2`
    font-size: 30px;
    text-align: center;
    fontFamily: "Bookochi";
    letter-spacing: 0.22em;
    margin-bottom: 15px;
`
const Opcao = styled.div`
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
const StyledInputMask = styled(InputMask)`
    background-color: #CACACA;
    backdrop-filter: blur(10px);
    border: 1px solid #004A33;
    padding: 10px;
    border-radius: 25px;
    width: 100%;
    height: 15px;
    color: #004A33;
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    font-family: "Bookochi";

    
    &::placeholder {
        color: #004A33;
        font-size: 16px;
    }
    
    &:focus {
        border: 2px solid #004A33; 
        box-shadow: 0px 0px 5px #00FF00; 
    }
`;

const textoPlaceHolders = ['E-mail', 'Senha']

function LoginPage({ control }) {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
    } = useForm(
        {
            mode: "onBlur"
        }
    )
    const { login } = useContext(AuthContext);

    const onSubmit = async (data) => {
        const cliente = {
            email: data.email,
            senha: data.senha,
            nome: data.nome || "Nome do usuário",
            cpf: data.cpf,
            genero: data.genero || "Selecione",
            dataNascimento: data.dataNascimento ? new Date(data.dataNascimento).toISOString().split("T")[0] : null,
            ranking: 0,
        };

        try {
            const newCliente = await criarCadastro(cliente);
            console.log(newCliente)
            console.log(newCliente.id)
            if (newCliente && newCliente.id) {
                const idCliente = newCliente.id;
                login(cliente, idCliente);
                navigate("/dados")
            } else {
                console.error("Erro ao criar cliente front: resposta inesperada do servidor");
            }
        } catch (error) {
            console.error("Erro ao criar cliente front:", error);
        }
    };

    const formMethods = useForm();  // Adiciona useForm caso control não seja passado
    const effectiveControl = control || formMethods.control;
    const effectiveRegister = register || formMethods.register;

    return (
        <PageContainer>
            <LeftContainer>
                <Logo />
                <Titulo >CADASTRE-SE</Titulo>
                <InputContainer>
                    <div style={{ width: "48%" }}>
                        <Controller
                            name="cpf"
                            control={effectiveControl}
                            render={({ field }) => (
                                <StyledInputMask
                                    {...field}
                                    mask="999.999.999-99"
                                    id="cliente-cpf"
                                    placeholder="CPF"
                                    {...effectiveRegister("cpf")}
                                />
                            )}
                        />
                    </div>

                    <div style={{ width: '48%', marginTop: '10px' }}>
                        <Input placeholder="E-mail" {...register('email')} />
                    </div>

                    <div style={{ width: '48%', marginTop: '10px' }}>
                        <Input placeholder="Senha" type='password'{...register('senha')} />
                    </div>

                    <BotaoAmarelo
                        id="cadastrar-botaoEntrar"
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Entrar
                    </BotaoAmarelo>
                </InputContainer>

            </LeftContainer>
            <RightContainer>
                <Titulo style={{ fontsize: "40px" }}>BEM VINDO</Titulo>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <BotaoVerde id="cadastrar-botaoLogin" type="button">
                        Faça Login
                    </BotaoVerde>
                </Link>
            </RightContainer>
        </PageContainer>
    )
}

export default LoginPage;
