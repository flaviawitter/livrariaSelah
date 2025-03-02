const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/estoque', async (req, res) => {
    const estoque = await prisma.estoque.findMany();
    res.json(estoque);
  });
  
  router.post('/estoque', async (req, res) => {
    const item = await prisma.estoque.create({ data: req.body });
    res.json(item);
  });
  
  module.exports = router;