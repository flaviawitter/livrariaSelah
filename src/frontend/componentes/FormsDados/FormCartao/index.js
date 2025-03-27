import Input from '../../Inputs/Input'
import Select from "../../Botões/Select"
import styled from 'styled-components'
import InputMask from 'react-input-mask'

const FormContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 100%;
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
    font-size: 16px;
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
const CheckboxLabel = styled.label`
    color: #095F54;
    font-size: 16px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
`
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
`

const bandeiras = ["MasterCard", "Visa", "Elo", "Outro"]

function FormCartao({ register }) {
    return (
        <FormContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>Cartões Cadastrados</Titulo>
            <Opcoes>
            <li key={"apelidoCartao"} style={{ width: "48%" }}>
                    <Input id="cartao-apelido"  placeholder={"Apelido do Cartão"} {...register("apelidoCartao")} />
            </li>
            <li key={"numeroCartao"} style={{ width: "48%" }}>
                <StyledInputMask id="cartao-numero" mask="9999 9999 9999 9999" placeholder={"Número do Cartão"} {...register("numeroCartao")} />
            </li>
            <li key={"codSeguranca"} style={{ width: "48%" }}>
                <StyledInputMask id="cartao-codSeguranca" mask="999" placeholder={"Código de Segurança"} {...register("codSeguranca")} />
            </li>
            <li key={"validade"} style={{ width: "48%" }}>
            <StyledInputMask id="cartao-validade" mask="99/99" placeholder={"Validade"} {...register("validade")} />
            </li>
            <li key={"nomeTitular"} style={{ width: "48%" }}>
                    <Input id="cartao-nomeTitular" placeholder={"Nome do Titular"} {...register("nomeTitular")} />
            </li>
            <li key={"bandeiraCartao"} style={{ width: "48%" }}>
            <Select id="cartao-bandeira" options={bandeiras} placeholder="Selecione a bandeira" registro={"bandeiraCartao"} register={register} />
            </li>
            <li key={"preferencial"} style={{ width: "48%", display: "flex", alignItems: "center" }}>
                    <input id="cartao-preferencial" type="checkbox" {...register("preferencial")} />
                    <CheckboxLabel >Cartão Preferencial</CheckboxLabel>
            </li>

            </Opcoes>
        </FormContainer>
    )
}

export default FormCartao;