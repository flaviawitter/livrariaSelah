
import styled from 'styled-components'
import Header from '../componentes/Header';
import PainelInicial from '../componentes/PainelInicial';
import Novidades from '../componentes/Novidades';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <PainelInicial />
      <Novidades />

    </AppContainer>
  );
}

export default App