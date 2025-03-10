import styled from "styled-components"
import InputMask from "react-input-mask";

const StyleInput = styled.input`
    background-color: #CACACA;
    backdrop-filter: blur(10px);
    border: 1px solid #004A33;
    padding: 10px;
    border-radius: 25px;
    width: 100%;
    height: 15px;
    color: #004A33;
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    
    &::placeholder {
        color: #004A33;
        font-size: 16px;
    }
    
    &:focus {
        border: 2px solid #004A33; 
        box-shadow: 0px 0px 5px #00FF00; 
    }
`

const Input = ({ mask, placeholder, register, name }) => {
    return (
        <InputMask mask={mask} {...register(name)}>
            {(inputProps) => <StyleInput {...inputProps} placeholder={placeholder} />}
        </InputMask>
    );
};

export default Input