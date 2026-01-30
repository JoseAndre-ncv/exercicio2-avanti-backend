const prisma = require('../prisma/client');

class FrequenciaRepository {
  static async registrar(turmaId, data, alunos) {
    const registros = alunos.map(aluno => ({
      turmaId,
      alunoId: aluno.alunoId,
      data,
      presente: aluno.presente
    }));

    return prisma.frequencia.createMany({
      data: registros
    });
  }

  static frequenciaPorAluno(alunoId) {
    return prisma.frequencia.findMany({
      where: { alunoId }
    });
  }

  static historicoPorAluno(alunoId) {
    return prisma.frequencia.findMany({
      where: { alunoId },
      include: { turma: true }
    });
  }

  static justificarFalta(alunoId, data, motivo) {
    return prisma.frequencia.updateMany({
      where: {
        alunoId,
        data,
        presente: false
      },
      data: {
        justificativa: motivo
      }
    });
  }
}

module.exports = FrequenciaRepository;
