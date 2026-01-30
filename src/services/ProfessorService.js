const TurmaRepository = require('../repositories/TurmaRepository');
const FrequenciaRepository = require('../repositories/FrequenciaRepository');

class ProfessorService {
  static async minhasTurmas(professorId) {
    return TurmaRepository.findByProfessor(professorId);
  }

  static async registrarFrequencia({ turmaId, data, alunos }) {
    /*
      alunos: [
        { alunoId, presente }
      ]
    */
    return FrequenciaRepository.registrar(turmaId, data, alunos);
  }

  static async historicoAluno(alunoId) {
    return FrequenciaRepository.historicoPorAluno(alunoId);
  }
}

module.exports = ProfessorService;
