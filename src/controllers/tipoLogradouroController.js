const prisma = require('../config/prismaClient');

async function criarTipoLogradouro(req, res) {
    try {
        const tipoLogradouro = await prisma.tipoLogradouro.create({ data: req.body });
        res.status(201).json(tipoLogradouro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarTiposLogradouro(req, res) {
    try {
        const tiposLogradouro = await prisma.tipoLogradouro.findMany();
        res.json(tiposLogradouro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterTipoLogradouro(req, res) {
    try {
        const tipoLogradouro = await prisma.tipoLogradouro.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!tipoLogradouro) return res.status(404).json({ message: "Tipo de logradouro não encontrado" });
        res.json(tipoLogradouro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarTipoLogradouro(req, res) {
    try {
        const tipoLogradouro = await prisma.tipoLogradouro.update({ where: { id: parseInt(req.params.id) }, data: req.body });
        res.json(tipoLogradouro);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarTipoLogradouro(req, res) {
    try {
        await prisma.tipoLogradouro.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Tipo de logradouro deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarTipoLogradouro, listarTiposLogradouro, obterTipoLogradouro, atualizarTipoLogradouro, deletarTipoLogradouro };
