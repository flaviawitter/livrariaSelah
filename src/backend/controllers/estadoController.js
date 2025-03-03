const prisma = require('../config/prismaClient');

async function criarEstado(req, res) {
    try {
        const estado = await prisma.estados.create({ data: req.body });
        res.status(201).json(estado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarEstados(req, res) {
    try {
        const estados = await prisma.estados.findMany({
            include: {
                pais: {
                    select: { nome: true }
                }
            }
        });
        res.json(estados);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterEstado(req, res) {
    try {
        const estado = await prisma.estados.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                pais: {
                    select: { nome: true }
                }
            }
        });
        if (!estado) return res.status(404).json({ message: "Estado não encontrado" });
        res.json(estado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarEstado(req, res) {
    try {
        const estado = await prisma.estados.update({ where: { id: parseInt(req.params.id) }, data: req.body });
        res.json(estado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarEstado(req, res) {
    try {
        await prisma.estados.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Estado deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarEstado, listarEstados, obterEstado, atualizarEstado, deletarEstado };

