import Input from "../../Inputs/Input";
import styled from "styled-components";
import Select from "../../Botões/Select";
import InputMask from 'react-input-mask';

const FormContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: auto;
    width: 90%;
    margin: 15px;
    margin-bottom: 5px;
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
    margin-bottom: 0;
`;
const CheckboxLabel = styled.label`
    color: #095F54;
    font-size: 16px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
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

const tipoResidencia = ["Casa", "Apartamento", "Sobreloja", "Outro"];
const tiposLogradouro = ["Avenida", "Rua", "Alameda", "Rodovia", "Outro"];
const cidades = ["Aruja", "Barueri", "Biritiba-Mirim", "Boituva", "Campinas", "Cajamar", "Caieiras", "Carapicuiba", "Cotia", "Cubatao", "Diadema", "Embu", "Embu-Guacu", "Ferraz De Vasconcelos", "Francisco Morato", "Guararema", "Guarulhos", "Itapevi", "Itaquaquecetuba", "Itapecerica Da Serra", "Jandira", "Juquitiba", "Jundiai", "Mairipora", "Maua", "Miracatu", "Mogi Das Cruzes", "Osasco", "Poa", "Pirapora Bom Jesus", "Quetuz", "Registro", "Ribeirao Pires", "Rio Grande Da Serra", "Santana De Parnaiba", "Salesopolis", "Santo Andre", "Sao Bernardo Do Campo", "Sao Caetano Do Sul", "Sao Paulo", "Suzano", "S.Isabel", "S.Lourenco Da Serra", "S.Andre", "S.Caetano Do Sul", "S.Paulo", "Tabao Da Serra", "Vargem Grande Paulista"];
const tipoEndereco = ["Entrega", "Cobrança"];

function FormEnderecoModal({register}) {
    return (
      <FormContainer>
  
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
              Novo Endereço
            </Titulo>
  
                  <Opcoes>
                  <li key={"pais"} style={{ width: "45%" }}>
                      <Input placeholder={"Brasil"} id="modal-enderecoPais" {...register("pais")} readOnly />
                  </li>
                  <li key={"estado"} style={{ width: "45%" }}>
                     <Input placeholder={"São Paulo"} id="modal-enderecoEstado" {...register("estado")} readOnly />
                 </li>
                 <li key={"cidade"} style={{ width: "48%" }}>
                     <Select options={cidades} id="modal-enderecoCidade" placeholder="Selecione a cidade" registro={"cidade"} {...register("cidade", { required: true })} />
                 </li>
                 <li key={"tipoLogradouro"} style={{ width: "45%" }}>
                     <Select options={tiposLogradouro} id="modal-enderecoTpLogradouro" placeholder="Selecione o tipo de logradouro" name="tipoLogradouro" {...register("tipoLogradouro", { required: true })}/>
                 </li>
                 <li key={"logradouro"} style={{ width: "45%" }}>
                     <Input placeholder={"Logradouro"} id="modal-enderecoLogradouro" {...register("logradouro", { required: true })} />
                 </li>
                 <li key={"numeroEndereco"} style={{ width: "45%" }}>
                     <Input placeholder={"Número"} id="modal-enderecoNumeroEndereco" {...register("numeroEndereco", { required: true })} />
                 </li>
                 <li key={"bairro"} style={{ width: "45%" }}>
                     <Input placeholder={"Bairro"} id="modal-enderecoBairro" {...register("bairro", { required: true })} />
                 </li>
                 <li key={"cep"} style={{ width: "45%" }}>
                    <StyledInputMask mask="99999-999" id="modal-enderecoCEP" placeholder={"CEP"} {...register("cep", { required: true })} />
                 </li>
                 <li key={"tpResidencia"} style={{ width: "48%" }}>
                     <Select options={tipoResidencia} id="modal-enderecoTpResidencia" placeholder="Tipo de residência" registro={"tpResidencia"} {...register("tipoResidencia", { required: true })} />
                 </li>
                <li key={"tpEndereco"} style={{ width: "45%" }}>
                    <Select options={tipoEndereco} id="modal-tpEndereco" placeholder="Tipo de Endereço" registro={"tpEndereco"} {...register("tipoEndereco", { required: true })} />
                </li>
                <li style={{ width: "100%", display: "flex", alignItems: "center" }}>
                    <input type="checkbox" id="modal-enderecoPreferencial" {...register("preferencial")} />
                    <CheckboxLabel>Endereço Preferencial</CheckboxLabel>
                </li>
            </Opcoes>
        </FormContainer>
    );
}

export default FormEnderecoModal;
