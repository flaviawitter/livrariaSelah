import Input from '../Input'
import { useState } from 'react'
import styled from 'styled-components'
import Select from "../Select"

const FormContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 100%;
    margin: 15px;
    margin-bottom: 50px;
`
const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
    margin-bottom: 5px;
`
const Opcao = styled.li`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    width: 100%;
    padding: 0 15px;
    cursor: pointer;
    min-width: 80px;
    color: #C7511B;
`
const Opcoes = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    list-style-type: none;
    margin-top: 0;
`

//const titulos = ['Endereço Residencial', 'Endereço de Entrega', 'Endereço de Cobrança']
//const textoPlaceHolders = ['País', 'Estado', 'Cidade', 'Tipo Residência', 'Tipo Logradouro', 'Logradouro', 'Número', 'Complemento', 'Bairro', 'CEP', 'Tipo Endereço', 'Ponto de Referência']

const tipoResidencia = ["Casa", "Apartamento", "Sobreloja ", "Outro"]
const tiposLogradouro = ["Avenida", "Rua", "Alameda", "Rodovia", "Outro"]
const tiposEndereco = ["Casa", "Trabalho", "Comercio", "Outro"]

function FormEndereco({register}) {
  return (
    <FormContainer>
      
          <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
            Endereço de Entrega
          </Titulo>

                <Opcoes>
                <li key={"pais"} style={{ width: "48%" }}>
                    <Input placeholder={"País"} {...register("pais")} />
                </li>
                <li key={"estadoEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Estado"} {...register("estadoEntrega")} />
                </li>
                <li key={"cidadeEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Cidade"} {...register("cidadeEntrega")} />
                </li>
                <li key={"logradouroEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Logradouro"} {...register("logradouroEntrega")} />
                </li>
                <li key={"numeroEnderecoEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Número"} {...register("numeroEnderecoEntrega")} />
                </li>

                <li key={"bairroEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Bairro"} {...register("bairroEntrega")} />
                </li>
                <li key={"cepEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"CEP"} {...register("cepEntrega")} />
                </li>

                <li key={"tpResidenciaEntrega"} style={{ width: "48%" }}>
                    <Select options={tipoResidencia} placeholder="Selecione o tipo de residência" registro={"tpResidenciaEntrega"} register={register} />
                </li>
                <li key={"tpLogradouroEntrega"} style={{ width: "48%" }}>
                    <Select options={tiposLogradouro} placeholder="Selecione o tipo de logradouro" registro={"tpLogradouroEntrega"} register={register}/>
                </li>
                <li key={"tpEnderecoEntrega"} style={{ width: "48%" }}>
                    <Select options={tiposEndereco} placeholder="Selecione o tipo de endereco" registro={"tpEnderecoEntrega"} register={register} />
                </li>

                <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
                Endereço de Cobrança
                </Titulo>
                <li key={"pais"} style={{ width: "48%" }}>
                    <Input placeholder={"País"} {...register("pais")} />
                </li>
                <li key={"estadoEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Estado"} {...register("estadoEntrega")} />
                </li>
                <li key={"cidadeCobranca"} style={{ width: "48%" }}>
                    <Input placeholder={"Cidade"} {...register("cidadeCobranca")} />
                </li>
                <li key={"logradouroCobranca"} style={{ width: "48%" }}>
                    <Input placeholder={"Logradouro"} {...register("logradouroCobranca")} />
                </li>
                <li key={"numeroEnderecoCobranca"} style={{ width: "48%" }}>
                    <Input placeholder={"Número"} {...register("numeroEnderecoCobranca")} />
                </li>

                <li key={"bairroCobranca"} style={{ width: "48%" }}>
                    <Input placeholder={"Bairro"} {...register("bairroCobranca")} />
                </li>
                <li key={"cepCobranca"} style={{ width: "48%" }}>
                    <Input placeholder={"CEP"} {...register("cepCobranca")} />
                </li>
                <li key={"tpResidenciaCobranca"} style={{ width: "48%" }}>
                    <Select options={tipoResidencia} placeholder="Selecione o tipo de residência" registro={"tpResidenciaCobranca"} register={register} />
                </li>
                <li key={"tpLogradouroCobranca"} style={{ width: "48%" }}>
                    <Select options={tiposLogradouro} placeholder="Selecione o tipo de logradouro" registro={"tpLogradouroCobranca"} register={register} />
                </li>
                <li key={"tpEnderecoCobranca"} style={{ width: "48%" }}>
                    <Select options={tiposEndereco} placeholder="Selecione o tipo de endereco" registro={"tpEnderecoCobranca"} register={register} />
                </li>
          </Opcoes>
    </FormContainer>
  )
}

export default FormEndereco;
