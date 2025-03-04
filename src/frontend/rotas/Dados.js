
import styled from 'styled-components'
import Header from '../componentes/Header';
import FormCliente from '../componentes/FormCliente';
import FormEndereco from '../componentes/FormEndereco';
import FormCartao from '../componentes/FormCartao';
import FormSenha from '../componentes/FormSenha';
import BotaoVermelho from '../componentes/BotaoVermelho';
import BotaoCinza from '../componentes/BotaoCinza';

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #ffff; 
    margin: 0;
`
const DadosContainer = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const BotaoContainer = styled.div`
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    padding: 10px;
`

function App() {
  return (
    <AppContainer>
      <Header />
      <DadosContainer>
        <FormCliente />
        <FormEndereco />
        <FormCartao />
        <FormSenha />
      </DadosContainer>
      <BotaoContainer>
      <BotaoVermelho type="submit">Salvar Dados</BotaoVermelho>
      <BotaoCinza type="button">Excluir Conta</BotaoCinza>
      </BotaoContainer>
    </AppContainer>
  );
}

export default App