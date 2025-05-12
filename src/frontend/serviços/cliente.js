import axios from "axios";

const clienteAPI = "http://localhost:5000/api/clientes";

async function criarCliente(cliente) {
    try{
        const newCliente = await axios.post(clienteAPI, cliente);
        return newCliente
    } catch (error) {
        console.log(error.request.response)
    }
}

async function obterCliente(id) {
    try{
        const clienteObtido = await axios.get(clienteAPI + "/" + id);
        return clienteObtido
    } catch (error) {
        console.log(error.request.response)
    }
}

async function atualizarSenha(idCliente, senha) {
    try {
        await axios.put(clienteAPI + "/" + idCliente + "/senha", {senha});

    } catch (error) {
        console.log(error.request.response);
    }
}

async function atualizarCliente(idCliente, cliente) {
    try{
        const clienteAtualizado = await axios.put(clienteAPI + "/" + idCliente, cliente);
        return clienteAtualizado;
    } catch (error) {
        console.log(error.request)
    }

}

async function deletarCliente(idCliente) {
    try {
        await axios.delete(clienteAPI + "/" + idCliente);

    } catch (error) {
        console.log(error.request.response);
    }
}

async function criarCadastro(cliente) {
    console.log("Dados enviados:", cliente);

    try {
        const resposta = await fetch("http://localhost:5000/api/clientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente),
        });

        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.error || "Erro ao criar cliente");
        }
        return await resposta.json();
    } catch (erro) {
        console.error("Erro na requisição:", erro.message);
        return null;
    }
};

async function listarCliente() {
    try{
        const clientes = await axios.get(clienteAPI);
        return clientes
    } catch (error) {
        console.log(error.request.response)
    }
}

const atualizarStatus = async (idCliente, novoStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/clientes/${idCliente}/status`, {
        method: 'PATCH',  // Método de atualização
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statusAtivo: novoStatus }),  // Envia o novo status no corpo
      });
  
      if (!response.ok) {
        throw new Error('Erro ao atualizar cliente.');
      }
  
      const clienteAtualizado = await response.json();
      console.log(clienteAtualizado); 
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
    }
  };
  

export {
    criarCliente, obterCliente, atualizarSenha, deletarCliente, atualizarCliente, criarCadastro, listarCliente, atualizarStatus
} 

