
import styled from 'styled-components'
import HeaderAdm from '../componentes/Headers/HeaderAdm';
import PagDetalhesPedidoAdm from '../componentes/PagDetalhesPedidoAdm';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <HeaderAdm />
      <PagDetalhesPedidoAdm/>
    </AppContainer>
  );
}

export default App