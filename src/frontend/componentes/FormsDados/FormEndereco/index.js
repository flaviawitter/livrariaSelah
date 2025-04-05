import Input from '../../Inputs/Input'
import styled from 'styled-components'
import Select from "../../Botões/Select"
import InputMask from 'react-input-mask'
import React from "react";
import { useForm, Controller } from "react-hook-form";

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

//const titulos = ['Endereço Residencial', 'Endereço de Entrega', 'Endereço de Cobrança']
//const textoPlaceHolders = ['País', 'Estado', 'Cidade', 'Tipo Residência', 'Tipo Logradouro', 'Logradouro', 'Número', 'Complemento', 'Bairro', 'CEP', 'Tipo Endereço', 'Ponto de Referência']

const tipoResidencia = ["Casa", "Apartamento", "Sobreloja ", "Outro"]
const tiposLogradouro = ["Avenida", "Rua", "Alameda", "Rodovia", "Outro"]
const cidades = ["Aruja", "Barueri", "Biritiba-Mirim", "Boituva", "Campinas", "Cajamar", "Caieiras", "Carapicuiba", "Cotia", "Cubatao", "Diadema", "Embu", "Embu-Guacu", "Ferraz De Vasconcelos", "Francisco Morato", "Guararema", "Guarulhos", "Itapevi", "Itaquaquecetuba", "Itapecerica Da Serra", "Jandira", "Juquitiba", "Jundiai", "Mairipora", "Maua", "Miracatu", "Mogi Das Cruzes", "Osasco", "Poa", "Pirapora Bom Jesus", "Quetuz", "Registro", "Ribeirao Pires", "Rio Grande Da Serra", "Santana De Parnaiba", "Salesopolis", "Santo Andre", "Sao Bernardo Do Campo", "Sao Caetano Do Sul", "Sao Paulo", "Suzano", "S.Isabel", "S.Lourenco Da Serra", "S.Andre", "S.Caetano Do Sul", "S.Paulo", "Tabao Da Serra", "Vargem Grande Paulista"];


function FormEndereco({ register, user, control }) {
    const formMethods = useForm();  // Adiciona useForm caso control não seja passado
    const effectiveControl = control || formMethods.control;
    const effectiveRegister = register || formMethods.register;

  return (
    <FormContainer>
      
          <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
            Endereço de Entrega
          </Titulo>

                <Opcoes>
                <div key={"pais"} style={{ width: "48%" }}>
                    <Input placeholder="Brasil" id="enderecoEntrega-pais" {...effectiveRegister("pais")} readOnly />
                </div>
                <div key={"estadoEntrega"} style={{ width: "48%" }}>
                    <Input placeholder="São Paulo" id="enderecoEntrega-estado" {...effectiveRegister("estadoEntrega")} readOnly />
                </div>
                <div key={"cidadeEntrega"} style={{ width: "48%" }}>
                    <Controller
                        name = "cidadeEntrega"
                        control={effectiveControl}
                        defaultValue={user?.enderecos?.[0]?.cidade || ""} 
                        render={({field}) => (
                            <Select {...field} options={cidades} id="enderecoEntrega-cidade" placeholder="Selecione a cidade" {...effectiveRegister("cidadeEntrega")} />
                        )}
                    />
                </div>
                <div key={"tpLogradouroEntrega"} style={{ width: "48%" }}>
                    <Controller
                        name = "tpLogradouroEntrega"
                        control={effectiveControl}
                        defaultValue={user?.enderecos?.[0]?.tipoLogradouro || ""} 
                        render={({field}) => (
                            <Select {...field} options={tiposLogradouro} id="enderecoEntrega-tpLogradouro" placeholder="Selecione o tipo de logradouro" {...effectiveRegister("tpLogradouroEntrega")} />
                        )}
                    />
                </div>
                <div key={"logradouroEntrega"} style={{ width: "48%" }}>
                    <Input placeholder="Logradouro" id="enderecoEntrega-logradouro" {...effectiveRegister("logradouroEntrega")} defaultValue={user?.enderecos?.[0]?.logradouro} />
                </div>
                <div key={"numeroEnderecoEntrega"} style={{ width: "48%" }}>
                    <Input placeholder="Número" id="enderecoEntrega-numero" {...effectiveRegister("numeroEnderecoEntrega")} defaultValue={user?.enderecos?.[0]?.numero} />
                </div>

                <div key={"bairroEntrega"} style={{ width: "48%" }}>
                    <Input placeholder="Bairro" id="enderecoEntrega-bairro" {...effectiveRegister("bairroEntrega")} defaultValue={user?.enderecos?.[0]?.bairro} />
                </div>
                <div key={"cepEntrega"} style={{ width: "48%" }}>
                    <Controller
                        name="cepEntrega"
                        control={effectiveControl}
                        render={({ field }) => (
                            <StyledInputMask {...field} mask="99999-999" id="enderecoCobranca-cepEntrega" placeholder="CEP" defaultValue={user?.enderecos?.[0]?.cep || ""} />
                        )}
                    /> 
                </div>

                <div key={"tpResidenciaEntrega"} style={{ width: "48%" }}>
                    <Controller
                        name = "tpResidenciaEntrega"
                        control={effectiveControl}
                        defaultValue={user?.enderecos?.[0]?.tipoResidencia || ""} 
                        render={({field}) => (
                            <Select {...field} options={tipoResidencia} id="enderecoEntrega-tpResidencia" placeholder="Selecione o tipo de residência"  {...effectiveRegister("tpResidenciaEntrega")} />
                        )}
                    />
                </div>
                <div key={"preferencialEntrega"} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <input type="checkbox" id="enderecoEntrega-preferencial" {...effectiveRegister("preferencialEntrega")} defaultValue={user?.enderecos?.[0]?.preferencial || ""} />
                    <CheckboxLabel>Endereço Preferencial</CheckboxLabel>
                </div>


                <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
                Endereço de Cobrança
                </Titulo>
                <div key={"paisCobranca"} style={{ width: "48%" }}>
                    <Input placeholder="Brasil" id="enderecoCobranca-pais" {...effectiveRegister("paisCobranca")} readOnly/>
                </div>
                <div key={"estadoCobranca"} style={{ width: "48%" }}>
                    <Input placeholder="São Paulo" id="enderecoCobranca-estado" {...effectiveRegister("estadoEntregaCobranca")} readOnly />
                </div>
                <div key={"cidadeCobranca"} style={{ width: "48%" }}>
                    <Controller
                        name = "cidadeCobranca"
                        control={effectiveControl}
                        defaultValue={user?.enderecos?.[1]?.cidade || ""} 
                        render={({field}) => (
                            <Select {...field} options={cidades} id="enderecoCobranca-cidade" placeholder="Selecione a cidade"  {...effectiveRegister("cidadeCobranca")} />
                        )}
                    />
                </div>
                <div key={"tpLogradouroCobranca"} style={{ width: "48%" }}>
                    <Controller
                        name="tpLogradouroCobranca"
                        control={effectiveControl}
                        defaultValue={user?.enderecos?.[1]?.tipoLogradouro || ""} 
                        render={({field}) => (
                            <Select {...field} options={tiposLogradouro} id="enderecoEntrega-tpLogradouro" placeholder="Selecione o tipo de logradouro"  {...effectiveRegister("tpLogradouroCobranca")} />
                        )}
                    />
                </div>
                <div key={"logradouroCobranca"} style={{ width: "48%" }}>
                    <Input placeholder="Logradouro" id="enderecoCobranca-logradouro" {...effectiveRegister("logradouroCobranca")} defaultValue={user?.enderecos?.[1]?.logradouro} />
                </div>
                <div key={"numeroEnderecoCobranca"} style={{ width: "48%" }}>
                    <Input placeholder="Número" id="enderecoCobranca-numero" {...effectiveRegister("numeroEnderecoCobranca")} defaultValue={user?.enderecos?.[1]?.numero} />
                </div>

                <div key={"bairroCobranca"} style={{ width: "48%" }}>
                    <Input placeholder="Bairro" id="enderecoCobranca-bairro" {...effectiveRegister("bairroCobranca")} defaultValue={user?.enderecos?.[1]?.bairro} />
                </div>
                <div key={"cepCobranca"} style={{ width: "48%" }}>
                    <Controller
                        name="cepCobranca"
                        control={effectiveControl}
                        render={({ field }) => (
                            <StyledInputMask {...field} mask="99999-999" id="enderecoCobranca-cepCobranca" placeholder="CEP" defaultValue={user?.enderecos?.[1]?.cep || ""} />
                        )}
                    />    
                </div>
                <div key={"tpResidenciaCobranca"} style={{ width: "48%" }}>
                    <Controller
                        name="tpResidenciaCobranca"
                        control={effectiveControl}
                        defaultValue={user?.enderecos?.[1]?.tipoResidencia || ""} 
                        render={({field}) => (
                            <Select {...field} options={tipoResidencia} id="enderecoEntrega-tpResidencia" placeholder="Selecione o tipo de residência"  {...effectiveRegister("tpResidenciaCobranca")} />
                        )}
                    />
                </div>
                <div key={"preferencialCobranca"} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <input type="checkbox" id="enderecoCobranca-preferencial" {...effectiveRegister("preferencialCobranca")} defaultValue={user?.enderecos?.[1]?.preferencial || ""} />
                    <CheckboxLabel>Endereço Preferencial</CheckboxLabel>
                </div>
               
          </Opcoes>
    </FormContainer>
  )
}

export default FormEndereco;
