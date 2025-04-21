import axios from "axios";

const estoqueAPI = "http://localhost:5000/api/estoque";

async function buscarEstoquePorId(id) {
    try{
        const estoque = await axios.get(`${estoqueAPI}/${id}`);
        return estoque
    } catch (error) {
        console.log(error.request.response)
    }
}

async function diminuirQuantidadeLivro(id) {
    try{
        const estoque = await axios.patch(`${estoqueAPI}/${id}`);
        return estoque
    } catch (error) {
        console.log(error.request.response)
    }
}

async function acrescentarQuantidadeLivro(id) {
    try{
        const estoque = await axios.patch(`${estoqueAPI}/acrescentar/${id}`);
        return estoque
    } catch (error) {
        console.log(error.request.response)
    }
}

export {
    buscarEstoquePorId, diminuirQuantidadeLivro, acrescentarQuantidadeLivro
} 