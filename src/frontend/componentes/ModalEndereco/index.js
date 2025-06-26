// ModalEndereco.js
import React from 'react'
import styled from 'styled-components'
import FormEnderecoModal from '../FormsDados/FormEnderecoModal';
import BotaoVermelho from '../Botões/BotaoVermelho';
import BotaoCinza from '../Botões/BotaoCinza';
import { criarEnderecoNovo } from '../../serviços/endereco'
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useToast } from "../Context/ToastContext";
import { useAuth } from '../Context/AuthContext';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled.div`
 background-color: white;
  padding: 10px;
  border-radius: 25px;
  width: 90%;
  max-width: 600px;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 0;
`;
const CloseButton = styled.button`
  background-color: #c7511b;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  border: 0;
`;
const ModalBotoes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    border: 0;
`

function ModalEndereco({ showModal, setShowModal, setEnderecos }) {

  const { idCliente } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const { showToast } = useToast();

  useEffect(() => {
    if (showModal) reset(); // Reseta os valores ao abrir o modal
  }, [idCliente, showModal, reset]);

    console.log("ID do cliente carregado no modal endereco:", idCliente);

    const onSubmit = async (data) => {    
  if (!idCliente) {
    showToast("Faça login!", "error");
    return;
  }  

  const endereco = {
    clienteId: idCliente , 
    pais: "Brasil",
    estado: "São Paulo",
    cidade: data.cidade,
    logradouro: data.logradouro,
    numero: parseInt(data.numeroEndereco),
    bairro: data.bairro,
    cep: data.cep,
    tipoResidencia: data.tipoResidencia,
    tipoLogradouro: data.tipoLogradouro,
    tipoEndereco: data.tipoEndereco,
    preferencial: data.preferencial ? true : false
  }

  try {
  const resposta = await criarEnderecoNovo(idCliente, endereco);

  // Verifica se a resposta é válida (status 2xx e data presente)
  if (resposta?.data) {
    const novoEndereco = resposta.data;
    setEnderecos(prev => [...prev, novoEndereco]); 
    showToast("Endereço salvo com sucesso!", "success");
    setShowModal(false);
  } else {
    console.error("Resposta inesperada:", resposta);
    showToast("Endereço salvo com sucesso!", "success");
  }
} catch (error) {
  console.error("Erro ao salvar endereço:", error);
  showToast("Erro ao inserir endereço", "error");
}

    }

  if (!showModal) return null;

  const onClose = () => setShowModal(false);

  return (
    <ModalContainer>
      <ModalContent>
        <FormEnderecoModal register={register} />
        <ModalBotoes>
          <BotaoVermelho id="modal-botaoEnderecoCadastrar" type="submit" onClick={handleSubmit(onSubmit)}>Salvar Endereço</BotaoVermelho>
          <BotaoCinza id="modal-botaoEnderecoFechar" onClick={onClose}>Fechar</BotaoCinza>
        </ModalBotoes>
      </ModalContent>
    </ModalContainer>
  );
}

export default ModalEndereco;



