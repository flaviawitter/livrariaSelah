
import styled from 'styled-components'
import Header from '../componentes/Header';
import FormCliente from '../componentes/FormCliente';
import FormEndereco from '../componentes/FormEndereco';
import FormCartao from '../componentes/FormCartao';
import FormSenha from '../componentes/FormSenha';
import BotaoVermelho from '../componentes/BotaoVermelho';
import BotaoCinza from '../componentes/BotaoCinza';


import { useForm } from "react-hook-form"

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

  const onSubmit = (data) => {
    console.log(data)
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
      estadoEntrega: data.estadoEntrega,
      cidadeEntrega: data.cidadeEntrega,
      logradouroEntrega: data.logradouroEntrega,
      numeroEnderecoEntrega: data.numeroEnderecoEntrega,
      complementoEntrega: data.complementoEntrega,
      bairroEntrega: data.bairroEntrega,
      cepEntrega: data.cepEntrega,
      ptReferenciaEntrega: data.ptReferenciaEntrega,
      tpResidenciaEntrega: data.tpResidenciaEntrega,
      tpLogradouroEntrega: data.tpLogradouroEntrega,
      tpEnderecoEntrega: data.tpEnderecoEntrega
    }

    const enderecoCobranca = {
      estadoCobranca: data.estadoCobranca,
      cidadeCobranca: data.cidadeCobranca,
      logradouroCobranca: data.logradouroCobranca,
      numeroEnderecoCobranca: data.numeroEnderecoCobranca,
      complementoCobranca: data.complementoCobranca,
      bairroCobranca: data.bairroCobranca,
      cepCobranca: data.cepCobranca,
      ptReferenciaCobranca: data.ptReferenciaCobranca,
      tpResidenciaCobranca: data.tpResidenciaCobranca,
      tpLogradouroCobranca: data.tpLogradouroCobranca,
      tpEnderecoCobranca: data.tpEnderecoCobranca
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