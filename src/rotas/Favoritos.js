
import styled from 'styled-components'
import Header from '../componentes/Header';
import Favoritos from '../componentes/Favoritos';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <Favoritos />
    </AppContainer>
  );
}

export default App