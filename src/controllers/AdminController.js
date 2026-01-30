const prisma = require('../database/prisma');

class AdminController {
  async criarTurma(req, res) {
    const { nome, professorId } = req.body;

    try {
      const turma = await prisma.turma.create({
        data: { nome, professorId }
      });

      return res.status(201).json(turma);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async vincularProfessor(req, res) {
    const { turmaId, professorId } = req.body;

    try {
      const turma = await prisma.turma.update({
        where: { id: turmaId },
        data: { professorId }
      });

      return res.json(turma);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async vincularAluno(req, res) {
    const { turmaId, alunoId } = req.body;

    try {
      const vinculo = await prisma.turmaAluno.create({
        data: { turmaId, alunoId }
      });

      return res.status(201).json(vinculo);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async frequenciaGeral(req, res) {
    try {
      const frequencias = await prisma.frequencia.findMany({
        include: {
          aluno: { include: { user: true } },
          turma: true
        }
      });

      return res.json(frequencias);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AdminController();
