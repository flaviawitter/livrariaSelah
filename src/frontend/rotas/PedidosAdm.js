
import styled from 'styled-components'
import HeaderAdm from '../componentes/Headers/HeaderAdm';
import PagPedidosAdm from '../componentes/PagPedidosAdm';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <HeaderAdm />
      <PagPedidosAdm />
    </AppContainer>
  );
}

export default App