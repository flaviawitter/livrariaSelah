import styled from 'styled-components';

const Title = styled.h2`
  color: #095F54;
  font-size: 32px;
  font-family: 'Bookochi';
  letter-spacing: 0.22em;
  margin-bottom: 5px;
`;

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-family: 'Bookochi';
  letter-spacing: 0.22em;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Bookochi';
  letter-spacing: 0.22em;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Bookochi';
  letter-spacing: 0.22em;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #666;
`;

const PowerBIEmbed = styled.iframe`
  width: 1024px;
  height: 804px;
  border: none;
`;

function PgRelatorio() {
  return (
    <AppContainer>
      <Title>RELATÓRIO</Title>
    
      <ChartContainer>
        <PowerBIEmbed
          title="Dashboard - Análise2"
          src="https://app.powerbi.com/view?r=eyJrIjoiOWI1YTk2N2MtZTk0Zi00OTlhLTliYjYtOTUyYjI0YzRmNTBhIiwidCI6ImNmNzJlMmJkLTdhMmItNDc4My1iZGViLTM5ZDU3YjA3Zjc2ZiIsImMiOjR9"
          allowFullScreen
        />
      </ChartContainer>
    </AppContainer>
  );
}


export default PgRelatorio;
