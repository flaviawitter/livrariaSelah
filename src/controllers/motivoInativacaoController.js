const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const listarMotivos = async (req, res) => {
    try {
        const motivos = await prisma.motivoInativacao.findMany();
        res.json(motivos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar motivos de inativação." });
    }
};

const buscarMotivoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const motivo = await prisma.motivoInativacao.findUnique({ where: { id: Number(id) } });
        if (!motivo) return res.status(404).json({ erro: "Motivo não encontrado." });
        res.json(motivo);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o motivo de inativação." });
    }
};

const criarMotivo = async (req, res) => {
    const { descricao } = req.body;
    try {
        const novoMotivo = await prisma.motivoInativacao.create({ data: { descricao } });
        res.status(201).json(novoMotivo);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar motivo de inativação." });
    }
};

const atualizarMotivo = async (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;
    try {
        const motivoAtualizado = await prisma.motivoInativacao.update({
            where: { id: Number(id) },
            data: { descricao }
        });
        res.json(motivoAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar motivo de inativação." });
    }
};

const excluirMotivo = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.motivoInativacao.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Motivo de inativação excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir motivo de inativação." });
    }
};

module.exports = { listarMotivos, buscarMotivoPorId, criarMotivo, atualizarMotivo, excluirMotivo };
