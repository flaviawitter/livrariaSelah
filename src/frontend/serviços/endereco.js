import axios from "axios";

const enderecoAPI = "http://localhost:5000/api/enderecos";

async function criarEndereco(endereco) {
    try{
        await axios.post(enderecoAPI, endereco);
    } catch (error) {
        console.log(error.request.response)
    }
}
export async function criarEnderecoNovo(idCliente, endereco) {
  const response = await axios.post(`/api/clientes/${idCliente}/enderecos`, endereco);
  return response.data; // ← axios retorna um objeto com .data
}

async function atualizarEndereco( clienteId, endereco) {
    try{
        await axios.put(enderecoAPI + "/" + clienteId, endereco);
    } catch (error) {
        console.log(error.request.response)
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
    criarEndereco, atualizarEndereco, deletarEndereco, 
} 