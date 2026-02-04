const express = require('express');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const ProfessorController = require('../controllers/ProfessorController');
const FrequenciaController = require('../controllers/FrequenciaController');

const router = express.Router();

router.use(auth, role(['PROFESSOR']));

router.post('/materias', ProfessorController.criarMateria);
router.get('/materias', ProfessorController.minhasMaterias);
router.get('/turmas', ProfessorController.minhasMaterias);

router.post('/materias/:materiaId/alunos', ProfessorController.adicionarAluno);

router.post('/frequencia', FrequenciaController.registrar);
router.get('/frequencia/:alunoId', ProfessorController.historicoAluno);

router.get('/perfil', ProfessorController.meuPerfil);
router.get('/relatorios', ProfessorController.relatorios);

module.exports = router;
