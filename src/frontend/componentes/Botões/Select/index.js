// src/components/Select.js
import styled from "styled-components";

const SelectWrapper = styled.select`
  background-color: #CACACA;
    backdrop-filter: blur(10px);
    border: 1px solid #004A33;
    padding: 10px;
    border-radius: 25px;
    width: 104%;
    height: 40px;
    color: #004A33;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 30px;
    display: flex;
    align-items: flex-start;
    fontFamily: "Bookochi";
    letterSpacing: 0.22em;
    
    &::placeholder {
        color: #004A33;
        font-size: 16px;
    }
    
    &:focus {
        border: 2px solid #004A33; 
        box-shadow: 0px 0px 5px #00FF00; 
    }
`;


function Select({ options, id, name, placeholder, registro, register }) {
    return (
        <SelectWrapper as="select" id={id} name={name} {...register(registro)}>
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </SelectWrapper>
    );
}

export default Select;
