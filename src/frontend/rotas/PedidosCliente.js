
import styled from 'styled-components'
import Header from '../componentes/Headers/Header';
import PagPedidos from '../componentes/PagPedidos';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <PagPedidos />
    </AppContainer>
  );
}

export default App