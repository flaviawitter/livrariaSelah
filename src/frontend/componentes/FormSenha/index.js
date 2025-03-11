import Input from '../Input'  
import styled from 'styled-components'
import BotaoCinza from '../BotaoCinza'


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
    flex-direction: collumn;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start; 
    padding: 0;
    list-style-type: none;
    margin-top: 0;
`

function FormSenha({register}) {
    return (
        <FormContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>Senha</Titulo>
            <Opcoes>
            <li key={"senhaAtual"} style={{ width: "48%" }}>
                    <Input placeholder={"Senha Atual"} {...register("senhaAtual")} />
            </li>
            <li style={{  width: "48%", textAlign: "left", marginTop: "8px" }}>
                <BotaoCinza style={{ fontSize: "14px"}} type="button"> Alterar Senha</BotaoCinza>
            </li>
            <li key={"senhaNova"} style={{ width: "48%" }}>
                    <Input placeholder={"Senha Nova"} {...register("senhaNova")} />
            </li>
            <li key={"repitaSenhaNova"} style={{ width: "48%" }}>
                    <Input placeholder={"Repita a Senha Nova"} {...register("repitaSenhaNova")} />
            </li>
            </Opcoes>
        </FormContainer>
    )
}

export default FormSenha;