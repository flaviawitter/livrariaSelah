const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Listar todos os livros
const listarLivros = async (req, res) => {
    try {
        const livros = await prisma.livros.findMany({
            include: {
                autores: true,
                editoras: true,
                fornecedor: true,
                categorias: true, 
                grupoprecificacao: true,
                estoque: true            }
        });
        console.log(livros)
        res.json(livros);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar livros." });
    }
};

// Buscar livro por ID
const buscarLivroPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const livros = await prisma.livros.findUnique({
            where: { id: Number(id) },
            include: {
                autores: true,  
                editoras: true,
                fornecedor: true,
                categorias: true,
                grupoprecificacao: true
            }
        });        
        if (!livros) return res.status(404).json({ erro: "Livro não encontrado." });
        res.json(livros);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar o livro." });
    }
};

const buscarLivrosPorTermo = async (req, res) => {
    const { termo } = req.query;
    try {
        const livros = await prisma.livros.findMany({
            where: {
                OR: [
                    {
                        titulo: {
                            contains: termo.trim()
                        }
                    },
                    {
                        autores: {
                            nome: {
                                contains: termo.trim()
                            }
                        }
                    }
                ]
            },
            include: {
                autores: true,
                editoras: true,
                fornecedor: true,
                categorias: true,
                grupoprecificacao: true
            }
        });

        if (livros.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum livro encontrado com esse termo." });
        }
       
        res.json(livros);
    } catch (error) {
        console.error("Erro ao buscar livros:", error);
        res.status(500).json({ erro: "Erro ao buscar livros." });
    }
};



// Criar um novo livro
const criarLivro = async (req, res) => {
    const {
        titulo, autor_id, editora_id, fornecedor_id, categoria_id, ano, edicao,
        isbn, preco_custo, preco_venda, data_publicacao, paginas, sinopse,
        quantidade_estoque, status, altura, largura, peso, profundidade,
        grupo_precificacao_id, codigo_barras
    } = req.body;

    try {
        const novoLivro = await prisma.livro.create({
            data: {
                titulo, autor_id, editora_id, fornecedor_id, categoria_id, ano: Number(ano), edicao,
                isbn, preco_custo: Number(preco_custo), preco_venda: Number(preco_venda),
                data_publicacao: new Date(data_publicacao), paginas: Number(paginas), sinopse,
                quantidade_estoque: Number(quantidade_estoque), status, altura: Number(altura),
                largura: Number(largura), peso: Number(peso), profundidade: Number(profundidade),
                grupo_precificacao_id, codigo_barras
            }
        });
        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao criar livro." });
    }
};

// Atualizar um livro existente
const atualizarLivro = async (req, res) => {
    const { id } = req.params;
    const {
        titulo, autor_id, editora_id, fornecedor_id, categoria_id, ano, edicao,
        isbn, preco_custo, preco_venda, data_publicacao, paginas, sinopse,
        quantidade_estoque, status, altura, largura, peso, profundidade,
        grupo_precificacao_id, codigo_barras
    } = req.body;

    try {
        const livroAtualizado = await prisma.livro.update({
            where: { id: Number(id) },
            data: {
                titulo, autor_id, editora_id, fornecedor_id, categoria_id, ano: Number(ano), edicao,
                isbn, preco_custo: Number(preco_custo), preco_venda: Number(preco_venda),
                data_publicacao: new Date(data_publicacao), paginas: Number(paginas), sinopse,
                quantidade_estoque: Number(quantidade_estoque), status, altura: Number(altura),
                largura: Number(largura), peso: Number(peso), profundidade: Number(profundidade),
                grupo_precificacao_id, codigo_barras
            }
        });
        res.json(livroAtualizado);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar livro." });
    }
};

// Excluir um livro
const excluirLivro = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.livro.delete({ where: { id: Number(id) } });
        res.json({ mensagem: "Livro excluído com sucesso." });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir livro." });
    }
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const avaliarLivro = async (req, res) => {
    const { livro: livroUsuario } = req.body;

    if (!livroUsuario) {
        return res.status(400).json({ mensagem: "O nome do livro é obrigatório." });
    }

    try {
        // 1. Buscar TODOS os livros do seu banco de dados.
        // Para otimizar, selecione apenas os campos necessários, como título e talvez categoria/gênero.
        const livrosDisponiveis = await prisma.livros.findMany({
            select: {
                titulo: true,
                // Incluir categorias pode ajudar a IA a dar uma recomendação melhor
                categorias: {
                    select: {
                        nome: true
                    }
                }
            }
        });

        if (livrosDisponiveis.length < 2) {
            return res.status(404).json({ mensagem: "Não tenho livros suficientes no meu banco de dados para fazer uma recomendação." });
        }

        // 2. Formatar a lista de livros para incluir no prompt.
        const listaDeTitulos = livrosDisponiveis.map(l => l.titulo).join(', ');

        // 3. Construir o prompt para o Gemini.
        // Esta é a parte mais importante. Estamos dando contexto e uma instrução clara.
        const prompt = `
            Um usuário gostou do livro "${livroUsuario}". 
            Com base na lista de livros que eu tenho disponível, qual deles você recomendaria como próxima leitura?
            A sua resposta deve ser concisa e conter APENAS o título de UM livro da lista e uma breve justificativa de uma frase.

            Exemplo de resposta: "Recomendo '1984' por também ser uma distopia que explora temas de controle social."

            Lista de livros disponíveis: ${listaDeTitulos}.
        `;

        // 4. Chamar a API do Gemini com o prompt construído.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // 5. Enviar a resposta da IA de volta para o frontend.
        res.json({ resposta: text });

    } catch (error) {
        console.error("Erro ao comunicar com a IA ou com o banco de dados:", error);
        res.status(500).json({ mensagem: "Ocorreu um erro no servidor ao tentar gerar a recomendação." });
    }
};


module.exports = { listarLivros, buscarLivroPorId, buscarLivrosPorTermo, criarLivro, atualizarLivro, excluirLivro, avaliarLivro};
