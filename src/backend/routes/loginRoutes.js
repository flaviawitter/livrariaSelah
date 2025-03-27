const express = require('express');
const { verificarLogin } = require('../controllers/loginController');

const router = express.Router();

router.post('/login', verificarLogin);

module.exports = router;
