import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import lupa from "../../../imagens/lupa.png";
import { buscarLivrosPorTermo } from "../../../serviços/livros";

const InputContainer = styled.div`
    position: relative;
    width: 300px;
`;

const Input = styled.input`
    background: transparent;
    border: 1px solid #004A33;
    padding: 10px 10px 10px 35px;
    border-radius: 25px;
    width: 280px;
    height: 7.5px;
    color: #004A33;
    font-size: 12px;
    margin-bottom: 10px;
    margin-top: 30px;

    &::placeholder {
        color: #004A33;
        font-size: 10px;
    }
`;

const BotaoLupa = styled.button`
    position: absolute;
    top: 66%;
    right: 1px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    img {
        width: 20px;
        height: 20px;
    }
`;

const InputPesquisa = () => {
    const [valor, setValor] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValor(e.target.value);
    };

    const handleClick = async () => {
        console.log("Valor pesquisado:", valor);
        const resultado = await buscarLivrosPorTermo(valor);
        console.log(resultado)

        navigate("/pesquisa", { state: { resultado, termo: valor } });
    };

    return (
        <InputContainer>
            <Input
                type="text"
                placeholder="Busque seu novo livro!"
                value={valor}
                onChange={handleChange}
            />
            <BotaoLupa onClick={handleClick}>
                <img src={lupa} alt="Buscar" />
            </BotaoLupa>
        </InputContainer>
    );
};

export default InputPesquisa;
