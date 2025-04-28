
import styled from 'styled-components'
import Header from '../componentes/Headers/Header';
import PagCupom from '../componentes/PagCupom';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <PagCupom />
    </AppContainer>
  );
}

export default App