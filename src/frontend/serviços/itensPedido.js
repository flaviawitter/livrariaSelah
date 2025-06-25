import axios from "axios";

const itensPedidoAPI = "http://localhost:5000/api/itenspedido";

async function atualizarItemPedido(bodyAtualizado) {
    try{        
       return await axios.put(`${itensPedidoAPI}/${bodyAtualizado.id}`, bodyAtualizado);
    } catch (error) {
        console.log(error.request.response)
    }
}

async function atualizarItensPorPedidoId(idPedido, status) {
    try{        
       return await axios.put(`${itensPedidoAPI}/pedido/${idPedido}`, {
            status: status
        });
    } catch (error) {
        console.log(error.request.response)
    }
}


export {
    atualizarItemPedido, atualizarItensPorPedidoId
} 