const express = require('express');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const ProfessorController = require('../controllers/ProfessorController');

const router = express.Router();

router.use(auth, role(['PROFESSOR']));

router.post('/materias/:materiaId/alunos', ProfessorController.adicionarAluno);
router.post('/materias', ProfessorController.criarMateria);
router.get('/turmas',ProfessorController.minhasMaterias);
router.get('/materias', ProfessorController.minhasMaterias);
router.post('/frequencia', ProfessorController.registrarFrequencia);
router.get('/frequencia/:alunoId', ProfessorController.historicoAluno);
router.get('/perfil',ProfessorController.meuPerfil);
router.get('/relatorios',ProfessorController.relatorios);
router.get('/perfil', ProfessorController.meuPerfil);
router.get('/relatorios', ProfessorController.relatorios);

module.exports = router;
