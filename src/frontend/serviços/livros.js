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


export {
    listarLivros
} 