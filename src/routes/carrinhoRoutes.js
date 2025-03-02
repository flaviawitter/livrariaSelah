const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/carrinho', async (req, res) => {
    const carrinho = await prisma.carrinho.findMany();
    res.json(carrinho);
  });
  
  router.post('/carrinho', async (req, res) => {
    const item = await prisma.carrinho.create({ data: req.body });
    res.json(item);
  });
  
  module.exports = router;
