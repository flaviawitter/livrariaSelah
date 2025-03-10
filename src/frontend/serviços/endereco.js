import axios from "axios";

const enderecoAPI = "http://localhost:5000/api/enderecos";

async function criarEndereco(endereco) {
    try{
        await axios.post(enderecoAPI, endereco);
    } catch (error) {
        console.log(error.request.response)
    }
}

export {
    criarEndereco
} 