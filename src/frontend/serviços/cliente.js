import axios from "axios";

const clienteAPI = "http://localhost:5000/api/clientes";

async function criarCliente(cliente) {
    try{
        const newCliente = await axios.post(clienteAPI, cliente);
        return newCliente
    } catch (error) {
        console.log(error.request.response)
    }
}
async function obterClienteCpf(cpf) {
    try{
        const clienteObtido = await axios.get(clienteAPI + "/" + cpf);
        return clienteObtido
    } catch (error) {
        console.log(error.request.response)
    }
}


export {
    criarCliente, obterClienteCpf
} 

