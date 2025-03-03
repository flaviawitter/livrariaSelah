const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todas as editoras
const listarEditoras = async (req, res) => {
    try {
        const editoras = await prisma.editora.findMany();
        res.json(editoras);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar editoras." });
    }
};

// Buscar editora por ID
const buscarEditoraPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const editora = await prisma.editora.findUnique({ where: { id: Number(id) } });
        if (!editora) return res.status(404).json({ erro: "Editora não encontrada." });
        res.json(editora);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar a editora." });
    }
};

// Criar uma nova editora
const criarEditora = async (req, res) => {
    const { nome, pais, ano_fundacao } = req.body;
    try {
        const novaEditora = await prisma.editora.create({
            data: { nome, pais, ano_fundacao: Number(ano_fundacao) }
        });
        res.status(201).json(novaEditora);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar editora." });
    }
};

// Atualizar uma editora existente
const atualizarEditora = async (req, res) => {
    const { id } = req.params;
    const { nome, pais, ano_fundacao } = req.body;
    try {
        const editoraAtualizada = await prisma.editora.update({
            where: { id: Number(id) },
            data: { nome, pais, ano_fundacao: Number(ano_fundacao) }
        });
        res.json(editoraAtualizada);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar editora." });
    }
};

// Excluir uma editora
const excluirEditora = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.editora.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Editora excluída com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir editora." });
    }
};

module.exports = { listarEditoras, buscarEditoraPorId, criarEditora, atualizarEditora, excluirEditora };
