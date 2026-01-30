const express = require('express');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const AdminController = require('../controllers/AdminController');

const router = express.Router();

router.use(auth, role(['ADMIN']));

router.post('/turmas', AdminController.criarTurma);
router.post('/vincular-professor', AdminController.vincularProfessor);
router.post('/vincular-aluno', AdminController.vincularAluno);
router.get('/frequencia-geral', AdminController.frequenciaGeral);

module.exports = router;
