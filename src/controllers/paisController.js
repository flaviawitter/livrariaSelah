const prisma = require('../config/prismaClient');

async function criarPais(req, res) {
    try {
        const pais = await prisma.paises.create({ data: req.body });
        res.status(201).json(pais);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarPaises(req, res) {
    try {
        const paises = await prisma.paises.findMany();
        res.json(paises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterPais(req, res) {
    try {
        const pais = await prisma.paises.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!pais) return res.status(404).json({ message: "País não encontrado" });
        res.json(pais);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function atualizarPais(req, res) {
    try {
        const pais = await prisma.paises.update({ where: { id: parseInt(req.params.id) }, data: req.body });
        res.json(pais);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function deletarPais(req, res) {
    try {
        await prisma.paises.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "País deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarPais, listarPaises, obterPais, atualizarPais, deletarPais };