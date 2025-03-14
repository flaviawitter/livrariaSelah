import Input from '../Input'
import styled from 'styled-components'
import Select from "../Select"

const FormContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 90%;
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

const tipoResidencia = ["Casa", "Apartamento", "Sobreloja ", "Outro"]
const tiposLogradouro = ["Avenida", "Rua", "Alameda", "Rodovia", "Outro"]
const cidades = ["Aruja", "Barueri", "Biritiba-Mirim", "Boituva", "Campinas", "Cajamar", "Caieiras", "Carapicuiba", "Cotia", "Cubatao", "Diadema", "Embu", "Embu-Guacu", "Ferraz De Vasconcelos", "Francisco Morato", "Guararema", "Guarulhos", "Itapevi", "Itaquaquecetuba", "Itapecerica Da Serra", "Jandira", "Juquitiba", "Jundiai", "Mairipora", "Maua", "Miracatu", "Mogi Das Cruzes", "Osasco", "Poa", "Pirapora Bom Jesus", "Quetuz", "Registro", "Ribeirao Pires", "Rio Grande Da Serra", "Santana De Parnaiba", "Salesopolis", "Santo Andre", "Sao Bernardo Do Campo", "Sao Caetano Do Sul", "Sao Paulo", "Suzano", "S.Isabel", "S.Lourenco Da Serra", "S.Andre", "S.Caetano Do Sul", "S.Paulo", "Tabao Da Serra", "Vargem Grande Paulista"];
const tipoEndereco = ["Entrega", "Cobrança"]
  

function FormEnderecoModal({register}) {
  return (
    <FormContainer>
      
          <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
            Novo Endereço
          </Titulo>

                <Opcoes>
                <li key={"pais"} style={{ width: "45%" }}>
                    <Input placeholder={"Brasil"} {...register("pais")} readOnly />
                </li>
                <li key={"estado"} style={{ width: "45%" }}>
                    <Input placeholder={"São Paulo"} {...register("estado")} readOnly />
                </li>
                <li key={"cidade"} style={{ width: "48%" }}>
                    <Select options={cidades} placeholder="Selecione a cidade" registro={"cidade"} register={register} />
                </li>
                <li key={"tpLogradouro"} style={{ width: "45%" }}>
                    <Select options={tiposLogradouro} placeholder="Selecione o tipo de logradouro" registro={"tpLogradouro"} register={register}/>
                </li>
                <li key={"logradouro"} style={{ width: "45%" }}>
                    <Input placeholder={"Logradouro"} {...register("logradouro")} />
                </li>
                <li key={"numeroEndereco"} style={{ width: "45%" }}>
                    <Input placeholder={"Número"} {...register("numeroEndereco")} />
                </li>

                <li key={"bairro"} style={{ width: "45%" }}>
                    <Input placeholder={"Bairro"} {...register("bairro")} />
                </li>
                <li key={"cep"} style={{ width: "45%" }}>
                    <Input placeholder={"CEP"} {...register("cep")} />
                </li>

                <li key={"tpResidencia"} style={{ width: "48%" }}>
                    <Select options={tipoResidencia} placeholder="Tipo de residência" registro={"tpResidencia"} register={register} />
                </li>

                <li key={"tpEndereco"} style={{ width: "45%"}}>
                    <Select options={tipoEndereco} placeholder="Tipo de Endereço" registro={"tpEndereco"} register={register} />
                </li>

                <li key={"EnderecoPreferencial"} style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <input type="checkbox" {...register("preferencial")} />
                    <CheckboxLabel>Endereço Preferencial</CheckboxLabel>
                </li>
               
          </Opcoes>
    </FormContainer>
  )
}

export default FormEnderecoModal;
