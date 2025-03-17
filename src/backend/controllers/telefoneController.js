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
    const id = req.params.id;
    const body = req.body;
    try {
        const telefone = await prisma.telefones.updateMany({ 
            where: { clienteId: parseInt(id) }, 
            data: body
        });
        res.json(telefone)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarTelefone(req, res) {
    try {
        await prisma.telefones.deleteMany({ where: { clienteId: parseInt(req.params.id) } });
        res.json({ message: "Telefone deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarTelefone, listarTelefones, obterTelefone, atualizarTelefone, deletarTelefone };