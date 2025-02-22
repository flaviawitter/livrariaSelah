import styled from "styled-components"

const Input = styled.input`
    order: 1px solid #FFF;
    background: transparent;
    border: 1px solid #004A33;
    padding: 10px;
    border-radius: 25px;
    width: 100%;
    height: 10px;
    color: #004A33;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 30px;
    
    &::placeholder {
        color: #004A33;
        font-size: 10px;
    }
`

export default Input