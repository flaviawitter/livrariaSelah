import axios from "axios";

const livrosAPI = "http://localhost:5000/api/livros";

async function listarLivros() {
    try{
        const livros = await axios.get(livrosAPI);
        return livros
    } catch (error) {
        console.log(error.request.response)
    }
}

async function buscarLivro(id) {
    try {
        const response = await axios.get(`${livrosAPI}/${id}`);
        return response.data; // Retorna apenas o livro específico
    } catch (error) {
        console.error(`Erro ao buscar livro com ID ${id}:`, error.message);
        return null; // Retorna null para evitar que o código quebre
    }
}



export {
    listarLivros, buscarLivro
} 