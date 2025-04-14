
import styled from 'styled-components'
import Header from '../componentes/Headers/Header';
import PagDetalhesPedido from '../componentes/PagDetalhesPedido';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <PagDetalhesPedido />
    </AppContainer>
  );
}

export default App