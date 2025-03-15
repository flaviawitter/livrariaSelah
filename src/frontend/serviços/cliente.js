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
        await axios.put(clienteAPI + "/" + idCliente + "/senha", {senha});

    } catch (error) {
        console.log(error.request.response);
    }
}

async function atualizarCliente(idCliente, cliente) {
    try{
        const clienteAtualizado = await axios.update(clienteAPI + "/" + idCliente + {cliente});
    } catch (error) {
        console.log(error.request)
    }
}

async function deletarCliente(idCliente) {
    try {
        await axios.delete(clienteAPI + "/" + idCliente);

    } catch (error) {
        console.log(error.request.response);
    }
}

export {
    criarCliente, obterCliente, atualizarSenha, deletarCliente, atualizarCliente
} 

