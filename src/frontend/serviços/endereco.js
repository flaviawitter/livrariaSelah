import axios from "axios";

const enderecoAPI = "http://localhost:5000/api/enderecos";

async function criarEndereco(endereco) {
    try{
        await axios.post(enderecoAPI, endereco);
    } catch (error) {
        console.log(error.request.response)
    }
}
async function criarEnderecoNovo(idCliente, endereco) {
    try {
        await axios.post(`http://localhost:5000/api/enderecos/${idCliente}`, { endereco });
        console.log("Endereço criado com sucesso!");
    } catch (error) {
        console.log("Erro ao inserir endereço:", error.response ? error.response.data : error.message);
    }
}

async function deletarEndereco(idCliente) {
    try{
        await axios.delete(enderecoAPI + "/" + idCliente);
    } catch (error) {
        console.log(error.request.response)
    }
}


export {
    criarEndereco, deletarEndereco, criarEnderecoNovo
} 