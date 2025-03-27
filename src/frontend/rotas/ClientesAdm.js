
import styled from 'styled-components'
import HeaderAdm from '../componentes/Headers/HeaderAdm';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <HeaderAdm />

    </AppContainer>
  );
}

export default App