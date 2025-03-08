
import styled from 'styled-components'
import Header from '../componentes/Header';
import FormCliente from '../componentes/FormCliente';
import FormEndereco from '../componentes/FormEndereco';
import FormCartao from '../componentes/FormCartao';
import FormSenha from '../componentes/FormSenha';
import BotaoVermelho from '../componentes/BotaoVermelho';
import BotaoCinza from '../componentes/BotaoCinza';

import dados from '../serviços/dados'

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
      cpf: data.cpf,
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