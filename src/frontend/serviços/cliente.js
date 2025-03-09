import axios from "axios";

const clienteAPI = "http://localhost:5000/api/clientes";

async function criarCliente(cliente) {
    try{
        await axios.post(clienteAPI, cliente);
    } catch (error) {
        console.log(error.request.response)
    }
}

export {
    criarCliente
} 