import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import BotaoCinza from '../Botões/BotaoCinza';
import { atualizarCliente, listarCliente } from '../../serviços/cliente';
import { useToast } from "../Context/ToastContext";
import { AuthContext } from "../Context/AuthContext";

const OrderCard = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 15px 0;
`;
const OrderInfo = styled.p`
  font-size: 14px;
  color: #333;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

function CardClienteAdm({ user }) {
  const { showToast } = useToast();
  const { idCliente } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await listarCliente();
        console.log(response.data);
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        showToast('Erro ao buscar clientes.', 'error');
      }
    }

    fetchClientes();
  }, []);

  const handleCliente = async (idCliente, novoStatus) => {
    try {
      await atualizarCliente(idCliente, novoStatus);
      showToast('Status do cliente atualizado!', 'success');
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      showToast('Erro ao atualizar status do cliente.', 'error');
    }
  };
  

  return (
    <>
      {clientes.map((cliente) => (
        <OrderCard key={cliente.id}>
          <OrderInfo><strong>{cliente.nome}</strong></OrderInfo>
          <OrderInfo>E-mail: {cliente.email}</OrderInfo>
          <OrderInfo>CPF: {cliente.cpf}</OrderInfo>
          <OrderInfo>Quantidade de pedidos: {cliente.pedidos.length > 0 ? cliente.pedidos.length : "Esse cliente ainda não possui pedidos"}</OrderInfo>
          <OrderInfo>Status: {cliente.statusAtivo ? "Ativo" : "Inativo"}</OrderInfo>

          <ButtonGroup>
            <BotaoCinza onClick={() => handleCliente(cliente.id, !cliente.statusAtivo)}>
              {cliente.statusAtivo ? "Desativar cliente" : "Ativar cliente"}
            </BotaoCinza>
          </ButtonGroup>
        </OrderCard>
      ))}
    </>
  );
}

export default CardClienteAdm;
