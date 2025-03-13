import axios from "axios";

const telefoneAPI = "http://localhost:5000/api/telefones";

async function criarTelefone(telefone) {
    try{
        await axios.post(telefoneAPI, telefone);
    } catch (error) {
        console.log(error.request.response)
    }
}

async function deletarTelefone(idCliente) {
    try{
        await axios.delete(telefoneAPI + "/" + idCliente);
    } catch (error) {
        console.log(error.request.response)
    }
}

export {
    criarTelefone, deletarTelefone
} 