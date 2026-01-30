const express = require('express');

const authRoutes = require('./auth.routes');
const adminRoutes = require('./admin.routes');
const professorRoutes = require('./professor.routes');
const alunoRoutes = require('./aluno.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/professor', professorRoutes);
router.use('/aluno', alunoRoutes);

module.exports = router;
