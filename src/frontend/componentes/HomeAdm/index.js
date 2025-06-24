import styled from 'styled-components';
import BotaoVerde from '../Botões/BotaoVerde';
import BotaoVermelho from '../Botões/BotaoVermelho';
import BotaoCinza from '../Botões/BotaoCinza';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Bookochi';
  letter-spacing: 0.22em;
`;

const TitleContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;

const Title = styled.h2`
  color: #095F54;
  font-size: 32px;
  font-family: 'Bookochi';
  letter-spacing: 0.22em;
  margin-bottom: 5px;
`;

const SubTitle = styled.h3`
  color: #000;
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.p`
  color: #333;
  font-size: 14px;
  text-align: center;
  max-width: 300px;
`;

const Button = styled.button`
  background-color: ${props => props.color || '#ccc'};
  color: ${props => (props.color ? '#fff' : '#000')};
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: bold;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Sections = styled.div`
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-top: 30px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 20px;
`;

function HomeAdm() {
    const navigate = useNavigate(); 

  return (
    <Container>
      <TitleContainer>
        <Title>INÍCIO</Title>
        <SubTitle>Olá Admin! Seja Bem-Vindo(a)</SubTitle>
      </TitleContainer>
      <Sections>
        <Card>
          <Description>Aqui você encontra a lista de todos os clientes cadastrados.</Description>
          <BotaoVerde onClick={() => navigate('/clientesadm')}>Clientes</BotaoVerde>
        </Card>
        <Card>
          <Description>Aqui você encontra a lista de todos os pedidos.</Description>
          <BotaoVermelho onClick={() => navigate('/pedidosadm')}>Pedidos</BotaoVermelho>
        </Card>
        <Card>
          <Description>Aqui você pode gerar um novo relatório de vendas geral.</Description>
          <BotaoCinza onClick={() => navigate('/relatorio')}>Gerar Relatório</BotaoCinza>
        </Card>
      </Sections>
    </Container>
  );
}

export default HomeAdm;
