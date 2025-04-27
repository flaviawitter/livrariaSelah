import React, { useState, useContext } from "react";
import styled from "styled-components";
import DadosLivro from "../DadosLivro";
import BotaoVermelho from "../Botões/BotaoVermelho";
import { useNavigate, useLocation, data } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext"
import { criarPedido, criarItemPedido } from "../../serviços/pedido";
import { useForm } from "react-hook-form";
import BotaoCinza from '../Botões/BotaoCinza';
import ModalEndereco from '../ModalEndereco';
import ModalCartao from '../ModalCartao';
import Input from "../Inputs/Input";
import { useToast } from "../Context/ToastContext";

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
const OpcaoAdicionar = styled.div`
    flex: 1;
    padding: 10px;
    width: 30%;
`;
const TextoResumo = styled.p`
    font-size: 16px;
    color: #333;
    margin: 5px 0;
    font-family: "Bookochi";
    letter-spacing: 0.22em;
`;
const CartaoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
`;
const InfoCartao = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
`;
const ValorInputContainer = styled.div`
    width: 60%; /* controla o tamanho do input */
`;


const ResumoPedido = () => {
    const location = useLocation();
    const { livros = [], subtotal = 0, frete = 0, total = 0 } = location.state || {};

    const livrosSelecionados = livros;
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
    const [pagamentosCartoes, setPagamentosCartoes] = useState({});

    const { user, idCliente } = useContext(AuthContext);

    const navigate = useNavigate();
    const [showModalEndereco, setShowModalEndereco] = useState(false);  
    const [showModalCartao, setShowModalCartao] = useState(false);
    const [enderecos, setEnderecos] = useState(user?.enderecos || []);
    const [cartoes, setCartoes] = useState(user?.cartoes || []);

    const { register, handleSubmit, reset } = useForm({ mode: "onBlur" });
    const { showToast } = useToast();

    const handleValorCartaoChange = (cartaoId, valor) => {
        setPagamentosCartoes(prev => ({
            ...prev,
            [cartaoId]: valor
        }));
    };

    const handleFinalizarPedido = async () => {
        const valores = Object.values(pagamentosCartoes).map(Number);
        const somaTotal = valores.reduce((acc, curr) => acc + curr, 0);

        if (somaTotal !== total) {
        showToast(`O valor total nos cartões deve ser exatamente R$${total.toFixed(2)}`, "error");
            return;
        }

        if (valores.some(valor => valor < 10)) {
            showToast("Cada cartão deve ter no mínimo R$10,00.", "alert");
            return;
        }

        try {
            const pedidos = {
                clienteId: user.id,
                dataPedido: new Date(),
                status: "Pendente",
                totalPreco: total,
                enderecoId: enderecoSelecionado,
                // OBS: Não tem mais um só cartaoId aqui
            };

            const newPedido = await criarPedido(pedidos);
            const idPedidos = newPedido.data.id;

            for (const livro of livrosSelecionados) {
                const itemPedido = {
                    livroId: livro.id,
                    precoUnidade: livro.precoVenda ? parseFloat(livro.precoVenda.toString().replace(',', '.')) : 0,
                    quantidade: Number(livro.quantidade),
                    status: "Pendente",
                    pedidoId: idPedidos
                };
                await criarItemPedido(itemPedido);
            }

            // Aqui você pode salvar a divisão de pagamento também, se precisar
            console.log("Pagamentos por cartão:", pagamentosCartoes);

            localStorage.removeItem("carrinho");
            setEnderecos([]); 
            setCartoes([]);  

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
                    {enderecos.map((endereco, index) => (
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
                    <OpcaoAdicionar>
                        <BotaoCinza onClick={() => setShowModalEndereco(true)}>Adicionar Endereço</BotaoCinza>
                    </OpcaoAdicionar>
                </OpcoesLista>
            </Secao>

            <Secao>
                <h3>Selecione os cartões e valores:</h3>
                <OpcoesLista>
                    {cartoes.map((cartao, index) => (
                        <OpcaoItem key={index}>
                        <CartaoContainer>
                            <input
                                type="checkbox"
                                value={cartao.id}
                                checked={pagamentosCartoes[cartao.id] !== undefined}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setPagamentosCartoes(prev => ({ ...prev, [cartao.id]: 10 }));
                                    } else {
                                        setPagamentosCartoes(prev => {
                                            const novoEstado = { ...prev };
                                            delete novoEstado[cartao.id];
                                            return novoEstado;
                                        });
                                    }
                                }}
                            />
                            <InfoCartao>
                                <label>
                                    <strong>Apelido:</strong> {cartao.apelidoCartao} <br />
                                    <strong>Validade:</strong> {cartao.validade}
                                </label>
                            </InfoCartao>
                    
                            {pagamentosCartoes[cartao.id] !== undefined && (
                                <ValorInputContainer>
                                    <Input
                                        type="number"
                                        min="10"
                                        value={pagamentosCartoes[cartao.id]}
                                        onChange={(e) => handleValorCartaoChange(cartao.id, parseFloat(e.target.value))}
                                        placeholder="Valor a pagar"
                                    />
                                </ValorInputContainer>
                            )}
                        </CartaoContainer>
                    </OpcaoItem>                    
                    ))}
                    <OpcaoAdicionar>
                        <BotaoCinza onClick={() => setShowModalCartao(true)}>Adicionar Cartão</BotaoCinza>
                    </OpcaoAdicionar>
                </OpcoesLista>

                <Secao>
                    <TextoResumo>Sub-total: R${subtotal.toFixed(2)}</TextoResumo>
                    <TextoResumo>Frete: R${frete.toFixed(2)}</TextoResumo>
                    <TextoResumo><strong>Total: R${total.toFixed(2)}</strong></TextoResumo>
                </Secao>
            </Secao>

            <BotaoVermelho onClick={handleFinalizarPedido}>Finalizar Pedido</BotaoVermelho>

            <ModalEndereco
                showModal={showModalEndereco}
                setShowModal={setShowModalEndereco}
                register={register}
                handleSubmit={handleSubmit}
                idCliente={idCliente} 
                reset={reset}
                setEnderecos={setEnderecos}
            />

            <ModalCartao
                showModal={showModalCartao}
                setShowModal={setShowModalCartao}
                idCliente={idCliente}
                setCartoes={setCartoes}
            />
        </ContainerResumo>
    );
};

export default ResumoPedido;