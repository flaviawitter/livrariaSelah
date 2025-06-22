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
import { AuthContext } from "../componentes/Context/AuthContext";
import { useToast } from '../componentes/Context/ToastContext';

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
  const { user, login } = useContext(AuthContext);
  const [idCliente, setIdCliente] = useState(user?.id || null);
  const { showToast } = useToast();
  const methods = useForm({ mode: "onBlur" });

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues
  } = methods;

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
  }

  const onAtualizar = async (data) => {
    if (!idCliente) {
      showToast('Erro: ID do cliente não encontrado.', 'error');
      return;
    }

    try {
      // 1. Atualiza os dados principais do cliente
      const clienteData = {
        nome: data.nome,
        email: data.email,
        cpf: data.cpf,
        genero: data.genero,
        dataNascimento: data.nascimento,
      };
      const updatedCliente = await atualizarCliente(idCliente, clienteData);

      // --- Lógica para Telefone ---
      const telefoneExistente = user.telefones?.[0];
      const telefoneData = { tipoTelefone: data.tipoTelefone, ddd: data.ddd, numero: data.numero, clienteId: idCliente };

      if (telefoneExistente) {
        // Atualiza usando o ID do telefone
        await atualizarTelefone(telefoneExistente.id, telefoneData);
      } else if (telefoneData.numero) {
        // Cria se não existir e um número for fornecido
        await criarTelefone(telefoneData); 
      }

      // --- Lógica para Endereço de Entrega ---
      const enderecoEntregaExistente = user.enderecos?.find(e => e.tipoEndereco === 'Entrega');
      const enderecoEntregaData = {
          clienteId: idCliente, pais: "Brasil", estado: "São Paulo", tipoEndereco: "Entrega",
          cidade: data.cidadeEntrega, logradouro: data.logradouroEntrega, numero: parseInt(data.numeroEnderecoEntrega),
          bairro: data.bairroEntrega, cep: data.cepEntrega, tipoResidencia: data.tpResidenciaEntrega,
          tipoLogradouro: data.tpLogradouroEntrega, preferencial: data.preferencialEntrega
      };

      if (enderecoEntregaExistente) {
        await atualizarEndereco(enderecoEntregaExistente.id, enderecoEntregaData);
      } else if (enderecoEntregaData.cidade) {
        await criarEndereco(enderecoEntregaData);
      }
      
      // --- Lógica para Endereço de Cobrança ---
      const enderecoCobrancaExistente = user.enderecos?.find(e => e.tipoEndereco === 'Cobranca');
      const enderecoCobrancaData = {
          clienteId: idCliente, pais: "Brasil", estado: "São Paulo", tipoEndereco: "Cobranca",
          cidade: data.cidadeCobranca, logradouro: data.logradouroCobranca, numero: parseInt(data.numeroEnderecoCobranca),
          bairro: data.bairroCobranca, cep: data.cepCobranca, tipoResidencia: data.tpResidenciaCobranca,
          tipoLogradouro: data.tpLogradouroCobranca, preferencial: data.preferencialCobranca
      };

      if (enderecoCobrancaExistente) {
          await atualizarEndereco(enderecoCobrancaExistente.id, enderecoCobrancaData);
      } else if (enderecoCobrancaData.cidade) {
          await criarEndereco(enderecoCobrancaData);
      }

      // --- Lógica para Cartão ---
      const cartaoExistente = user.cartoes?.[0];
      const cartaoData = {
        apelidoCartao: data.cartoes[0].apelidoCartao, nomeTitular: data.cartoes[0].nomeTitular,
        numero: data.cartoes[0].numero, validade: data.cartoes[0].validade, codSeguranca: data.cartoes[0].codSeguranca,
        bandeiraCartao: data.cartoes[0].bandeiraCartao, preferencial: data.cartoes[0].preferencial || false, clienteId: idCliente
      };
      
      if (cartaoExistente) {
        await atualizarCartao(cartaoExistente.id, cartaoData);
      } else if (cartaoData.numero) {
        await criarCartao(cartaoData); 
      }
      
      login(updatedCliente.data, idCliente); 
      showToast('Dados atualizados com sucesso!', 'success');
      setModoEdicao(false);

    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      showToast('Falha ao atualizar dados. Tente novamente.', 'error');
    }
}

  const onDelete = async (data) => {
    try {
      await deletarCartao(idCliente);
      await deletarEndereco(idCliente);
      await deletarTelefone(idCliente);
      await deletarCliente(idCliente);
    } catch (error) {
      console.log(error.request.response)
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


  useEffect(() => {
    setIdCliente(user?.id || null);
  }, [user]);

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
