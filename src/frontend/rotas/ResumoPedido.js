
import styled from 'styled-components'
import Header from '../componentes/Headers/Header';
import ResumoPedido from '../componentes/ResumoPedido';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <ResumoPedido />
    </AppContainer>
  );
}

export default App