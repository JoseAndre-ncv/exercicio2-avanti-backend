const prisma = require('../prisma/client');

class TurmaRepository {
  static create(data) {
    return prisma.turma.create({ data });
  }

  static vincularProfessor(turmaId, professorId) {
    return prisma.turma.update({
      where: { id: turmaId },
      data: {
        professores: {
          connect: { id: professorId }
        }
      }
    });
  }

  static vincularAluno(turmaId, alunoId) {
    return prisma.turma.update({
      where: { id: turmaId },
      data: {
        alunos: {
          connect: { id: alunoId }
        }
      }
    });
  }

  static findByProfessor(professorId) {
    return prisma.turma.findMany({
      where: {
        professores: {
          some: { id: professorId }
        }
      }
    });
  }

  static findByAluno(alunoId) {
    return prisma.turma.findMany({
      where: {
        alunos: {
          some: { id: alunoId }
        }
      }
    });
  }

  static frequenciaGeral() {
    return prisma.frequencia.findMany({
      include: {
        aluno: true,
        turma: true
      }
    });
  }
}

module.exports = TurmaRepository;
