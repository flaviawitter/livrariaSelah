// ModalEndereco.js
import React from 'react'
import styled from 'styled-components'
import FormEnderecoModal from '../FormsDados/FormEnderecoModal';
import BotaoVermelho from '../Botões/BotaoVermelho';
import BotaoCinza from '../Botões/BotaoCinza';
import { criarEnderecoNovo } from '../../serviços/endereco'
import { useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { AuthContext } from '../Context/AuthContext';


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


function ModalEndereco({ showModal, setShowModal, register, handleSubmit, reset }) {
  
  const { idCliente } = useContext(AuthContext);

  useEffect(() => {
    if (showModal) {
      reset(); // Reseta os valores ao abrir o modal
    }
    console.log("ID do cliente carregado no modal:", idCliente);
  }, [idCliente, showModal, reset]);
  
    const onSubmit = async (data) => {    

      console.log(data);

      if (!idCliente) {
        console.error("ID do cliente não definido!");
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

        console.log(data.cidade);
        console.log(data.tpLogradouro);
        console.log(data.logradouro);
        console.log(data.numeroEndereco);
        console.log(data.bairro);
        console.log(data.cep);
        console.log(data.tpResidencia);
        console.log(data.tpEndereco);
        console.log('endereco:', endereco);

        try {
          await criarEnderecoNovo(idCliente, endereco); 
          console.log();
          setShowModal(false);
        } catch (error) {
          console.error("Erro ao inserir endereço:", error);
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



