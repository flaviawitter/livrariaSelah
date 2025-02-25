
import styled from 'styled-components'
import LoginPage from '../componentes/LoginPage';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AppContainer>
      <LoginPage />
    </AppContainer>
  );
}

export default App