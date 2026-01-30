const prisma = require('../database/prisma');

class ProfessorController {
  async minhasTurmas(req, res) {
    try {
      const professor = await prisma.professor.findUnique({
        where: { userId: req.user.id },
        include: { turmas: true }
      });

      return res.json(professor.turmas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async registrarFrequencia(req, res) {
    const { turmaId, alunoId, presente, data } = req.body;

    try {
      const frequencia = await prisma.frequencia.create({
        data: {
          turmaId,
          alunoId,
          presente,
          data: data ? new Date(data) : new Date()
        }
      });

      return res.status(201).json(frequencia);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async historicoAluno(req, res) {
    const { alunoId } = req.params;

    try {
      const historico = await prisma.frequencia.findMany({
        where: { alunoId: Number(alunoId) },
        include: { turma: true }
      });

      return res.json(historico);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProfessorController();
