const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function insertData() {
  try {
    await prisma.categorias.createMany({
      data: [
        { nome: 'Suspense Psicológico' },
        { nome: 'Romance' },
        { nome: 'Ficção Científica' },
        { nome: 'Mistério' },
        { nome: 'Fantasia' },
        { nome: 'Drama' },
        { nome: 'Clássico' }
      ]
    });

    await prisma.autores.createMany({
      data: [
        { nome: 'Alex Michaelides', dataNascimento: new Date('1977-09-04'), nacionalidade: 'Chipre' },
        { nome: 'Colleen Hoover', dataNascimento: new Date('1979-12-11'), nacionalidade: 'Estados Unidos' },
        { nome: 'Matt Haig', dataNascimento: new Date('1975-07-03'), nacionalidade: 'Reino Unido' },
        { nome: 'Charlie Donlea', dataNascimento: new Date('1982-01-01'), nacionalidade: 'Estados Unidos' },
        { nome: 'Victoria Aveyard', dataNascimento: new Date('1990-07-27'), nacionalidade: 'Estados Unidos' },
        { nome: 'Carla Madeira', dataNascimento: new Date('1964-01-01'), nacionalidade: 'Brasil' },
        { nome: 'Alice Walker', dataNascimento: new Date('1944-02-09'), nacionalidade: 'Estados Unidos' },
        { nome: 'Jane Austen', dataNascimento: new Date('1775-12-16'), nacionalidade: 'Reino Unido' }
    ]
    });


    const editoras = [
        { nome: 'Record', pais: 'Brasil', anoFundacao: 1942 },
        { nome: 'Galera Record', pais: 'Brasil', anoFundacao: 2007 },
        { nome: 'Intrínseca', pais: 'Brasil', anoFundacao: 2003 },
        { nome: 'HarperCollins Brasil', pais: 'Brasil', anoFundacao: 1817 },
        { nome: 'Suma', pais: 'Brasil', anoFundacao: 1976 },
        { nome: 'Planeta', pais: 'Brasil', anoFundacao: 1949 },
        { nome: 'Martins Fontes', pais: 'Brasil', anoFundacao: 1960 }
      ];
      
      await prisma.editoras.createMany({
        data: editoras,
      });

      const fornecedores = [
        { nome: 'Distribuidora Literária Nacional' },
        { nome: 'Books & Co. Fornecimento Editorial' },
        { nome: 'Editora e Distribuidora Global' },
        { nome: 'MegaBooks Comércio de Livros' },
        { nome: 'Livros e Cultura Distribuição' },
        { nome: 'Nova Era Suprimentos Literários' },
        { nome: 'Mundo das Letras Fornecedor' }
      ];
      
      await prisma.fornecedor.createMany({
        data: fornecedores,
      });

      const gruposPrecificacao = [
        { descricao: 'Best-sellers', margemLucro: 0.30 },
        { descricao: 'Romance Contemporâneo', margemLucro: 0.25 },
        { descricao: 'Suspense e Mistério', margemLucro: 0.35 },
        { descricao: 'Ficção Clássica', margemLucro: 0.20 },
        { descricao: 'Fantasia e Ficção Científica', margemLucro: 0.28 },
        { descricao: 'Dramas e Narrativas Reflexivas', margemLucro: 0.32 },
        { descricao: 'Edições Especiais e Clássicos', margemLucro: 0.40 }
      ];
      
      await prisma.grupoprecificacao.createMany({
        data: gruposPrecificacao,
      });

      
      const estoque = [
        
            {
              "id": 1,
              "livroId": 1,
              "quantidade": 10,
              "ultimaAtualizacao": "2025-03-20T12:00:00Z",
              "dataEntrada": "2025-03-10T08:30:00Z"
            },
            {
              "id": 2,
              "livroId": 2,
              "quantidade": 8,
              "ultimaAtualizacao": "2025-03-18T15:45:00Z",
              "dataEntrada": "2025-03-05T09:20:00Z"
            },
            {
              "id": 3,
              "livroId": 3,
              "quantidade": 12,
              "ultimaAtualizacao": "2025-03-19T14:10:00Z",
              "dataEntrada": "2025-02-28T10:00:00Z"
            },
            {
              "id": 4,
              "livroId": 4,
              "quantidade": 5,
              "ultimaAtualizacao": "2025-03-17T10:30:00Z",
              "dataEntrada": "2025-03-02T11:15:00Z"
            },
            {
              "id": 5,
              "livroId": 5,
              "quantidade": 6,
              "ultimaAtualizacao": "2025-03-16T09:00:00Z",
              "dataEntrada": "2025-03-01T14:50:00Z"
            },
            {
              "id": 6,
              "livroId": 6,
              "quantidade": 7,
              "ultimaAtualizacao": "2025-03-15T13:40:00Z",
              "dataEntrada": "2025-02-27T12:30:00Z"
            },
            {
              "id": 7,
              "livroId": 7,
              "quantidade": 4,
              "ultimaAtualizacao": "2025-03-14T16:20:00Z",
              "dataEntrada": "2025-03-03T13:25:00Z"
            },
            {
              "id": 8,
              "livroId": 8,
              "quantidade": 9,
              "ultimaAtualizacao": "2025-03-13T11:10:00Z",
              "dataEntrada": "2025-02-25T15:40:00Z"
            },
            {
              "id": 9,
              "livroId": 9,
              "quantidade": 0,
              "ultimaAtualizacao": "2025-03-12T14:50:00Z",
              "dataEntrada": "2025-02-20T10:10:00Z"
            },
            {
              "id": 10,
              "livroId": 10,
              "quantidade": 3,
              "ultimaAtualizacao": "2025-03-11T09:30:00Z",
              "dataEntrada": "2025-02-22T09:50:00Z"
            }
          
      ];
      
      await prisma.estoque.createMany({
        data: estoque,
      });
      

const livros = [
    {
      "titulo": "A Paciente Silenciosa",
      "ano": 2019,
      "edicao": "1ª",
      "isbn": "9788595084747",
      "precoCusto": 30.00,
      "precoVenda": 40.00,
      "dataPublicacao": "2019-02-05T00:00:00Z",
      "paginas": 368,
      "sinopse": "Alicia Berenson atirou no marido e nunca mais falou uma palavra.",
      "status": "disponível",
      "altura": 23.0,
      "largura": 16.0,
      "peso": 0.45,
      "profundidade": 2.5,
      "codigoBarras": "9788595084747",
      "autorId": 1,
      "editoraId": 1,
      "fornecedorId": 1,
      "grupoPrecificacaoId": 1,
      "categoriaId": 1,
      "estoqueId": 1
    },
    {
      "titulo": "Verity",
      "ano": 2018,
      "edicao": "1ª",
      "isbn": "9781791392796",
      "precoCusto": 32.00,
      "precoVenda": 40.00,
      "dataPublicacao": "2018-12-07T00:00:00Z",
      "paginas": 336,
      "sinopse": "Thriller psicológico sobre segredos obscuros de uma escritora.",
      "status": "disponível",
      "altura": 22.0,
      "largura": 15.0,
      "peso": 0.45,
      "profundidade": 3.0,
      "codigoBarras": "9781791392796",
      "autorId": 2,
      "editoraId": 2,
      "fornecedorId": 2,
      "grupoPrecificacaoId": 2,
      "categoriaId": 2,
      "estoqueId": 2
    },
    {
      "titulo": "A Biblioteca da Meia-Noite",
      "ano": 2020,
      "edicao": "1ª",
      "isbn": "9786555603151",
      "precoCusto": 36.00,
      "precoVenda": 46.10,
      "dataPublicacao": "2020-08-13T00:00:00Z",
      "paginas": 308,
      "sinopse": "Entre a vida e a morte, Nora explora os caminhos que poderia ter seguido.",
      "status": "disponível",
      "altura": 21.0,
      "largura": 14.5,
      "peso": 0.38,
      "profundidade": 2.0,
      "codigoBarras": "9786555603151",
      "autorId": 3,
      "editoraId": 3,
      "fornecedorId": 3,
      "grupoPrecificacaoId": 1,
      "categoriaId": 3,
      "estoqueId": 3
    },
    {
      "titulo": "Procure nas Cinzas",
      "ano": 2023,
      "edicao": "1ª",
      "isbn": "9786559811880",
      "precoCusto": 37.00,
      "precoVenda": 46.96,
      "dataPublicacao": "2023-06-01T00:00:00Z",
      "paginas": 368,
      "sinopse": "Uma mulher desaparecida pode ser a chave para um crime não resolvido.",
      "status": "disponível",
      "altura": 23.0,
      "largura": 15.5,
      "peso": 0.42,
      "profundidade": 2.8,
      "codigoBarras": "9786559811880",
      "autorId": 4,
      "editoraId": 4,
      "fornecedorId": 4,
      "grupoPrecificacaoId": 3,
      "categoriaId": 4,
      "estoqueId": 4
    },
    {
      "titulo": "A Rainha Vermelha",
      "ano": 2015,
      "edicao": "1ª",
      "isbn": "9788565765695",
      "precoCusto": 35.00,
      "precoVenda": 41.99,
      "dataPublicacao": "2015-02-10T00:00:00Z",
      "paginas": 424,
      "sinopse": "Em um mundo dividido entre prateados e vermelhos, Mare descobre poderes inesperados.",
      "status": "disponível",
      "altura": 22.5,
      "largura": 16.0,
      "peso": 0.55,
      "profundidade": 3.0,
      "codigoBarras": "9788565765695",
      "autorId": 5,
      "editoraId": 5,
      "fornecedorId": 5,
      "grupoPrecificacaoId": 2,
      "categoriaId": 5,
      "estoqueId": 5
    },
    {
      "titulo": "Tudo É Rio",
      "ano": 2014,
      "edicao": "1ª",
      "isbn": "9788595810025",
      "precoCusto": 42.00,
      "precoVenda": 50.92,
      "dataPublicacao": "2014-01-01T00:00:00Z",
      "paginas": 176,
      "sinopse": "Uma história intensa sobre amor, desejo e redenção.",
      "status": "disponível",
      "altura": 21.0,
      "largura": 14.0,
      "peso": 0.3,
      "profundidade": 2.0,
      "codigoBarras": "9788595810025",
      "autorId": 6,
      "editoraId": 6,
      "fornecedorId": 6,
      "grupoPrecificacaoId": 1,
      "categoriaId": 1,
      "estoqueId": 6
    },
    {
      "titulo": "Véspera",
      "ano": 2023,
      "edicao": "1ª",
      "isbn": "9786559812658",
      "precoCusto": 28.00,
      "precoVenda": 34.90,
      "dataPublicacao": "2023-05-23T00:00:00Z",
      "paginas": 240,
      "sinopse": "Um drama envolvente sobre passado, escolhas e perdão.",
      "status": "disponível",
      "altura": 21.0,
      "largura": 14.5,
      "peso": 0.3,
      "profundidade": 2.0,
      "codigoBarras": "9786559812658",
      "autorId": 6,
      "editoraId": 6,
      "fornecedorId": 6,
      "grupoPrecificacaoId": 1,
      "categoriaId": 1,
      "estoqueId": 7
    },
    {
      "titulo": "A Cor Púrpura",
      "ano": 1982,
      "edicao": "1ª",
      "isbn": "9788532520496",
      "precoCusto": 42.00,
      "precoVenda": 52.43,
      "dataPublicacao": "1982-10-01T00:00:00Z",
      "paginas": 352,
      "sinopse": "História emocionante de superação e empoderamento feminino.",
      "status": "disponível",
      "altura": 21.0,
      "largura": 14.0,
      "peso": 0.4,
      "profundidade": 2.5,
      "codigoBarras": "9788532520496",
      "autorId": 7,
      "editoraId": 7,
      "fornecedorId": 7,
      "grupoPrecificacaoId": 2,
      "categoriaId": 2,
      "estoqueId": 8
    },
    {
      "titulo": "Persuasão",
      "ano": 1817,
      "edicao": "1ª",
      "isbn": "9788594318607",
      "precoCusto": 50.00,
      "precoVenda": 64.95,
      "dataPublicacao": "1817-12-20T00:00:00Z",
      "paginas": 256,
      "sinopse": "Clássico da literatura sobre amor e segundas chances.",
      "status": "indisponível",
      "altura": 22.0,
      "largura": 15.0,
      "peso": 0.5,
      "profundidade": 2.8,
      "codigoBarras": "9788594318607",
      "autorId": 8,
      "editoraId": 7,
      "fornecedorId": 7,
      "grupoPrecificacaoId": 3,
      "categoriaId": 3,
      "estoqueId": 9
    }
  ];
  
      
      await prisma.livros.createMany({
        data: livros,
      });

    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

insertData();
