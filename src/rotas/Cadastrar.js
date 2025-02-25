
import styled from 'styled-components'
import CadastrarPage from '../componentes/CadastrarPage';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <CadastrarPage />
    </AppContainer>
  );
}

export default App