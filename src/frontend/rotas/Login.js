
import styled from 'styled-components'
import LoginPage from '../componentes/LoginPage';
import { AuthProvider } from "../componentes/Context/AuthContext";

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffff; 
`

function App() {
  return (
    <AuthProvider>
    <AppContainer>
      <LoginPage />
    </AppContainer>
    </AuthProvider>
  );
}

export default App