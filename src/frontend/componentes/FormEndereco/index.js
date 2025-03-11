import Input from '../Input'
import { useState } from 'react'
import styled from 'styled-components'
import Select from "../Select"
import InputMask from '../InputMask'

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
const CheckboxLabel = styled.label`
    color: #095F54;
    font-size: 16px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
`

//const titulos = ['Endereço Residencial', 'Endereço de Entrega', 'Endereço de Cobrança']
//const textoPlaceHolders = ['País', 'Estado', 'Cidade', 'Tipo Residência', 'Tipo Logradouro', 'Logradouro', 'Número', 'Complemento', 'Bairro', 'CEP', 'Tipo Endereço', 'Ponto de Referência']

const tipoResidencia = ["Casa", "Apartamento", "Sobreloja ", "Outro"]
const tiposLogradouro = ["Avenida", "Rua", "Alameda", "Rodovia", "Outro"]
const cidades = ["Aruja", "Barueri", "Biritiba-Mirim", "Boituva", "Campinas", "Cajamar", "Caieiras", "Carapicuiba", "Cotia", "Cubatao", "Diadema", "Embu", "Embu-Guacu", "Ferraz De Vasconcelos", "Francisco Morato", "Guararema", "Guarulhos", "Itapevi", "Itaquaquecetuba", "Itapecerica Da Serra", "Jandira", "Juquitiba", "Jundiai", "Mairipora", "Maua", "Miracatu", "Mogi Das Cruzes", "Osasco", "Poa", "Pirapora Bom Jesus", "Quetuz", "Registro", "Ribeirao Pires", "Rio Grande Da Serra", "Santana De Parnaiba", "Salesopolis", "Santo Andre", "Sao Bernardo Do Campo", "Sao Caetano Do Sul", "Sao Paulo", "Suzano", "S.Isabel", "S.Lourenco Da Serra", "S.Andre", "S.Caetano Do Sul", "S.Paulo", "Tabao Da Serra", "Vargem Grande Paulista"];

  

function FormEndereco({register}) {
  return (
    <FormContainer>
      
          <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
            Endereço de Entrega
          </Titulo>

                <Opcoes>
                <li key={"pais"} style={{ width: "48%" }}>
                    <Input placeholder={"Brasil"} {...register("pais")} readOnly />
                </li>
                <li key={"estadoEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"São Paulo"} {...register("estadoEntrega")} readOnly />
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

                <li key={"bairroEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"Bairro"} {...register("bairroEntrega")} />
                </li>
                <li key={"cepEntrega"} style={{ width: "48%" }}>
                    <InputMask mask="99999-999" placeholder={"CEP"} {...register("cepEntrega")} />
                </li>

                <li key={"tpResidenciaEntrega"} style={{ width: "48%" }}>
                    <Select options={tipoResidencia} placeholder="Selecione o tipo de residência" registro={"tpResidenciaEntrega"} register={register} />
                </li>
                <li key={"tpLogradouroEntrega"} style={{ width: "48%" }}>
                    <Select options={tiposLogradouro} placeholder="Selecione o tipo de logradouro" registro={"tpLogradouroEntrega"} register={register}/>
                </li>
                <li key={"EnderecoPreferencialEntrega"} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <input type="checkbox" {...register("preferencial")} />
                    <CheckboxLabel>Endereço Preferencial</CheckboxLabel>
                </li>


                <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
                Endereço de Cobrança
                </Titulo>
                <li key={"pais"} style={{ width: "48%" }}>
                    <Input placeholder={"Brasil"} {...register("pais")} readOnly/>
                </li>
                <li key={"estadoEntrega"} style={{ width: "48%" }}>
                    <Input placeholder={"São Paulo"} {...register("estadoEntrega")} readOnly />
                </li>
                <li key={"cidadeCobranca"} style={{ width: "48%" }}>
                <Select options={cidades} placeholder="Selecione a cidade" registro={"cidadeCobranca"} register={register} />
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
                    <InputMask mask="99999-999" placeholder={"CEP"} {...register("cepCobranca")} />
                </li>
                <li key={"tpResidenciaCobranca"} style={{ width: "48%" }}>
                    <Select options={tipoResidencia} placeholder="Selecione o tipo de residência" registro={"tpResidenciaCobranca"} register={register} />
                </li>
                <li key={"tpLogradouroCobranca"} style={{ width: "48%" }}>
                    <Select options={tiposLogradouro} placeholder="Selecione o tipo de logradouro" registro={"tpLogradouroCobranca"} register={register} />
                </li>
                <li key={"EnderecoPreferencialCobranca"} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <input type="checkbox" {...register("preferencial")} />
                    <CheckboxLabel>Endereço Preferencial</CheckboxLabel>
                </li>
               
          </Opcoes>
    </FormContainer>
  )
}

export default FormEndereco;
