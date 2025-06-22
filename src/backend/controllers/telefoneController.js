const prisma = require('../config/prismaClient');

async function criarTelefone(req, res) {
    try {
        const telefoneReq = req.body
        const data = {
            tipoTelefone: telefoneReq.tipoTelefone,
            ddd: telefoneReq.ddd,
            numero: telefoneReq.numero,
            clienteId: telefoneReq.clienteId
        }
        const novoTelefone = await prisma.telefones.create({ data });
        res.json(novoTelefone);
        return novoTelefone;
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarTelefones(req, res) {
    try {
        const telefones = await prisma.telefones.findMany({
            include: {
                tipoTelefone: { select: { nome: true } }
            }
        });
        res.json(telefones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterTelefone(req, res) {
    try {
        const telefone = await prisma.telefones.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                tipoTelefone: { select: { nome: true } }
            }
        });
        if (!telefone) return res.status(404).json({ message: "Telefone não encontrado" });
        res.json(telefone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarTelefone(req, res) {
    const telefoneId = req.params.id; // Este é o ID do telefone
    const body = req.body;
    try {
        // Usar 'update' para um único registro, não 'updateMany'
        const telefoneAtualizado = await prisma.telefones.update({ 
            where: { id: parseInt(telefoneId) }, // Condição no ID do telefone
            data: body
        });
        res.json(telefoneAtualizado);
    } catch (error) {
        // Prisma lança um erro se o registro não for encontrado, o que é bom
        res.status(400).json({ error: error.message });
    }
}

async function deletarTelefone(req, res) {
    const telefoneId = req.params.id; // Este é o ID do telefone
    try {
        // Usar 'delete' para um único registro, não 'deleteMany'
        await prisma.telefones.delete({ 
            where: { id: parseInt(telefoneId) } // Condição no ID do telefone
        });
        res.json({ message: "Telefone deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarTelefone, listarTelefones, obterTelefone, atualizarTelefone, deletarTelefone };