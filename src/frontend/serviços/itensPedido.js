import axios from "axios";

const itensPedidoAPI = "http://localhost:5000/api/itenspedido";

async function atualizarItemPedido(bodyAtualizado) {
    try{        
        await axios.put(`${itensPedidoAPI}/${bodyAtualizado.id}`, bodyAtualizado);
    } catch (error) {
        console.log(error.request.response)
    }
}


export {
    atualizarItemPedido
} 