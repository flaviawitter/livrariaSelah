import styled from 'styled-components'
import Header from '../componentes/Headers/Header';
import FormCliente from '../componentes/FormsDados/FormCliente';
import FormEndereco from '../componentes/FormsDados/FormEndereco';
import FormCartao from '../componentes/FormsDados/FormCartao';
import FormSenha from '../componentes/FormsDados/FormSenha';
import BotaoCinza from '../componentes/Botões/BotaoCinza';
import BotaoVerde from '../componentes/Botões/BotaoVerde';
import BotaoVermelho from '../componentes/Botões/BotaoVermelho';
import ModalEndereco from '../componentes/ModalEndereco';
import ModalCartao from '../componentes/ModalCartao';
import React, { useState, useContext, useEffect } from 'react';
import { atualizarTelefone, criarTelefone, deletarTelefone } from '../serviços/telefone';
import { useForm } from "react-hook-form";
import { criarCliente, deletarCliente, atualizarCliente } from '../serviços/cliente';
import { criarEndereco, deletarEndereco, criarEnderecoNovo, atualizarEndereco } from '../serviços/endereco';
import { atualizarCartao, criarCartao, deletarCartao } from '../serviços/cartao';
import { useAuth } from "../componentes/Context/AuthContext";
import { useToast } from '../componentes/Context/ToastContext';
import { useNavigate } from 'react-router-dom';

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
  const [modoEdicao, setModoEdicao] = useState(false);
  const { user, login, idCliente } =  useAuth();
  const { showToast } = useToast();
  const methods = useForm({ mode: "onBlur" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues
  } = methods;

  const onAtualizar = async (data) => {
    const clienteData = {
      nome: data.nome,
      email: data.email,
      cpf: data.cpf,
      genero: data.genero,
      dataNascimento: data.nascimento
    };

    const telefoneExistente = user.telefones?.[0];
    const telefoneData = {
      tipoTelefone: data.tipoTelefone,
      ddd: data.ddd,
      numero: data.numero,
      clienteId: idCliente
    };

    if (telefoneExistente) {
      await atualizarTelefone(telefoneExistente.id, telefoneData);
    } else if (telefoneData.numero) {
      await criarTelefone(telefoneData);
    }
    
    const enderecoEntregaData = {
      clienteId: idCliente,
      pais: 'Brasil',
      estado: 'São Paulo',
      tipoEndereco: 'Entrega',
      cidade: data.cidadeEntrega,
      logradouro: data.logradouroEntrega,
      numero: parseInt(data.numeroEnderecoEntrega),
      bairro: data.bairroEntrega,
      cep: data.cepEntrega,
      tipoResidencia: data.tpResidenciaEntrega,
      tipoLogradouro: data.tpLogradouroEntrega,
      preferencial: data.preferencialEntrega
    };

    const enderecoCobrancaData = {
      clienteId: idCliente,
      pais: 'Brasil',
      estado: 'São Paulo',
      tipoEndereco: 'Cobranca',
      cidade: data.cidadeCobranca,
      logradouro: data.logradouroCobranca,
      numero: parseInt(data.numeroEnderecoCobranca),
      bairro: data.bairroCobranca,
      cep: data.cepCobranca,
      tipoResidencia: data.tpResidenciaCobranca,
      tipoLogradouro: data.tpLogradouroCobranca,
      preferencial: data.preferencialCobranca
    };

    const cartaoData = {
      apelidoCartao: data.cartoes[0].apelidoCartao,
      nomeTitular: data.cartoes[0].nomeTitular,
      numero: data.cartoes[0].numero,
      validade: data.cartoes[0].validade,
      codSeguranca: data.cartoes[0].codSeguranca,
      bandeiraCartao: data.cartoes[0].bandeiraCartao,
      preferencial: data.cartoes[0].preferencial || false,
      clienteId: idCliente
    };

    const updatedCliente = await atualizarCliente(idCliente, clienteData);
    await atualizarEndereco(user.enderecos[0].id, enderecoEntregaData);
    await atualizarEndereco(user.enderecos[1].id, enderecoCobrancaData);
    await atualizarCartao(user.cartoes[0].id, cartaoData);
    showToast('Dados atualizados com sucesso!', 'success');
    login(updatedCliente.data, idCliente);

   
  };


  const onDelete = async (data) => {
    try {
      await deletarCartao(idCliente);
      await deletarEndereco(idCliente);
      await deletarTelefone(idCliente);
      await deletarCliente(idCliente);
      localStorage.removeItem("usuarioLogado");
      showToast('Conta excluída com sucesso!', 'success');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      console.log(error.request.response);
      showToast('Erro ao excluir conta. Tente novamente.', 'error');
    }
  }

  useEffect(() => {
    if (user) {
       console.log("Objeto USER recebido no contexto:", JSON.stringify(user, null, 2));

      // Encontra os endereços de entrega e cobrança no array de endereços do usuário
      const enderecoEntrega = user.enderecos?.find(e => e.tipoEndereco === 'Entrega');
      const enderecoCobranca = user.enderecos?.find(e => e.tipoEndereco === 'Cobranca');
      const telefonePrincipal = user.telefones?.[0];
      const cartaoPrincipal = user.cartoes?.[0];

      reset({
        // Dados do Cliente
        nome: user.nome || "",
        email: user.email || "",
        cpf: user.cpf || "",
        senha: "********",
        nascimento: user.dataNascimento ? new Date(user.dataNascimento).toISOString().split("T")[0] : "",
        genero: user.genero || "",

        // Telefone 
        tipoTelefone: telefonePrincipal?.tipoTelefone || "",
        ddd: telefonePrincipal?.ddd || "",
        numero: telefonePrincipal?.numero || "",

        // Endereço de Entrega 
        cidadeEntrega: enderecoEntrega?.cidade || "",
        tpLogradouroEntrega: enderecoEntrega?.tipoLogradouro || "",
        logradouroEntrega: enderecoEntrega?.logradouro || "",
        numeroEnderecoEntrega: enderecoEntrega?.numero || "",
        bairroEntrega: enderecoEntrega?.bairro || "",
        cepEntrega: enderecoEntrega?.cep || "",
        tpResidenciaEntrega: enderecoEntrega?.tipoResidencia || "",
        preferencialEntrega: enderecoEntrega?.preferencial || false,

        // Endereço de Cobrança 
        cidadeCobranca: enderecoCobranca?.cidade || "",
        tpLogradouroCobranca: enderecoCobranca?.tipoLogradouro || "",
        logradouroCobranca: enderecoCobranca?.logradouro || "",
        numeroEnderecoCobranca: enderecoCobranca?.numero || "",
        bairroCobranca: enderecoCobranca?.bairro || "",
        cepCobranca: enderecoCobranca?.cep || "",
        tpResidenciaCobranca: enderecoCobranca?.tipoResidencia || "",
        preferencialCobranca: enderecoCobranca?.preferencial || false,

        // Cartão de Crédito 
        // react-hook-form usa o nome do campo para aninhar os dados
        cartoes: [{
            apelidoCartao: cartaoPrincipal?.apelidoCartao || "",
            numero: cartaoPrincipal?.numero || "",
            codSeguranca: cartaoPrincipal?.codSeguranca || "",
            validade: cartaoPrincipal?.validade || "",
            nomeTitular: cartaoPrincipal?.nomeTitular || "",
            bandeiraCartao: cartaoPrincipal?.bandeiraCartao || "",
            preferencial: cartaoPrincipal?.preferencial || false
        }]
      });
    } else {
      // Limpa o formulário no logout
      reset({});
    }
  }, [user, reset]); // A dependência em 'user' é a chave aqui

  if (!user) {
    return (
      <AppContainer>
        <Header />
        <p>Carregando...</p>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Header />
      <div key={user.id}>
      <DadosContainer>
        <FormCliente register={register} control={control} user={user} disabled={!modoEdicao} />
        {user?.enderecos?.length > 0 && <FormEndereco register={register} control={control} user={user} disabled={!modoEdicao} />}
        <BotaoCinza id="dados-botaoAdicionarEndereco" onClick={() => setShowModalEndereco(true)} style={{ width: "100%", marginLeft: "1%" }}>Adicionar Endereço</BotaoCinza>
        {user?.cartoes?.length > 0 && <FormCartao register={register} control={control} user={user} disabled={!modoEdicao} />}
        <BotaoCinza id="dados-botaoAdicionarCartao" onClick={() => setShowModalCartao(true)} style={{ width: "100%", marginLeft: "1%" }}>Adicionar Cartão</BotaoCinza>
        <FormSenha register={register} idCliente={idCliente} />
      </DadosContainer>
      <BotaoContainer>
        {!modoEdicao ? (
          <BotaoVermelho onClick={() => setModoEdicao(true)}>Editar Dados</BotaoVermelho>
        ) : (
          <>
            <BotaoVerde onClick={handleSubmit(onAtualizar)}>Salvar</BotaoVerde>
            <BotaoCinza onClick={() => { reset(); setModoEdicao(false); }}>Cancelar</BotaoCinza>
          </>
        )}
        <BotaoCinza id="dados-botaoExcluir" type="submit" onClick={handleSubmit(onDelete)}>Excluir Conta</BotaoCinza>
      </BotaoContainer>
        </div>
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


export default App;
