const prisma = require('../config/prismaClient');

async function criarCliente(req, res) {
    try {
        const clienteReq = req.body
        const data = {
            nome: clienteReq.nome,
            cpf: clienteReq.cpf,
            email: clienteReq.email,
            senha: clienteReq.senha, 
            genero: clienteReq.genero,
            dataNascimento: new Date(clienteReq.dataNascimento),
            ranking: clienteReq.ranking
        }
        const novoCliente = await prisma.cliente.create({ data });
        console.log(novoCliente);
        res.json(novoCliente);
        return novoCliente;
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarClientes(req, res) {
    try {
        const clientes = await prisma.cliente.findMany({
            include: {
                telefones: true, // Inclui telefones relacionados
                enderecos: true  // Inclui endereços relacionados
            }
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterCliente(req, res) {
    const { id } = req.params;

    try {
        const cliente = await prisma.cliente.findUnique({
            where: { id: parseInt(id) },
            include: { telefones: true, enderecos: true }
        });

        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterClienteCpf(req, res) {
    const { cpf } = req.params;

    try {
        const cliente = await prisma.cliente.findUnique({
            where: { cpf: cpf }
        });

        if (!cliente) {
            return res.status(404).json({ message: "Cliente não encontrado" });
        }

        res.json(cliente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

async function atualizarCliente(req, res) {
    const { id } = req.params;
    const { nome, email, senha, genero, dataNascimento } = req.body;

    try {
        const clienteAtualizado = await prisma.cliente.update({
            where: { id: parseInt(id) },
            data: { nome, email, senha, genero, dataNascimento: new Date(dataNascimento) }
        });

        res.json(clienteAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarCliente(req, res) {
    const { id } = req.params;

    try {
        await prisma.cliente.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Cliente deletado com sucesso!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


module.exports = { 
    criarCliente, 
    listarClientes, 
    obterCliente, 
    obterClienteCpf,
    atualizarCliente, 
    deletarCliente 
};
