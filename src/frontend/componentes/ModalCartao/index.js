// ModalEndereco.js
import React from 'react'
import styled from 'styled-components'
import BotaoVermelho from '../BotaoVermelho';
import BotaoCinza from '../BotaoCinza';
import FormCartaoModal from '../FormCartaoModal';

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


function ModalCartao({ showModal, setShowModal, register, handleSubmit }) {

    const onSubmit = async (data) => {    
      const cartao = {
        apelidoCartao: data.apelidoCartao,
        nomeTitular: data.nomeTitular,
        numero: data.numeroCartao,
        validade: data.validade,
        codSeguranca: data.codSeguranca,
        bandeiraCartao: data.bandeiraCartao,
        preferencial: data.preferencial || false,
        clienteId: 1
      }
    }

  if (!showModal) return null;

  const onClose = () => setShowModal(false);

  return (
    <ModalContainer>
      <ModalContent>
        <FormCartaoModal register={register} />
        <ModalBotoes>
            <BotaoVermelho type="submit" onClick={handleSubmit(onSubmit)}>Salvar Cartão</BotaoVermelho>
            <BotaoCinza onClick={onClose}>Fechar</BotaoCinza>
        </ModalBotoes>
      </ModalContent>
    </ModalContainer>
  );
}

export default ModalCartao;


