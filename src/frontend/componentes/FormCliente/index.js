import Input from '../Input'
import Select from "../Select"
import styled from 'styled-components'

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
const Opcao = styled.li`
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


function FormCliente({ register }) {
    return (
        <FormContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>Dados Cadastrados</Titulo>
            <Opcoes>
                <li key={"nome"} style={{ width: "48%" }}>
                    <Input placeholder={"Nome"} {...register("nome")} />
                </li>
                <li key={"email"} style={{ width: "48%" }}>
                    <Input placeholder={"E-mail"} {...register("email")} />
                </li>
                <li key={"cpf"} style={{ width: "48%" }}>
                    <Input placeholder={"CPF"} {...register("cpf")} />
                </li>
                <li key={"nascimento"} style={{ width: "48%" }}>
                    <Input placeholder={"Nascimento"} {...register("nascimento")} />
                </li>
                <li key={"ddd"} style={{ width: "48%" }}>
                    <Input placeholder={"DDD"} {...register("ddd")} />
                </li>
                <li key={"numero"} style={{ width: "48%" }}>
                    <Input placeholder={"Número"} {...register("numero")} />
                </li>
                <li key={"genero"} style={{ width: "48%" }}>
                    <Select options={generos} placeholder="Selecione o gênero" registro={"genero"} register={register} />
                </li>
                <li key={"tipoTelefone"} style={{ width: "48%" }}>
                    <Select options={tiposTelefone} placeholder="Selecione o tipo de telefone" registro={"tipoTelefone"} register={register} />
                </li>
            </Opcoes>
        </FormContainer>
    )
}

export default FormCliente;
