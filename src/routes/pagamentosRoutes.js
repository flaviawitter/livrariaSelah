const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/pagamentos', async (req, res) => {
    const pagamentos = await prisma.pagamentos.findMany();
    res.json(pagamentos);
  });
  
  router.post('/pagamentos', async (req, res) => {
    const pagamento = await prisma.pagamentos.create({ data: req.body });
    res.json(pagamento);
  });
  
  module.exports = router;
