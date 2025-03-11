
import styled from 'styled-components'
import Header from '../componentes/Header';
import FormCliente from '../componentes/FormCliente';
import FormEndereco from '../componentes/FormEndereco';
import FormCartao from '../componentes/FormCartao';
import FormSenha from '../componentes/FormSenha';
import BotaoVermelho from '../componentes/BotaoVermelho';
import BotaoCinza from '../componentes/BotaoCinza';
import ModalEndereco from '../componentes/ModalEndereco';
import ModalCartao from '../componentes/ModalCartao';
import React, { useState } from 'react';
import { criarTelefone } from '../serviços/telefone';
import { useForm } from "react-hook-form";
//import { criarEndereco } from '../serviços/endereco';
import { criarCliente } from '../serviços/cliente';
//import { criarCartao } from '../serviços/cartao';


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

  const [showModalEndereco, setShowModalEndereco] = useState(false);  
  const [showModalCartao, setShowModalCartao] = useState(false);
  
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
      senha: data.senha,
      genero: data.genero,
      dataNascimento: data.nascimento,
      ranking: 0
    }

    const newCliente = await criarCliente(cliente)
    const idCliente = newCliente.data.id


    const telefone = {
      tipoTelefone: data.tipoTelefone,
      ddd: data.ddd,
      numero: data.numero,
      clienteId: idCliente
    }

    const enderecoEntrega = {
      clienteId: idCliente,
      pais: "Brasil",
      estado: "São Paulo",
      cidade: data.cidadeEntrega,
      logradouro: data.logradouroEntrega,
      numero: parseInt(data.numeroEnderecoEntrega),
      bairro: data.bairroEntrega,
      cep: data.cepEntrega,
      tpResidencia: data.tpResidenciaEntrega,
      tpLogradouro: data.tpLogradouroEntrega,
      tpEndereco: "Entrega"
    }

    const enderecoCobranca = {
      clienteId: idCliente,
      pais: "Brasil",
      estado: "São Paulo",
      cidade: data.cidadeCobranca,
      logradouro: data.logradouroCobranca,
      numero: parseInt(data.numeroEnderecoCobranca),
      bairro: data.bairroCobranca,
      cep: data.cepCobranca,
      tipoResidencia: data.tpResidenciaCobranca,
      tipoLogradouro: data.tpLogradouroCobranca,
      tipoEndereco: "Cobranca"
    }

    const cartao = {
      apelidoCartao: data.apelidoCartao,
      nomeTitular: data.nomeTitular,
      numero: data.numeroCartao,
      validade: data.validade,
      codSeguranca: data.codSeguranca,
      bandeiraCartao: data.bandeiraCartao,
      preferencial: data.preferencial || false,
      clienteId: idCliente
    }

    const senha = {
      senhaAtual: data.senhaAtual,
      senhaNova: data.senhaNova
    }

      
    //await criarCartao(cartao)
    //await criarEndereco(enderecoCobranca)
    await criarTelefone(telefone)

    console.log(telefone)
    //console.log(cliente)
    //console.log(enderecoCobranca)
    //console.log(enderecoEntrega)
    //console.log(cartao)
    // console.log(senha)

  }

  return (
    <AppContainer>
      <Header />
      <DadosContainer>
        <FormCliente register={register}/>
        <FormEndereco register={register}/>
        <BotaoCinza onClick={() => setShowModalEndereco(true)} style={{ width: "100%", marginLeft: "1%" }}>Adicionar Endereço</BotaoCinza>
        <FormCartao register={register}/>
        <BotaoCinza onClick={() => setShowModalCartao(true)} style={{ width: "100%", marginLeft: "1%" }}>Adicionar Cartão</BotaoCinza>
        <FormSenha register={register}/>
      </DadosContainer>
      <BotaoContainer>
        <BotaoVermelho type="submit" onClick={handleSubmit(onSubmit)}>Salvar Dados</BotaoVermelho>
        <BotaoCinza type="button">Excluir Conta</BotaoCinza>
      </BotaoContainer>


      <ModalEndereco
        showModal={showModalEndereco}
        setShowModal={setShowModalEndereco}
        register={register}
        handleSubmit={handleSubmit}
      />
      <ModalCartao
        showModal={showModalCartao}
        setShowModal={setShowModalCartao}
        register={register}
        handleSubmit={handleSubmit}
      />

    </AppContainer>
  );
}

export default App