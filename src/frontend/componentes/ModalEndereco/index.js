// ModalEndereco.js
import React from 'react'
import styled from 'styled-components'
import FormEnderecoModal from '../FormEnderecoModal'
import BotaoVermelho from '../BotaoVermelho';
import BotaoCinza from '../BotaoCinza';
import { criarEnderecoNovo } from '../../serviços/endereco'

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
  padding: 30px;
  border-radius: 25px;
  max-width: 500px;
  width: 90%;
`;

const CloseButton = styled.button`
  background-color: #c7511b;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
`;

const ModalBotoes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
`


function ModalEndereco({ showModal, setShowModal, register, handleSubmit, idCliente }) {

    const onSubmit = async (data) => {    

      console.log(data);

      if (!idCliente) {
        console.error("ID do cliente não definido!");
        return;
      }  

        const endereco = {
          clienteId: idCliente,
          pais: "Brasil",
          estado: "São Paulo",
          cidade: data.cidade,
          logradouro: data.logradouro,
          numero: parseInt(data.numeroEndereco),
          bairro: data.bairro,
          cep: data.cep,
          tipoResidencia: data.tpResidencia,
          tipoLogradouro: data.tpLogradouro,
          tipoEndereco: data.tpEndereco,
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

        try {
          await criarEnderecoNovo(idCliente, endereco); 
          console.log();
          setShowModal(false);
        } catch (error) {
          console.error("Erro ao inserir cartão:", error);
        }
    }

  if (!showModal) return null;

  const onClose = () => setShowModal(false);

  return (
    <ModalContainer>
      <ModalContent>
        <FormEnderecoModal register={register} />
        <ModalBotoes>
            <BotaoVermelho type="submit" onClick={handleSubmit(onSubmit)}>Salvar Endereço</BotaoVermelho>
            <BotaoCinza onClick={onClose}>Fechar</BotaoCinza>
        </ModalBotoes>
      </ModalContent>
    </ModalContainer>
  );
}

export default ModalEndereco;


