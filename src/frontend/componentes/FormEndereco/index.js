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
const cidades = ["Aruja", "Barueri", "Biritiba-Mirim", "Boituva", "Caieiras", "Cajamar", "Campinas", "Carapicuiba", "Cotia", "Cubatao", "Diadema", "Embu", "Embu-Guacu", "Ferraz De Vasconcelos", "Francisco Morato", "Franco Da Rocha", "Guararema", "Guarulhos", "Itaquaquecetuba", "Itapevi", "Itapecerica Da Serra", "Jandira", "Juquitiba", "Jundiai", "Mairipora", "Maua", "Miracatu", "Mogi Das Cruzes", "Osasco", "Pirapora Bom Jesus", "Poa", "Queluz", "Registro", "Ribeirao Pires", "Rio Grande Da Serra", "Santo Andre", "Sao Bernardo Do Campo", "Sao Caetano Do Sul", "Santa Isabel", "Santana De Parnaiba", "Sao Lourenco Da Serra", "Sao Paulo", "Salesopolis", "Suzano", "Taboao Da Serra", "Vargem Grande Paulista"]


function FormEndereco({register}) {
  return (
    <FormContainer>
      
          <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
            Endereço de Entrega
          </Titulo>

                <Opcoes>
                <li key={"pais"} style={{ width: "48%" }}>
                    <Input value="Brasil" {...register("pais")} readOnly />
                </li>
                <li key={"estadoEntrega"} style={{ width: "48%" }}>
                    <Input value="São Paulo" {...register("estadoEntrega")} readOnly />
                </li>
                <li key={"cidadeEntrega"} style={{ width: "48%" }}>
                <Select options={cidades} placeholder="Selecione a cidade" registro={"cidadeEntrega"} register={register} />
                </li>
                <li key={"logradouroEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Logradouro"} {...register("logradouroEntrega")} />
                </li>
                <li key={"numeroEnderecoEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Número"} {...register("numeroEnderecoEntrega")} />
                </li>
                <li key={"complementoEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Complemento"} {...register("complementoEntrega")} />
                </li>
                <li key={"bairroEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Bairro"} {...register("bairroEntrega")} />
                </li>
                <li key={"cepEntrega"} style={{ width: "48%" }}>
                    <Input mask="99999-999" placeholder={"CEP"} {...register("cepEntrega")} />
                </li>
                <li key={"ptReferenciaEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Ponto de Referência"} {...register("ptReferenciaEntrega")} />
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
                <li key={"paisCobranca"} style={{ width: "48%" }}>
                    <Input value="Brasil" {...register("paisCobranca")} readOnly />
                </li>
                <li key={"estadoCobranca"} style={{ width: "48%" }}>
                    <Input value="São Paulo" {...register("estadoCobranca")} readOnly />
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
                <li key={"complementoCobranca"} style={{ width: "48%" }}>
                    <Input placeholder={"Complemento"} {...register("complementoCobranca")} />
                </li>
                <li key={"bairroCobranca"} style={{ width: "48%" }}>
                    <Input placeholder={"Bairro"} {...register("bairroCobranca")} />
                </li>
                <li key={"cepCobranca"} style={{ width: "48%" }}>
                    <Input mask="99999-999" placeholder={"CEP"} {...register("cepCobranca")} />
                </li>
                <li key={"ptReferenciaCobranca"} style={{ width: "48%" }}>
                    <Input placeholder={"Ponto de Referência"} {...register("ptReferenciaCobranca")} />
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
