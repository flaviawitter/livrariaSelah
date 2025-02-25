
import styled from 'styled-components'
import Header from '../componentes/Header';
import FormCliente from '../componentes/FormCliente';
import FormEndereco from '../componentes/FormEndereco';
import FormCartao from '../componentes/FormCartao';

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
function App() {
  return (
    <AppContainer>
      <Header />
      <DadosContainer>
        <FormCliente />
        <FormEndereco />
        <FormCartao />
      </DadosContainer>
    </AppContainer>
  );
}

export default App