const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/pedidos', async (req, res) => {
    const pedidos = await prisma.pedidos.findMany();
    res.json(pedidos);
  });
  
  router.post('/pedidos', async (req, res) => {
    const pedido = await prisma.pedidos.create({ data: req.body });
    res.json(pedido);
  });

  module.exports = router;
