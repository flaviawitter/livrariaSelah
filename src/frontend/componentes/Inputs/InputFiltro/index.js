import styled from "styled-components"

const ContainerFiltro = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const LabelFiltro = styled.label`
  font-size: 16px;
  fontFamily: "Bookochi";
  letterSpacing: "0.22em";
  color: #666;
  margin-right: 10px;
`;

const InputFiltroStyled = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 25px;
  text-align: center;
  font-size: 16px;
  fontFamily: "Bookochi";
  letterSpacing: "0.22em";
`;

function Filtro() {
    return(
    <ContainerFiltro>
        <LabelFiltro>Filtrar pedidos:</LabelFiltro>
        <InputFiltroStyled type="text" placeholder="Data inicial dd/mm/aa" />
        <InputFiltroStyled type="text" placeholder="Data final dd/mm/aa" />
    </ContainerFiltro>
    )
}

export default Filtro