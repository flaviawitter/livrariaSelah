import Input from '../Input'
import Select from "../Select"
import styled from 'styled-components'
import InputMask from '../InputMask'

const FormContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 90%;
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
const bandeiras = ["MasterCard", "Visa", "Elo", "Outro"]

function FormCartaoModal({ register }) {
    return (
        <FormContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>Cadastrar Cartão</Titulo>
            <Opcoes>
            <li key={"apelidoCartao"} style={{ width: "45%" }}>
                    <Input  placeholder={"Apelido do Cartão"} {...register("apelidoCartao")} />
            </li>
            <li key={"numeroCartao"} style={{ width: "45%" }}>
                    <InputMask mask="9999 9999 9999 9999" placeholder={"Número do Cartão"} {...register("numeroCartao")} />
            </li>
            <li key={"codSeguranca"} style={{ width: "45%" }}>
                    <InputMask mask="999" placeholder={"Código de Segurança"} {...register("codSeguranca")} />
            </li>
            <li key={"validade"} style={{ width: "45%" }}>
                    <InputMask mask="99/99"  placeholder={"Validade"} {...register("validade")} />
            </li>
            <li key={"nomeTitular"} style={{ width: "45%" }}>
                    <Input placeholder={"Nome do Titular"} {...register("nomeTitular")} />
            </li>
            <li key={"bandeiraCartao"} style={{ width: "45%" }}>
            <Select options={bandeiras} placeholder="Selecione a bandeira" registro={"bandeiraCartao"} register={register} />
            </li>
            <li key={"cartaoPreferencial"} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <input type="checkbox" {...register("preferencial")} />
                    <CheckboxLabel>Cartão Preferencial</CheckboxLabel>
            </li>

            </Opcoes>
        </FormContainer>
    )
}

export default FormCartaoModal;