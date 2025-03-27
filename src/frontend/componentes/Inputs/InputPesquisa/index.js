import styled from "styled-components"
import lupa from "../../../imagens/lupa.png"

const Input = styled.input`
    order: 1px solid #FFF;
    background: transparent;
    border: 1px solid #004A33;
    padding: 10px;
    border-radius: 25px;
    width: 300px;
    height: 7.5px;
    color: #004A33;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 30px;
    background-image: url(${lupa});
    padding: 10px 10px 10px 35px; /* Padding da lupa */
    background-position: right 10px center;
    background-size: 20px 20px;
    background-repeat: no-repeat;

    &::placeholder {
        color: #004A33;
        font-size: 10px;
    }
`

export default Input