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
async function obterCliente(id) {
    try{
        const clienteObtido = await axios.get(clienteAPI + "/" + id);
        return clienteObtido
    } catch (error) {
        console.log(error.request.response)
    }
}

async function atualizarSenha(idCliente, senha) {
    try {
        await axios.put(`${clienteAPI}/${idCliente}/senha`, { senha });

    } catch (error) {
        console.log(error.request.response);
    }
}



export {
    criarCliente, obterCliente, atualizarSenha
} 

