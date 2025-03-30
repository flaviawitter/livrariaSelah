import Input from '../../Inputs/Input'
import Select from "../../Botões/Select"
import styled from 'styled-components'
import InputMask from 'react-input-mask'

const FormContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 100vw;
    max-width: 100%;
    margin: 15px;
`
const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
    margin-bottom: 5px;
`
const Opcao = styled.div`
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    width: 100%;
    padding: 0 15px;
    cursor: pointer;
    min-width: 80px;
    color: #C7511B;
`
const Opcoes = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    padding: 0;
    list-style-type: none;
    margin-top: 0;
`
const generos = ["Masculino", "Feminino", "Outro"]
const tiposTelefone = ["Celular", "Residencial", "Comercial", "Outro"]

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
    
    &::placeholder {
        color: #004A33;
        font-size: 16px;
    }
    
    &:focus {
        border: 2px solid #004A33; 
        box-shadow: 0px 0px 5px #00FF00; 
    }
`;

function FormCliente({ register, user }) {
    return (
        <FormContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>Dados Cadastrados</Titulo>
            <Opcoes>
                <div key={"nome"} style={{ width: "48%" }}>
                    <Input placeholder={"Nome"} id="cliente-nome" {...register("nome")} defaultValue={user?.nome}/>
                </div>
                <div key={"email"} style={{ width: "48%" }}>
                    <Input placeholder={"E-mail"} id="cliente-email" {...register("email")} defaultValue={user?.email}/>
                </div>
                <div key={"cpf"} style={{ width: "48%" }}>
                    <StyledInputMask mask="999.999.999-99" id="cliente-cpf" placeholder={"CPF"} {...register("cpf")} defaultValue={user?.cpf}/>
                </div>
                <div key={"senha"} style={{ width: "48%" }}>
                    <Input placeholder={"Senha"} id="cliente-senha" type="password" {...register("senha")}/>
                </div>
                <div key={"nascimento"} style={{ width: "48%" }}>
                    <Input type='date' id="cliente-nascimento" placeholder={"Nascimento"} {...register("nascimento")} defaultValue={user?.nascimento} />
                </div>
                <div key={"genero"} style={{ width: "48%" }}>
                    <Select options={generos} id="cliente-genero" placeholder="Selecione o gênero" registro={"genero"} register={register} defaultValue={user?.genero}/>
                </div>
                <div key={"tipoTelefone"} style={{ width: "48%" }}>
                    <Select options={tiposTelefone} id="cliente-tipoTelefone" placeholder="Selecione o tipo de telefone" registro={"tipoTelefone"} register={register} defaultValue={user?.tipoTelefone}/>
                </div>
                <div key={"ddd"} style={{ width: "48%" }}>
                <StyledInputMask mask="99" id="cliente-ddd" placeholder={"DDD"} {...register("ddd")} defaultValue={user?.ddd}/>
                </div>
                <div key={"numero"} style={{ width: "48%" }}>
                    <StyledInputMask mask="99999-9999" id="cliente-numero" placeholder={"Número"} {...register("numero")} defaultValue={user?.numero}/>
                </div>
            </Opcoes>
        </FormContainer>
    )
}

export default FormCliente;
