
import styled from 'styled-components'
import Header from '../componentes/Headers/Header';
import FormCliente from '../componentes/FormsDados/FormCliente';
import FormEndereco from '../componentes/FormsDados/FormEndereco';
import FormCartao from '../componentes/FormsDados/FormCartao';
import FormSenha from '../componentes/FormsDados/FormSenha';
import BotaoVermelho from '../componentes/Botões/BotaoVermelho';
import BotaoCinza from '../componentes/Botões/BotaoCinza';
import BotaoVerde from '../componentes/Botões/BotaoVerde';
import ModalEndereco from '../componentes/ModalEndereco';
import ModalCartao from '../componentes/ModalCartao';
import React, { useState, useContext } from 'react';
import { atualizarTelefone, criarTelefone, deletarTelefone } from '../serviços/telefone';
import { useForm } from "react-hook-form";
import { criarCliente, deletarCliente, atualizarCliente } from '../serviços/cliente';
import { criarEndereco, deletarEndereco, criarEnderecoNovo, atualizarEndereco } from '../serviços/endereco';
import { atualizarCartao, criarCartao, deletarCartao } from '../serviços/cartao';
import { AuthContext } from "../componentes/Context/AuthContext";
  
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
  const [setIdCliente] = useState(null);
  const { user, idCliente } = useContext(AuthContext);


  const {
    register,
    handleSubmit,
    reset
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


      const newCliente = await criarCliente(cliente);
      const idCliente = newCliente.data.id;
      setIdCliente(idCliente);
    
    const telefone = {
      tipoTelefone: data.tipoTelefone,
      ddd: data.ddd,
      numero: data.numero,
      clienteId: idCliente
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
      tipoEndereco: "Cobranca",
      preferencial: data.preferencialCobranca
    }

   await criarEndereco(enderecoCobranca)

    const enderecoEntrega = {
      clienteId: idCliente,
      pais: "Brasil",
      estado: "São Paulo",
      cidade: data.cidadeEntrega,
      logradouro: data.logradouroEntrega,
      numero: parseInt(data.numeroEnderecoEntrega),
      bairro: data.bairroEntrega,
      cep: data.cepEntrega,
      tipoResidencia: data.tpResidenciaEntrega,
      tipoLogradouro: data.tpLogradouroEntrega,
      tipoEndereco: "Entrega",
      preferencial: data.preferencialEntrega
    }

   await criarEndereco(enderecoEntrega)

    const cartao = {
      apelidoCartao: data.apelidoCartao,
      nomeTitular: data.nomeTitular,
      numero: data.numeroCartao,
      validade: data.validade,
      codSeguranca: data.codSeguranca,
      bandeiraCartao: data.bandeiraCartao,
      preferencial: data.preferencial ? true : false,
      clienteId: idCliente
    }

    const senha = {
      senhaAtual: data.senhaAtual,
      senhaNova: data.senhaNova
    }
    
   await criarCartao(cartao)
   await criarTelefone(telefone)

    console.log(cliente)
    console.log(telefone)
    console.log(enderecoCobranca)
    console.log(enderecoEntrega)
    console.log(cartao)
  }

  const onAtualizar = async (data) => {
        
    if(idCliente){
      const cliente = {
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        genero: data.genero,
        dataNascimento: data.nascimento,
        ranking: 0
      };  

      const telefone = {
        tipoTelefone: data.tipoTelefone,
        ddd: data.ddd,
        numero: data.numero,
        clienteId: idCliente
      };

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
        tipoEndereco: "Cobranca",
        preferencial: data.preferencialCobranca
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
        tipoResidencia: data.tpResidenciaEntrega,
        tipoLogradouro: data.tpLogradouroEntrega,
        tipoEndereco: "Entrega",
        preferencial: data.preferencialEntrega
      }

      const cartao = {
        apelidoCartao: data.apelidoCartao,
        nomeTitular: data.nomeTitular,
        numero: data.numeroCartao,
        validade: data.validade,
        codSeguranca: data.codSeguranca,
        bandeiraCartao: data.bandeiraCartao,
        preferencial: data.preferencial ? true : false,
        clienteId: idCliente
      }
  
      await atualizarCliente(idCliente, cliente);
      await atualizarTelefone(idCliente, telefone);
      await atualizarEndereco(idCliente, enderecoCobranca);
      await atualizarEndereco(idCliente, enderecoEntrega);
      await atualizarCartao(idCliente, cartao);
      console.log("Dados Atualizados com sucesso!")

      
   }else{
    console.log("Não há cliente para atualizar, primeiro faça o cadastro.")
   }
  } 

  const onDelete = async (data) => {
    try {
      await deletarCartao(idCliente);
      console.log("Cartão excluído com sucesso!")
      await deletarEndereco(idCliente);
      console.log("Endereço excluído com sucesso!")
      await deletarTelefone(idCliente);
      console.log("Telefone excluído com sucesso!")
      await deletarCliente(idCliente);
      console.log("Cliente excluído com sucesso!")

      
    } catch (error) {
      console.log(error.request.response)
    }
  }

  console.log("Usuário autenticado:", user);

  return (
    <AppContainer>
      <Header />
      <DadosContainer>
        <FormCliente register={register} user={user}/>
        {user?.enderecos?.length > 0 && <FormEndereco register={register} user={user}/>}
        <BotaoCinza  id="dados-botaoAdicionarEndereco" onClick={() => setShowModalEndereco(true)} style={{ width: "100%", marginLeft: "1%" }}>Adicionar Endereço</BotaoCinza>
        {user?.cartoes?.length > 0 &&<FormCartao register={register} user={user}/>}
        <BotaoCinza id="dados-botaoAdicionarCartao" onClick={() => setShowModalCartao(true)} style={{ width: "100%", marginLeft: "1%" }}>Adicionar Cartão</BotaoCinza>
        <FormSenha register={register} idCliente={idCliente} />
      </DadosContainer>
      <BotaoContainer>
        <BotaoVermelho id="dados-botaoSalvar" type="submit" onClick={handleSubmit(onSubmit)}>Salvar Dados</BotaoVermelho>
        <BotaoVerde id="dados-botaoAtualizarDados" type="submit" onClick={handleSubmit(onAtualizar)}>Atualizar Dados</BotaoVerde>
        <BotaoCinza id="dados-botaoExcluir" type="submit" onClick={handleSubmit(onDelete)}>Excluir Conta</BotaoCinza>
      </BotaoContainer>


      <ModalEndereco
        showModal={showModalEndereco}
        setShowModal={setShowModalEndereco}
        register={register}
        handleSubmit={handleSubmit}
        idCliente={idCliente} 
        reset={reset} 
      />
      <ModalCartao
        showModal={showModalCartao}
        setShowModal={setShowModalCartao}
        register={register}
        handleSubmit={handleSubmit}
        idCliente={idCliente}
        
      />
    </AppContainer>

    
  );
}

export default App