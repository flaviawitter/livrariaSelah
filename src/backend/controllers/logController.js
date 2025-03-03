const prisma = require('../config/prismaClient');

async function criarLog(req, res) {
    try {
        const log = await prisma.log.create({ data: req.body });
        res.status(201).json(log);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function listarLogs(req, res) {
    try {
        const logs = await prisma.log.findMany();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function obterLog(req, res) {
    try {
        const log = await prisma.log.findUnique({ where: { id: parseInt(req.params.id) } });
        if (!log) return res.status(404).json({ message: "Log não encontrado" });
        res.json(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deletarLog(req, res) {
    try {
        await prisma.log.delete({ where: { id: parseInt(req.params.id) } });
        res.json({ message: "Log deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { criarLog, listarLogs, obterLog, deletarLog };