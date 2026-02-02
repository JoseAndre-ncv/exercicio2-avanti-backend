const express = require('express');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');
const AlunoController = require('../controllers/AlunoController');

const router = express.Router();

router.use(auth, role(['ALUNO']));

router.get('/materias', AlunoController.materiasMatriculadas);
router.get('/frequencia', AlunoController.minhaFrequencia);
router.post('/justificativa', AlunoController.justificarFalta);

module.exports = router;
