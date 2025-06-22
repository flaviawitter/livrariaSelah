import React, { useContext, useEffect }  from 'react'
import styled from 'styled-components'
import BotaoVermelho from '../Botões/BotaoVermelho';
import BotaoCinza from '../Botões/BotaoCinza';
import FormCartaoModal from '../FormsDados/FormCartaoModal';
import { criarCartaoNovo } from '../../serviços/cartao';
import { useAuth } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';


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

function ModalCartao({ showModal, setShowModal, setCartoes }) {

  const { idCliente } =  useAuth();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    console.log("ID do cliente carregado no modal:", idCliente);
  }, [idCliente]);


  const onSubmit = async (data) => {   
    
    if (!idCliente) {
      console.error("ID do cliente não definido!");
      return;
    }  

  
  const clienteIdInt = parseInt(idCliente);
  
    const cartao = {
      apelidoCartao: data.apelidoCartao, 
      nomeTitular: data.nomeTitular,
      numero: data.numeroCartao,
      validade: data.validade,
      codSeguranca: data.codSeguranca,
      bandeiraCartao: data.bandeiraCartao,
      preferencial: data.preferencial ? true : false,
      clienteId: idCliente  
    };

    //console.log(data.apelidoCartao);
    //console.log(data.nomeTitular);
    //cnsole.log(data.numeroCartao);
    //console.log(data.validade);
    //console.log(data.codSeguranca);
    //console.log(data.bandeiraCartao);
    //console.log(data.preferencial);
    //console.log(idCliente);
    
  
    try {
      const resposta = await criarCartaoNovo(idCliente, cartao);
      const novoCartao = resposta.data;
      setCartoes(prev => [...prev, novoCartao]); // Atualiza lista de cartões
      reset(); 
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao inserir cartão:", error);
    }
  };
  

  if (!showModal) return null;

  const onClose = () => setShowModal(false);

  return (
    <ModalContainer>
      <ModalContent>
        <FormCartaoModal register={register} />
        <ModalBotoes>
          <BotaoVermelho id="modal-botaoCartaoCadastrar" type="submit" onClick={handleSubmit(onSubmit)}>Salvar Cartão</BotaoVermelho>
          <BotaoCinza id="modal-botaoCartaoFechar" onClick={onClose}>Fechar</BotaoCinza>
        </ModalBotoes>
      </ModalContent>
    </ModalContainer>
  );
}

export default ModalCartao;


