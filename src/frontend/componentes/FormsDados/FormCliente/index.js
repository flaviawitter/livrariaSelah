import Input from '../../Inputs/Input';
import Select from "../../Botões/Select";
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";

const FormContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 100vw;
    max-width: 100%;
    margin: 15px;
`;
const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
    margin-bottom: 5px;
`;
const Opcoes = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    padding: 0;
    list-style-type: none;
    margin-top: 0;
`;
const StyledInputMask = styled(InputMask)`
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
`;

const generos = ["Masculino", "Feminino", "Outro"];
const tiposTelefone = ["Celular", "Residencial", "Comercial", "Outro"];

function FormCliente({ register, control, user, disabled = false }) {

    if (!user) {
        return <p>Carregando dados...</p>;
    }

    return (
        <FormContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
                Dados Cadastrados
            </Titulo>

            <Opcoes>
                <div style={{ width: "48%" }}>
                    <Input
                        disabled={disabled}
                        placeholder="Nome"
                        id="cliente-nome"
                        {...register("nome")}
                    />
                </div>

                <div style={{ width: "48%" }}>
                    <Input
                        disabled={disabled}
                        placeholder="E-mail"
                        id="cliente-email"
                        {...register("email")}
                    />
                </div>

                <div style={{ width: "48%" }}>
                    <Controller
                        name="cpf"
                        control={control}
                        render={({ field }) => (
                            <StyledInputMask
                                disabled={disabled}
                                {...field}
                                mask="999.999.999-99"
                                id="cliente-cpf"
                                placeholder="CPF"
                            />
                        )}
                    />
                </div>

                <div style={{ width: "48%" }}>
                    <Input
                        disabled={disabled}
                        placeholder="Senha"
                        id="cliente-senha"
                        type="password"
                        {...register("senha")}
                    />
                </div>

                <div style={{ width: "48%" }}>
                    <Input
                        disabled={disabled}
                        type='date'
                        id="cliente-nascimento"
                        {...register("nascimento")}
                    />
                </div>

                <div key={"genero"} style={{ width: "48%" }}>
                    <Select
                        disabled={disabled}
                        options={generos}
                        id="cliente-genero"
                        placeholder="Selecione o gênero"
                        registro="genero"
                        {...register("genero")}
                    />
                </div>

                <div key={"tipoTelefone"} style={{ width: "48%" }}>
                    <Select
                        disabled={disabled}
                        options={tiposTelefone}
                        id="cliente-tipoTelefone"
                        placeholder="Selecione o tipo de telefone"
                        registro="tipoTelefone"
                        {...register("tipoTelefone")}
                    />
                </div>

                <div style={{ width: "48%" }}>
                    <Controller
                        name="ddd"
                        control={control}
                        render={({ field }) => (
                            <StyledInputMask
                                disabled={disabled}
                                {...field}
                                mask="99"
                                id="cliente-ddd"
                                placeholder="DDD"
                            />
                        )}
                    />
                </div>

                <div style={{ width: "48%" }}>
                    <Controller
                        name="numero"
                        control={control}
                        render={({ field }) => (
                            <StyledInputMask
                                disabled={disabled}
                                {...field}
                                mask="99999-9999"
                                id="cliente-numero"
                                placeholder="Número"
                            />
                        )}
                    />
                </div>
            </Opcoes>
        </FormContainer>
    );
}

export default FormCliente;
