import Input from '../Input'
import styled from 'styled-components'

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

const textoPlaceHolders = ['Número do Cartão', 'CVV', 'Validade', 'Nome do Titular']

function FormCartao() {
    return (
        <FormContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>Cartões Cadastrados</Titulo>
            <Opcoes>
                {textoPlaceHolders.map((placeholder, index) => (
                    <li key={index} style={{ width: '48%' }}>
                        <Input placeholder={placeholder} />
                    </li>
                ))}
            </Opcoes>
        </FormContainer>
    )
}

export default FormCartao;
