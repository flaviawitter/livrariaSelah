const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todos os motivos de ativação
const listarMotivosAtivacao = async (req, res) => {
    try {
        const motivos = await prisma.motivoAtivacao.findMany();
        res.json(motivos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar motivos de ativação." });
    }
};

// Buscar motivo de ativação por ID
const buscarMotivoAtivacaoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const motivo = await prisma.motivoAtivacao.findUnique({
            where: { id: Number(id) }
        });
        if (!motivo) return res.status(404).json({ erro: "Motivo de ativação não encontrado." });
        res.json(motivo);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o motivo de ativação." });
    }
};

// Criar um novo motivo de ativação
const criarMotivoAtivacao = async (req, res) => {
    const { descricao } = req.body;
    try {
        const novoMotivo = await prisma.motivoAtivacao.create({
            data: { descricao }
        });
        res.status(201).json(novoMotivo);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar motivo de ativação." });
    }
};

// Atualizar um motivo de ativação existente
const atualizarMotivoAtivacao = async (req, res) => {
    const { id } = req.params;
    const { descricao } = req.body;
    try {
        const motivoAtualizado = await prisma.motivoAtivacao.update({
            where: { id: Number(id) },
            data: { descricao }
        });
        res.json(motivoAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar motivo de ativação." });
    }
};

// Excluir um motivo de ativação
const excluirMotivoAtivacao = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.motivoAtivacao.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Motivo de ativação excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir motivo de ativação." });
    }
};

module.exports = { listarMotivosAtivacao, buscarMotivoAtivacaoPorId, criarMotivoAtivacao, atualizarMotivoAtivacao, excluirMotivoAtivacao };
