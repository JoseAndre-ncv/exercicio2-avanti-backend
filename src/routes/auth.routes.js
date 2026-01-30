const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

/**
 * Login (ADM / Professor / Aluno)
 */
router.post('/login', AuthController.login);

module.exports = router;
