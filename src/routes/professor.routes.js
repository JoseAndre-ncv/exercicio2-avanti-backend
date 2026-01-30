const express = require('express');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const ProfessorController = require('../controllers/ProfessorController');

const router = express.Router();

router.use(auth, role(['PROFESSOR']));

router.get('/turmas', ProfessorController.minhasTurmas);
router.post('/frequencia', ProfessorController.registrarFrequencia);
router.get('/frequencia/:alunoId', ProfessorController.historicoAluno);

module.exports = router;
