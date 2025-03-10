import axios from "axios";

const cartaoAPI = "http://localhost:5000/api/cartoes";

async function criarCartao(cartao) {
    try{
        await axios.post(cartaoAPI, cartao);
    } catch (error) {
        console.log(error.request.response)
    }
}

export {
    criarCartao
} 