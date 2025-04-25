import axios from "axios";

const cupomAPI = "http://localhost:5000/api/cupons";

async function criarCupom(cupom) {
    try{
        const cupomCriado = await axios.post(cupomAPI, cupom);
        return cupomCriado
    } catch (error) {
        console.log(error.request.response)
    }
}


export {
    criarCupom
} 