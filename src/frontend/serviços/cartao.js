import axios from "axios";

const cartaoAPI = "http://localhost:5000/api/cartoes";

async function criarCartao(cartao) {
    try{
        await axios.post(cartaoAPI, cartao);
    } catch (error) {
        console.log(error.request.response)
    }
}

async function criarCartaoNovo(idCliente, cartao) {
    try {
        await axios.post(`http://localhost:5000/api/cartoes/${idCliente}`, { cartao });
        console.log("Cartão criado com sucesso!");
    } catch (error) {
        console.log("Erro ao inserir cartão:", error.response ? error.response.data : error.message);
    }
}


async function atualizarCartao(clienteId, cartao) {
    try{
        await axios.put(cartaoAPI + "/" + clienteId, cartao);
    } catch (error) {
        console.log(error.request.response)
    }
}


async function deletarCartao(cartao) {
    try{
        await axios.delete(cartaoAPI + "/" + cartao);
    } catch (error) {
        console.log(error.request.response)
    }
}

export {
    criarCartao, atualizarCartao, deletarCartao, criarCartaoNovo
} 