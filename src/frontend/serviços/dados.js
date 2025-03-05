import axios from "axios";

const enderecoAPI = axios.create({ baseURL: "http://localhost:5000/endereco" });

async function criarEndereco(id, endereco) {
    await enderecoAPI.post(`/${id}`, endereco);
}

export {
    criarEndereco
} 