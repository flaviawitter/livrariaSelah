
import styled from 'styled-components'
import Header from '../componentes/Header';
import ResultadoPesquisa from '../componentes/ResultadoPesquisa';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <ResultadoPesquisa />
    </AppContainer>
  );
}

export default App