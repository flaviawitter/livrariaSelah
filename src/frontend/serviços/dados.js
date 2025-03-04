import axios from "axios";

const livrosAPI = axios.create({baseURL: "http://localhost:5555/dados"})

async function postFavorito(id) {
    await favoritosAPI.post(`/${id}`)
}

export {
    getLivros
}