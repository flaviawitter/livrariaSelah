const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Listar todas as associações de livros e categorias
const listarLivrosCategorias = async (req, res) => {
    try {
        const livrosCategorias = await prisma.livrosCategorias.findMany({
            include: {
                livro: true,
                categoria: true
            }
        });
        res.json(livrosCategorias);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar relações entre livros e categorias." });
    }
};

// Buscar uma associação específica entre livro e categoria
const buscarLivroCategoria = async (req, res) => {
    const { livro_id, categoria_id } = req.params;
    try {
        const livroCategoria = await prisma.livrosCategorias.findUnique({
            where: {
                livro_id_categoria_id: {
                    livro_id: Number(livro_id),
                    categoria_id: Number(categoria_id)
                }
            },
            include: {
                livro: true,
                categoria: true
            }
        });
        if (!livroCategoria) return res.status(404).json({ erro: "Relação não encontrada." });
        res.json(livroCategoria);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar a relação entre livro e categoria." });
    }
};

// Criar uma nova associação entre livro e categoria
const criarLivroCategoria = async (req, res) => {
    const { livro_id, categoria_id } = req.body;
    try {
        const novaRelacao = await prisma.livrosCategorias.create({
            data: { livro_id: Number(livro_id), categoria_id: Number(categoria_id) }
        });
        res.status(201).json(novaRelacao);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar relação entre livro e categoria." });
    }
};

// Excluir uma associação entre livro e categoria
const excluirLivroCategoria = async (req, res) => {
    const { livro_id, categoria_id } = req.params;
    try {
        await prisma.livrosCategorias.delete({
            where: {
                livro_id_categoria_id: {
                    livro_id: Number(livro_id),
                    categoria_id: Number(categoria_id)
                }
            }
        });
        res.json({ mensagem: "Relação excluída com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir relação entre livro e categoria." });
    }
};

module.exports = { listarLivrosCategorias, buscarLivroCategoria, criarLivroCategoria, excluirLivroCategoria };
