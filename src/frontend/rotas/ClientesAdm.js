
import styled from 'styled-components'
import HeaderAdm from '../componentes/Headers/HeaderAdm';
import PagClienteAdm from '../componentes/PagClientesAdm';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <HeaderAdm />
      <PagClienteAdm />
    </AppContainer>
  );
}

export default App