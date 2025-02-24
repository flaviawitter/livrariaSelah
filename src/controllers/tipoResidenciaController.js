const prisma = require('../config/prismaClient');

async function criarTipoResidencia(req, res) {
    try {
        const tipoResidencia = await prisma.tipoResidencia.create({ data: req.body });
        res.status(201).json(tipoResidencia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarTiposResidencia(req, res) {
    try {
        const tiposResidencia = await prisma.tipoResidencia.findMany();
        res.json(tiposResidencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterTipoResidencia(req, res) {
    try {
        const tipoResidencia = await prisma.tipoResidencia.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!tipoResidencia) return res.status(404).json({ message: "Tipo de residência não encontrado" });
        res.json(tipoResidencia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarTipoResidencia(req, res) {
    try {
        const tipoResidencia = await prisma.tipoResidencia.update({ where: { id: parseInt(req.params.id) }, data: req.body });
        res.json(tipoResidencia);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarTipoResidencia(req, res) {
    try {
        await prisma.tipoResidencia.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Tipo de residência deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarTipoResidencia, listarTiposResidencia, obterTipoResidencia, atualizarTipoResidencia, deletarTipoResidencia };
