import cardInicial from "../../imagens/cardInicial.png"
import desenhoInicial from "../../imagens/desenhoInicial.png"
import styled from "styled-components"

const PainelInicialContainer = styled.section`
    background-color: #ffff;
    display: flex;
    justify-content: space-evenly;
    align-itens: center;
    padding: 50px 0;    
    margin-left: auto;
    margin-right: auto;
    height:200px;
    width: auto;

    img{
        max-width: 50%;
        height: auto;
    }
`

function PainelInicial() {
    const paineis = [desenhoInicial];
    /*const paineis = [desenhoInicial, cardInicial];*/

    return (
        <PainelInicialContainer>
            {paineis.map((painel, index) => (
                <img key={index} src={painel} alt={`Painel ${index}`} />
            ))}
        </PainelInicialContainer>
    );
}

export default PainelInicial