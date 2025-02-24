const prisma = require('../config/prismaClient');

async function criarCidade(req, res) {
    try {
        const cidade = await prisma.cidades.create({ data: req.body });
        res.status(201).json(cidade);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarCidades(req, res) {
    try {
        const cidades = await prisma.cidades.findMany({
            include: {
                estado: {
                    select: { nome: true }
                }
            }
        });
        res.json(cidades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterCidade(req, res) {
    try {
        const cidade = await prisma.cidades.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                estado: {
                    select: { nome: true }
                }
            }
        });
        if (!cidade) return res.status(404).json({ message: "Cidade não encontrada" });
        res.json(cidade);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarCidade(req, res) {
    try {
        const cidade = await prisma.cidades.update({ where: { id: parseInt(req.params.id) }, data: req.body });
        res.json(cidade);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarCidade(req, res) {
    try {
        await prisma.cidades.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Cidade deletada com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarCidade, listarCidades, obterCidade, atualizarCidade, deletarCidade };
