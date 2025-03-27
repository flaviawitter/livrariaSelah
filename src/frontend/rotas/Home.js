
import styled from 'styled-components'
import Header from '../componentes/Headers/Header';
import PainelInicial from '../componentes/PainelInicial';
import Novidades from '../componentes/Novidades';
import Chatbot from '../componentes/ChatBot';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <PainelInicial />
      <Chatbot />
      <Novidades />

    </AppContainer>
  );
}

export default App