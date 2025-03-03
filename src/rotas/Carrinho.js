
import styled from 'styled-components'
import Header from '../componentes/Header';
import CarrinhoCompras from '../componentes/CarrinhoCompras';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <CarrinhoCompras />
    </AppContainer>
  );
}

export default App