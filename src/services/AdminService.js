const TurmaRepository = require('../repositories/TurmaRepository');

class AdminService {
  static async criarTurma(dados) {
    return TurmaRepository.create(dados);
  }

  static async vincularProfessor(turmaId, professorId) {
    return TurmaRepository.vincularProfessor(turmaId, professorId);
  }

  static async vincularAluno(turmaId, alunoId) {
    return TurmaRepository.vincularAluno(turmaId, alunoId);
  }

  static async frequenciaGeral() {
    return TurmaRepository.frequenciaGeral();
  }
}

module.exports = AdminService;
