
import styled from 'styled-components'
import Header from '../componentes/Header';
import FormCliente from '../componentes/FormCliente';
import FormEndereco from '../componentes/FormEndereco';
import FormCartao from '../componentes/FormCartao';
import FormSenha from '../componentes/FormSenha';
import BotaoVermelho from '../componentes/BotaoVermelho';
import BotaoCinza from '../componentes/BotaoCinza';


import { useForm } from "react-hook-form"
import { criarEndereco } from '../serviços/endereco';

const AppContainer = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #ffff; 
    margin: 0;
`
const DadosContainer = styled.div`
    width: 95%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const BotaoContainer = styled.div`
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    padding: 10px;
`


function App() {
  const {
    register,
    handleSubmit,
  } = useForm(
    {
      mode: "onBlur"
    }
  )

  const onSubmit = async (data) => {
    const cliente = {
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      genero: data.genero,
      nascimento: data.nascimento,
      tipoTelefone: data.tipoTelefone,
      ddd: data.ddd,
      numero: data.numero
    }
    const enderecoEntrega = {
      clienteId: 1,
      estado: data.estadoEntrega,
      cidade: data.cidadeEntrega,
      logradouro: data.logradouroEntrega,
      numero: parseInt(data.numeroEnderecoEntrega),
      bairro: data.bairroEntrega,
      cep: data.cepEntrega,
      tpResidencia: data.tpResidenciaEntrega,
      tpLogradouro: data.tpLogradouroEntrega,
      tpEndereco: data.tpEnderecoEntrega
    }

    const enderecoCobranca = {
      clienteId: 1,
      estado: data.estadoCobranca,
      cidade: data.cidadeCobranca,
      logradouro: data.logradouroCobranca,
      numero: parseInt(data.numeroEnderecoCobranca),
      complemento: data.complementoCobranca,
      bairro: data.bairroCobranca,
      cep: data.cepCobranca,
      pontoReferencia: data.ptReferenciaCobranca,
      tipoResidencia: data.tpResidenciaCobranca,
      tipoLogradouro: data.tpLogradouroCobranca,
      tipoEndereco: data.tpEnderecoCobranca
    }

    const cartao = {
      nomeTitular: data.nomeTitular,
      numeroCartao: data.numeroCartao,
      validade: data.validade,
      cvv: data.cvv
    }

    const senha = {
      senhaAtual: data.senhaAtual,
      senhaNova: data.senhaNova
    }


    await criarEndereco(enderecoCobranca)
    // console.log(cliente)
    console.log(enderecoCobranca)
    console.log(enderecoEntrega)
    // console.log(cartao)
    // console.log(senha)

  }

  return (
    <AppContainer>
      <Header />
      <DadosContainer>
        <FormCliente register={register} />
        <FormEndereco register={register}/>
        <FormCartao register={register}/>
        <FormSenha register={register}/>
      </DadosContainer>
      <BotaoContainer>
        <BotaoVermelho type="submit" onClick={handleSubmit(onSubmit)}>Salvar Dados</BotaoVermelho>
        <BotaoCinza type="button">Excluir Conta</BotaoCinza>
      </BotaoContainer>
    </AppContainer>
  );
}

export default App