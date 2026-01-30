const TurmaRepository = require('../repositories/TurmaRepository');
const FrequenciaRepository = require('../repositories/FrequenciaRepository');

class AlunoService {
  static async turmasMatriculadas(alunoId) {
    return TurmaRepository.findByAluno(alunoId);
  }

  static async minhaFrequencia(alunoId) {
    return FrequenciaRepository.frequenciaPorAluno(alunoId);
  }

  static async justificarFalta({ alunoId, data, motivo }) {
    return FrequenciaRepository.justificarFalta(alunoId, data, motivo);
  }
}

module.exports = AlunoService;
