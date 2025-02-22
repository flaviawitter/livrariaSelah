import Input from '../Input'  // Certifique-se de importar o componente corretamente
import styled from 'styled-components'

const FormContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: 470px;
    width: 100%;
    margin: 25px;
`
const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
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
    flex-wrap: wrap; /* Permite que os itens quebrem para a próxima linha */
    justify-content: space-between; /* Espaço entre os itens */
    padding: 0;
    list-style-type: none;
`

const textoPlaceHolders = ['Nome Completo', 'E-mail', 'CPF', 'Data de Nascimento', 'Telefone', 'Celular']

function FormCliente() {
    return (
        <FormContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>Dados Cadastrados</Titulo>
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

export default FormCliente;
