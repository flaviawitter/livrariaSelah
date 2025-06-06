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
      "sinopse": "Alicia Berenson tinha uma vida perfeita. Ela era uma pintora famosa casada com um fotógrafo bem-sucedido e morava numa área nobre de Londres que dá para o parque de Hampstead Heath. Certa noite, Gabriel, seu marido, voltou tarde para casa depois de um ensaio para a Vogue , e de repente a vida de Alicia mudou completamente... \nAlicia tinha 33 anos quando deu cinco tiros no rosto do marido, e ela nunca mais disse uma palavra. \nA recusa de Alicia a falar ou a dar qualquer explicação transforma essa tragédia doméstica em algo muito maior - um mistério que atrai a atenção do público e aumenta ainda mais a fama da pintora. Entretanto, enquanto seus quadros passam a ser mais valorizados que nunca, ela é levada para o Grove, um hospital psiquiátrico judiciário na zona norte de Londres. \nEnquanto isso, Theo Faber é um psicoterapeuta forense que espera há muito tempo por uma oportunidade de trabalhar com Alicia. Ele tem certeza de que é a pessoa certa para lidar com o caso. No entanto, sua determinação para fazê-la falar e desvendar o mistério de por que ela atirou no marido o arrasta para um caminho tortuoso que sugere que as raízes do silêncio de Alicia são muito mais profundas do que ele jamais poderia imaginar. \nPorém, se ela falar, ele será capaz de ouvir a verdade? \nA paciente silenciosa é thrillers psicológico impactante, com um mistério envolvente com um final eletrizante que faz o leitor questionar tudo que acabou de ler. \nBest-seller do The New York Times.",
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
      "sinopse": "Verity Crawford é a autora best-seller por trás de uma série de sucesso. Ela está no auge de sua carreira, aclamada pela crítica e pelo público, no entanto, um súbito e terrível acidente acaba interrompendo suas atividades, deixando-a sem condições de concluir a história... E é nessa complexa circunstância que surge Lowen Ashleigh, uma escritora à beira da falência convidada a escrever, sob um pseudônimo, os três livros restantes da já consolidada série. \nPara que consiga entender melhor o processo criativo de Verity com relação aos livros publicados e, ainda, tentar descobrir seus possíveis planos para os próximos, Lowen decide passar alguns dias na casa dos Crawford, imersa no caótico escritório de Verity - e, lá, encontra uma espécie de autobiografia onde a escritora narra os fatos acontecidos desde o dia em que conhece Jeremy, seu marido, até os instantes imediatamente anteriores a seu acidente - incluindo sua perspectiva sobre as tragédias ocorridas às filhas do casal. \nQuanto mais o tempo passa, mais Lowen se percebe envolvida em uma confusa rede de mentiras e segredos, e, lentamente, adquire sua própria posição no jogo psicológico que rodeia aquela casa. Emocional e fisicamente atraída por Jeremy, ela precisa decidir: expor uma versão que nem ele conhece sobre a própria esposa ou manter o sigilo dos escritos de Verity? \nEm Verity , Colleen Hoover se afasta do estilo que a consagrou, os romances, para se aventurar em um suspense psicológico que deixou todo o mercado editorial sem palavras de tão avassalador. Através de uma narrativa perturbadora e chocante, Verity explora o lado mais sombrio das relações humanas deixando uma surpresinha chocante no final.",
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
      "sinopse": "Aos 35 anos, Nora Seed é uma mulher cheia de talentos e poucas conquistas. Arrependida das escolhas que fez no passado, ela vive se perguntando o que poderia ter acontecido caso tivesse vivido de maneira diferente. Após ser demitida e seu gato ser atropelado, Nora vê pouco sentido em sua existência e decide colocar um ponto final em tudo. Porém, quando se vê na Biblioteca da Meia-Noite, Nora ganha uma oportunidade única de viver todas as vidas que poderia ter vivido. \nNeste lugar entre a vida e a morte, e graças à ajuda de uma velha amiga, Nora pode, finalmente, se mudar para a Austrália, reatar relacionamentos antigos – ou começar outros –, ser uma estrela do rock, uma glaciologista, uma nadadora olímpica... enfim, as opções são infinitas. Mas será que alguma dessas outras vidas é realmente melhor do que a que ela já tem? \nEm A Biblioteca da Meia-Noite , Nora Seed se vê exatamente na situação pela qual todos gostaríamos de poder passar: voltar no tempo e desfazer algo de que nos arrependemos. Diante dessa possibilidade, Nora faz um mergulho interior viajando pelos livros da Biblioteca da Meia-Noite até entender o que é verdadeiramente importante na vida e o que faz, de fato, com que ela valha a pena ser vivida.",
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
      "sinopse": "O ataque terrorista às Torres Gêmeas do World Trade Center chocou o mundo vinte anos atrás, mas, para uma família, esse atentado teve um gosto mais amargo. A destruição dos edifícios deu fim à vida de Victória, a principal suspeita de um crime brutal ― sem que ela tivesse a chance de se defender. E sua irmã, Emma, ainda tinha um assunto pendente: naquele momento extremo, pouco antes de o prédio desabar, Victoria conseguiu realizar uma última ligação pedindo que Emma a ajudasse a provar sua inocência. O caso fica abandonado por duas décadas, até que a evolução das técnicas forenses possibilitou a identificação do DNA de uma das vítimas dos ataques ― justamente da mulher que foi considerada culpada pelo assassinato de um conhecido escritor. Avery Manson, uma famosa apresentadora de TV, vê no caso uma oportunidade de alavancar ainda mais a sua carreira. Seu faro jornalístico a leva até Emma, e ela decide fazer o que for preciso para reabrir o caso, expor as falhas da polícia e descobrir se Victoria era ou não inocente. Avery não imaginava que seria preciso remontar um complexo quebra-cabeça para se chegar à verdade. E ela própria guarda também muitos segredos que, na busca insaciável por conseguir uma ótima história, podem ser expostos e destruir todo o sucesso que conquistou. Para quem ama os clássicos de Agatha Christie ou adora suspenses e personagens misteriosos e envolventes. Procure nas cinzas, lançamento da Faro Editorial, cria um emaranhado de tramas e personagens interessantes, capazes de tudo, e que irão fisgar os leitores até as últimas páginas.",
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
      "sinopse": "O mundo de Mare Barrow é dividido pelo sangue: vermelho ou prateado. Mare e sua família são vermelhos: plebeus, humildes, destinados a servir uma elite prateada cujos poderes sobrenaturais os tornam quase deuses. Mare rouba o que pode para ajudar sua família a sobreviver e não tem esperanças de escapar do vilarejo miserável onde mora. Entretanto, numa reviravolta do destino, ela consegue um emprego no palácio real, onde, em frente ao rei e a toda a nobreza, descobre que tem um poder misterioso… Mas como isso seria possível, se seu sangue é vermelho? Em meio às intrigas dos nobres prateados, as ações da garota vão desencadear uma dança violenta e fatal, que colocará príncipe contra príncipe - e Mare contra seu próprio coração.",
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
      "sinopse": "Com uma narrativa madura, precisa e ao mesmo tempo delicada e poética, o romance narra a história do casal Dalva e Venâncio, que tem a vida transformada após uma perda trágica, resultado do ciúme doentio do marido, e de Lucy, a prostituta mais depravada e cobiçada da cidade, que entra no caminho deles, formando um triângulo amoroso. \nNa orelha do livro, Martha Medeiros escreve: “ Tudo é rio  é uma obra-prima, e não há exagero no que afirmo. É daqueles livros que, ao ser terminado, dá vontade de começar de novo, no mesmo instante, desta vez para se demorar em cada linha, saborear cada frase, deixar-se abraçar pela poesia da prosa. Na primeira leitura, essa entrega mais lenta é quase impossível, pois a correnteza dos acontecimentos nos leva até a última página sem nos dar chance para respirar. É preciso manter-se à tona ou a gente se afoga.” \nA metáfora do rio se revela por meio da narrativa que flui – ora intensa, ora mais branda – de forma ininterrupta, mas também por meio do suor, da saliva, do sangue, das lágrimas, do sêmen, e Carla faz isso sem ser apelativa, sem sentimentalismo barato, com a habilidade que só os melhores escritores possuem.",
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
      "sinopse": "Carla Madeira cria personagens que parecem estar vivos diante de nós. As emoções que sentem são palpáveis e suas reações, autênticas. Temos a sensação de conhecê-los de perto, inclusive as contradições e os pontos cegos. Tal virtude é evidente em seu livro de estreia e grande sucesso, Tudo é rio (2014), mas também no livro seguinte, A natureza da mordida (2018). \nOs personagens de Véspera , este seu novo romance, possuem a mesma incrível força vital. Mas se em Tudo é rio Carla os criou com poucas pinceladas e traços incisivos, aqui, para delinear suas personalidades, ela opta por uma superposição de camadas psicológicas. Se antes eles primavam por temperamentos drásticos ― capazes de extremos de paixão, ciúme, ódio e perdão ―, aqui a estratégia gradativa de composição confere-lhes uma dose maior de mistério, sugerindo ao leitor antecipações que só aos poucos se confirmam, ou não. A força emocional continua existindo, porém está menos visível, o que deixa a atmosfera ainda mais carregada de suspense e tensão. \nA narrativa começa com a pergunta: como se chega ao extremo? Vedina, uma mulher destroçada por um casamento marcado pelo desamor, em um momento de descontrole abandona seu filho e, imediatamente arrependida, volta para o lugar onde o deixou e não encontra quaisquer vestígios de sua presença. Este é o acontecimento nuclear da trama que expõe as entranhas de uma família – pai alcóolatra, mãe controladora, irmãos gêmeos tensionados pelas diferenças – que, como tantas outras famílias, torna-se um lugar onde as singularidades de cada um não são acolhidas, criando rachaduras por onde a violência se infiltra. \nContada em dois tempos, o dia do abandono e os dias que vieram antes dele, o romance avança como duas ondas até que elas se chocam e se iluminam. O leitor se vê diante de um espantoso presente que expõe o quanto as palavras são capazes de inventar a verdade.",
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
      "sinopse": "Alguns dos personagens mais marcantes da literatura norte-americana recente estão neste livro – ganhador do Pulitzer e do American Book Award –, que inspirou a obra-prima cinematográfica homônima dirigida por Steven Spielberg e o aclamado musical da Broadway, adaptado para o cinema. \nA cor púrpura, ambientado no Sul dos Estados Unidos, entre os anos 1900 e 1940, conta a história de Celie, mulher negra, pobre e semianalfabeta. Brutalizada desde a infância, a jovem foi estuprada pelo padrasto e forçada a se casar com Albert, um viúvo violento, pai de quatro filhos, que enxergava a esposa como uma serviçal e fazia dos sofrimentos físicos e morais sua rotina. \nDurante trinta anos, Celie escreve cartas para Deus e para a irmã Nettie, missionária na África. Os textos têm uma linguagem peculiar, que assume cadência e ritmo próprios à medida que Celie cresce e passa a reunir experiências, amores e amigos. Entre eles está a inesquecível Shug Avery, cantora de jazz e amante de Albert. \nApesar da dramaticidade do enredo, A cor púrpura é uma história sobre mudanças, redenção e amor. A partir da vida de Celie, a aclamada escritora Alice Walker tece críticas ao poder dado aos homens em uma sociedade que ainda hoje luta por igualdade entre gêneros, raças e classes sociais. Eleito pela BBC um dos 100 romances que definem o mundo, A cor púrpura é um retrato da vivência da mulher negra na época da segregação racial, cujos reflexos ainda estão presentes na nossa sociedade.",
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
      "sinopse": "Dois corações, antes tão apaixonados, agora não passam de estranhos. Anne Elliot é a filha preterida. Sob influência de uma família que dá importância demais a títulos e posição social, ela cometeu o amargo erro de rejeitar a mão do homem por quem se apaixonou. No entanto, anos depois, um reencontro abala seu coração. Mais do que uma história de amadurecimento e segundas chances, Persuasão é outra obra-prima de Jane Austen. Último romance escrito em vida pela autora, o livro se tornou conhecido por um humor sutil, uma linguagem fina e personagens icônicos. Além disso, discute as dificuldades da posição de uma mulher na sociedade, e os dramas impostos pela vida pública sobre a privada.  \nEsta edição especial da Antofágica conta com tradução inédita de Isadora Prospero e 40 pinturas a óleo da artista Nina Horikawa. A escritora Clara Alves assina a apresentação do livro com um texto sobre diferentes leituras de Jane Austen na adolescência e na vida adulta. Nos posfácios, a autora Paula Gicovate escreve sobre histórias de amor e segundas chances, a professora de Literatura Inglesa e Comparada da USP Sandra Guardini destaca aspectos técnicos como conflito, trama e personagens, e Renata Cristina Pereira, mestre em filosofia pela Unifesp, escreve sobre o conceito filosófico do amor e exemplos do amor na literatura. O QR Code na cinta direciona a duas videoaulas sobre o livro disponíveis no YouTube com Marcela Santos Brigida, professora e doutora em Literatura Inglesa pela UERJ.",
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
