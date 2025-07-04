require('dotenv').config();
const express = require('express');
const cors = require('cors')
const clienteRoutes = require('./src/backend/routes/clienteRoutes');
const cartaoRoutes = require('./src/backend/routes/cartaoRoutes');
const enderecoRoutes = require('./src/backend/routes/enderecoRoutes');
const logRoutes = require('./src/backend/routes/logRoutes');
const telefoneRoutes = require('./src/backend/routes/telefoneRoutes');
const autoresRoutes = require('./src/backend/routes/autoresRoutes');
const editorasRoutes = require('./src/backend/routes/editorasRoutes');
const categoriasRoutes = require('./src/backend/routes/categoriasRoutes');
const livrosRoutes = require('./src/backend/routes/livrosRoutes');
const livrosCategoriasRoutes = require('./src/backend/routes/livrosCategoriasRoutes');
const grupoPrecificacaoRoutes = require('./src/backend/routes/grupoPrecificacaoRoutes');
const motivoInativacaoRoutes = require('./src/backend/routes/motivoInativacaoRoutes');
const motivoAtivacaoRoutes = require('./src/backend/routes/motivoAtivacaoRoutes');
const livrosInativacaoRoutes = require('./src/backend/routes/livrosInativacaoRoutes');
const livrosAtivacaoRoutes = require('./src/backend/routes/livrosAtivacaoRoutes');
const carrinhoRoutes = require('./src/backend/routes/carrinhoRoutes');
const pedidosRoutes = require('./src/backend/routes/pedidosRoutes');
const itemPedidoRoutes = require('./src/backend/routes/itemPedidoRoutes');
const fornecedorRoutes = require('./src/backend/routes/fornecedorRoutes');
const estoqueRoutes = require('./src/backend/routes/estoqueRoutes');
const pagamentoRoutes = require('./src/backend/routes/pagamentoRoutes');
const cupomRoutes = require('./src/backend/routes/cupomRoutes');
const freteRoutes = require('./src/backend/routes/freteRoutes');
const loginRoutes = require('./src/backend/routes/loginRoutes');
const pedidoCupomRoutes = require('./src/backend/routes/pedidoCupomRoutes');
const classificacaoGeminiRoutes = require('./src/backend/routes/classificacaoGeminiRoutes');


const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/api/cartoes', cartaoRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/telefones', telefoneRoutes);
app.use('/api/autores', autoresRoutes);
app.use('/api/editoras', editorasRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/livros', livrosRoutes);
app.use('/api/livros-categorias', livrosCategoriasRoutes);
app.use('/api/grupo-precificacao', grupoPrecificacaoRoutes);
app.use('/api/motivos-inativacao', motivoInativacaoRoutes);
app.use('/api/motivos-ativacao', motivoAtivacaoRoutes);
app.use('/api/livros-inativacao', livrosInativacaoRoutes);
app.use('/api/livros-ativacao', livrosAtivacaoRoutes);
app.use('/api/carrinho', carrinhoRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/itenspedido', itemPedidoRoutes);
app.use('/api/fornecedor', fornecedorRoutes);
app.use('/api/estoque', estoqueRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/cupons', cupomRoutes);
app.use('/api/fretes', freteRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/pedidocupom', pedidoCupomRoutes);
app.use('/api/classificacoesGemini', classificacaoGeminiRoutes);



app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
