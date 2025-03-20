const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todas as categorias
const listarCategorias = async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar categorias." });
    }
};

// Buscar categoria por ID
const buscarCategoriaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const categoria = await prisma.categoria.findUnique({ where: { id: Number(id) } });
        if (!categoria) return res.status(404).json({ erro: "Categoria não encontrada." });
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar a categoria." });
    }
};

  const criarCategoria = async (req, res) => {
    const { nome } = req.body;
    try {
        const novaCategoria = await prisma.categoria.create({
            data: { nome }
        });
        res.status(201).json(novaCategoria);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar categoria." });
    }
};

// Atualizar uma categoria existente
const atualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const categoriaAtualizada = await prisma.categoria.update({
            where: { id: Number(id) },
            data: { nome }
        });
        res.json(categoriaAtualizada);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar categoria." });
    }
};

// Excluir uma categoria
const excluirCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.categoria.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Categoria excluída com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir categoria." });
    }
};

module.exports = { listarCategorias, buscarCategoriaPorId, criarCategoria, atualizarCategoria, excluirCategoria };
