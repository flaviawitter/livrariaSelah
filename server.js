const express = require('express');
const clienteRoutes = require('./src/routes/clienteRoutes');
const tipoTelefoneRoutes = require('./src/routes/tipoTelefoneRoutes');
const bandeiraCartaoRoutes = require('./src/routes/bandeiraCartaoRoutes');
const cartaoRoutes = require('./src/routes/cartaoRoutes');
const cidadeRoutes = require('./src/routes/cidadeRoutes');
const estadoRoutes = require('./src/routes/estadoRoutes');
const paisRoutes = require('./src/routes/paisRoutes');
const enderecoRoutes = require('./src/routes/enderecoRoutes');
const logRoutes = require('./src/routes/logRoutes');
const telefoneRoutes = require('./src/routes/telefoneRoutes');
const tipoEnderecoRoutes = require('./src/routes/tipoEnderecoRoutes');
const tipoLogradouroRoutes = require('./src/routes/tipoLogradouroRoutes');
const tipoResidenciaRoutes = require('./src/routes/tipoResidenciaRoutes');

const app = express();
app.use(express.json());

app.use('/api/clientes', clienteRoutes);
app.use('/api/tipos-telefone', tipoTelefoneRoutes);
app.use('/api/bandeiras-cartao', bandeiraCartaoRoutes);
app.use('/api/cartoes', cartaoRoutes);
app.use('/api/cidades', cidadeRoutes);
app.use('/api/estados', estadoRoutes);
app.use('/api/paises', paisRoutes);
app.use('/api/enderecos', enderecoRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/telefones', telefoneRoutes);
app.use('/api/tipos-endereco', tipoEnderecoRoutes);
app.use('/api/tipos-logradouro', tipoLogradouroRoutes);
app.use('/api/tipos-residencia', tipoResidenciaRoutes);

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
