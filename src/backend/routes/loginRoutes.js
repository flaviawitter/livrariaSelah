const express = require('express');
const { verificarLogin } = require('../controllers/loginController');

const router = express.Router();

router.post('/', verificarLogin); // Agora a rota usa POST

module.exports = router;
