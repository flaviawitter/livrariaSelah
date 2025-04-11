import React, { useState, useContext } from "react";
import styled from "styled-components";
import DadosLivro from "../DadosLivro";
import BotaoVermelho from "../Botões/BotaoVermelho";
import { useNavigate, useLocation, data } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext"
import { criarPedido, criarItemPedido } from "../../serviços/pedido";

const ContainerResumo = styled.div`
    width: 90%;
    color: #333;
    margin: 25px auto;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
`;
const Titulo = styled.h2`
    color: #095F54;
    font-size: 32px;
    text-align: left;
    width: 100%;
`;
const Secao = styled.div`
    margin-top: 20px;
    padding: 15px;
    border-top: 1px solid #ccc;
`;
const LivroItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
`;
const LivrosContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
    margin-top: 20px;
`;
const OpcoesLista = styled.div`
    display: flex;
    justify-content: space-between;
`;
const OpcaoItem = styled.div`
    flex: 1;
    padding: 10px;
`;
const TextoResumo = styled.p`
    font-size: 16px;
    color: #333;
    margin: 5px 0;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
`;

const ResumoPedido = () => {
    const location = useLocation();
    const { livros = [], subtotal = 0, frete = 0, total = 0 } = location.state || {};

    const livrosSelecionados = livros;
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
    const [cartaoSelecionado, setCartaoSelecionado] = useState(null);

    const { user } = useContext(AuthContext);
    console.log("user", user);

    const navigate = useNavigate();

    const handleFinalizarPedido = async () => {
        try {
          const pedidos = {
            clienteId: user.id,
            dataPedido: new Date(),
            status: "Pendente",
            totalPreco: total,
            enderecoId: enderecoSelecionado,
            cartaoId: cartaoSelecionado,
          };
      
          const newPedido = await criarPedido(pedidos);
          const idPedidos = newPedido.data.id;
          console.log("Pedido:", pedidos);
          console.log(livrosSelecionados);
      
          for (const livro of livrosSelecionados) {
            const itemPedido = {
                livroId: livro.id,
                precoUnidade: livro.preco ? parseFloat(livro.precoVenda.toString().replace(',', '.')) : 0,
                quantidade: Number(livro.quantidade),
                status: "Pendente",
                pedidoId: idPedidos
              };
              
      
            await criarItemPedido(itemPedido);
            console.log("Item do pedido:", itemPedido);
          }
      
          navigate("/pedidoscliente");
        } catch (error) {
          console.error("Erro ao finalizar pedido:", error);
        }

      };
      

    return (
        <ContainerResumo>
            <Titulo>RESUMO DO PEDIDO</Titulo>

            <Secao>
                <h3>Conteúdo do Carrinho</h3>
                <LivrosContainer>
                    {livrosSelecionados.map((livro, index) => (
                        <LivroItem key={index}>
                            <DadosLivro livros={[livro]} />
                        </LivroItem>
                    ))}
                </LivrosContainer>
            </Secao>

            <Secao>
                <h3>Selecione um endereço:</h3>
                <OpcoesLista>
                {user?.enderecos?.map((endereco, index) => (
                    <OpcaoItem key={index}>
                        <input
                        type="radio"
                        name="endereco"
                        value={endereco.id}
                        onChange={() => setEnderecoSelecionado(endereco.id)}
                        checked={enderecoSelecionado === endereco.id}
                        />
                        <label>
                        <strong>CEP:</strong> {endereco.cep} <br />
                        <strong>Endereço:</strong> {endereco.tipoLogradouro || ''} {endereco.logradouro}
                        </label>
                    </OpcaoItem>
                    ))}

                </OpcoesLista>
            </Secao>

            <Secao>
                <h3>Selecione um Cartão:</h3>
                <OpcoesLista>
                {user?.cartoes?.map((cartao, index) => (
                    <OpcaoItem key={index}>
                        <input
                        type="radio"
                        name="cartao"
                        value={cartao.id}
                        onChange={() => setCartaoSelecionado(cartao.id)}
                        checked={cartaoSelecionado === cartao.id}
                        />
                        <label>
                        <strong>Apelido:</strong> {cartao.apelidoCartao} <br />
                        <strong>Validade:</strong> {cartao.validade}
                        </label>
                    </OpcaoItem>
                    ))}
                </OpcoesLista>
                <Secao>
                    <TextoResumo>Sub-total: R${subtotal.toFixed(2)}</TextoResumo>
                    <TextoResumo>Frete: R${frete.toFixed(2)}</TextoResumo>
                    <TextoResumo><strong>Total: R${total.toFixed(2)}</strong></TextoResumo>

                </Secao>
            </Secao>

            <BotaoVermelho onClick={handleFinalizarPedido}>Finalizar Pedido</BotaoVermelho>
        </ContainerResumo>
    );
};

export default ResumoPedido;
