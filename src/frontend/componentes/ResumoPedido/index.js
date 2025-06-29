import React, { useState, useContext } from "react";
import styled from "styled-components";
import DadosLivro from "../DadosLivro";
import BotaoVermelho from "../Botões/BotaoVermelho";
import { useNavigate, useLocation, data, matchRoutes } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"
import { criarPedido, criarItemPedido } from "../../serviços/pedido";
import { useForm } from "react-hook-form";
import BotaoCinza from '../Botões/BotaoCinza';
import ModalEndereco from '../ModalEndereco';
import ModalCartao from '../ModalCartao';
import Input from "../Inputs/Input";
import { useToast } from "../Context/ToastContext";
import axios from "axios";
import { listarCuponsPorCliente } from "../../serviços/cupom";
import { useEffect } from "react";


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
    width: 50%;
`;
const Quantidade = styled.p`
  font-size: 14px;
  color: #999;
  margin: 4px 0;
`;

const ResumoPedido = () => {
    const location = useLocation();
    const { livros = [], subtotal = 0, frete = 0, total = 0 } = location.state || {};

    const livrosSelecionados = livros;
    const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);
    const [pagamentosCartoes, setPagamentosCartoes] = useState({});

    const { user, idCliente } =  useAuth();
    
    const navigate = useNavigate();
    const [showModalEndereco, setShowModalEndereco] = useState(false);  
    const [showModalCartao, setShowModalCartao] = useState(false);
    const [enderecos, setEnderecos] = useState(user?.enderecos || []);
    const [cartoes, setCartoes] = useState(user?.cartoes || []);

    const { register, handleSubmit, reset } = useForm({ mode: "onBlur" });
    const { showToast } = useToast();

    const [cuponsDisponiveis, setCuponsDisponiveis] = useState([]);
    const [cuponsSelecionados, setCuponsSelecionados] = useState([]);

    useEffect(() => {
    if (!user?.id) return; // protege contra 'null' ou 'undefined'

    async function buscarCupons() {
        try {
            const response = await listarCuponsPorCliente(user.id);
                const cuponsValidos = response.data.filter(cupom => cupom.validade);
                setCuponsDisponiveis(cuponsValidos);
            } catch (error) {
                console.error("Erro ao buscar cupons:", error);
            }
        }
        buscarCupons();
    }, [user.id]);

    const handleSelecionarCupom = (cupom) => {
        const somaCupons = cuponsSelecionados.reduce((acc, c) => acc + parseFloat(c.valor), 0);
        const novoTotal = somaCupons + parseFloat(cupom.valor);

        if (novoTotal > total) {
            showToast("A soma dos cupons não pode ultrapassar o valor total da compra.", "error");
            return;
        }

        setCuponsSelecionados(prev => [...prev, cupom]);
    };

    const handleRemoverCupom = (idCupom) => {
        setCuponsSelecionados(prev => prev.filter(cupom => cupom.id !== idCupom));
    };


    const handleValorCartaoChange = (cartaoId, valor) => {
        setPagamentosCartoes(prev => ({
            ...prev,
            [cartaoId]: valor
        }));
    };

    const handleFinalizarPedido = async () => {
        const valorCupons = cuponsSelecionados.reduce((acc, cupom) => acc + parseFloat(cupom.valor), 0);
        const totalComDesconto = total - valorCupons;
    
        const valores = Object.values(pagamentosCartoes).map(Number);
        const somaCartoes = valores.reduce((acc, curr) => acc + curr, 0);
    
        if (Math.abs(somaCartoes - totalComDesconto) > 0.01) {
            showToast(`O valor total dos cartões deve ser R$${totalComDesconto.toFixed(2)} após aplicar cupons`, "error", 'resumo-soma-errada');
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
                totalPreco: totalComDesconto,
                enderecoId: enderecoSelecionado,
                pagamentosCartoes: pagamentosCartoes 
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
    
            for (const cupom of cuponsSelecionados) {
                await axios.post("http://localhost:5000/api/pedidocupom", {
                    pedidoId: idPedidos,
                    cupomId: cupom.id
                });
    
                await axios.put(`http://localhost:5000/api/cupons/${cupom.id}`, {
                    validade: false
                });
            }
    
            localStorage.removeItem("carrinho");
            setEnderecos([]);
            setCartoes([]);
            setCuponsSelecionados([]);
    
            navigate("/pedidoscliente");
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
        }
    };
    
    console.log("Dados do usuário:", user);
    
    if (!user || !user.id) {
        return <p>Carregando dados do usuário...</p>; // ou redirecionar para login
    }


    return (
        <ContainerResumo>
            <Titulo>RESUMO DO PEDIDO</Titulo>

            <Secao>
                <h3>Conteúdo do Carrinho</h3>
                <LivrosContainer>
                    {livrosSelecionados
                    .filter(livro => livro && livro.id) 
                    .map((livro, index) => (
                        <LivroItem key={index}>
                            <DadosLivro livros={[livro]} />
                            <Quantidade>Quantidade: x{livro.quantidade || "Autor desconhecido"}</Quantidade>
                        </LivroItem>
                    ))}
                </LivrosContainer>
            </Secao>

            <Secao>
                <h3>Selecione um endereço:</h3>
                <OpcoesLista>
                    {(enderecos || [])
                    .filter(endereco => endereco && endereco.id)
                    .map((endereco, index) => (
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
                    {(cartoes || [])
                    .filter(cartao => cartao && cartao.id)
                    .map((cartao, index) => (
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
                                    <label> Valor a ser cobrado no cartão: </label>
                                    <Input
                                        type="number"
                                        min="10"
                                        value={pagamentosCartoes[cartao.id]}
                                        onChange={(e) => handleValorCartaoChange(cartao.id, parseFloat(e.target.value))}
                                        placeholder="Valor a pagar"
                                        style={{ marginTop: "10px" }}

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
                    <h3>Selecione seus cupons:</h3>
                    <OpcoesLista>
                        {cuponsDisponiveis.map(cupom => (
                            <OpcaoItem key={cupom.id}>
                                <input
                                    type="checkbox"
                                    checked={cuponsSelecionados.some(c => c.id === cupom.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            handleSelecionarCupom(cupom);
                                        } else {
                                            handleRemoverCupom(cupom.id);
                                        }
                                    }}
                                />
                                <label>
                                    {cupom.descricao} - Valor: R${parseFloat(cupom.valor).toFixed(2)}
                                </label>
                            </OpcaoItem>
                        ))}
                    </OpcoesLista>
                    <TextoResumo>
                        Valor total dos cupons: R${cuponsSelecionados.reduce((acc, c) => acc + parseFloat(c.valor), 0).toFixed(2)}
                    </TextoResumo>
                </Secao>


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