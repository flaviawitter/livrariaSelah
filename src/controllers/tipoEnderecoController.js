const prisma = require('../config/prismaClient');

async function criarTipoEndereco(req, res) {
    try {
        const tipoEndereco = await prisma.tipoEndereco.create({ data: req.body });
        res.status(201).json(tipoEndereco);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarTiposEndereco(req, res) {
    try {
        const tiposEndereco = await prisma.tipoEndereco.findMany();
        res.json(tiposEndereco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterTipoEndereco(req, res) {
    try {
        const tipoEndereco = await prisma.tipoEndereco.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!tipoEndereco) return res.status(404).json({ message: "Tipo de endereço não encontrado" });
        res.json(tipoEndereco);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarTipoEndereco(req, res) {
    try {
        const tipoEndereco = await prisma.tipoEndereco.update({ where: { id: parseInt(req.params.id) }, data: req.body });
        res.json(tipoEndereco);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarTipoEndereco(req, res) {
    try {
        await prisma.tipoEndereco.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Tipo de endereço deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarTipoEndereco, listarTiposEndereco, obterTipoEndereco, atualizarTipoEndereco, deletarTipoEndereco };
