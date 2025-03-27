
import styled from 'styled-components'
import HeaderAdm from '../componentes/Headers/HeaderAdm';
import PgRelatorio from '../componentes/PgRelatorio';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <HeaderAdm />
      <PgRelatorio />
    </AppContainer>
  );
}

export default App