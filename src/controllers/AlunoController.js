const prisma = require('../database/prisma');


class AlunoController {
  async turmasMatriculadas(req, res) {
    try {
      const aluno = await prisma.aluno.findUnique({
        where: { userId: req.user.id },
        include: {
          turmas: {
            include: { turma: true }
          }
        }
      });

      return res.json(aluno.turmas.map(t => t.turma));
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async minhaFrequencia(req, res) {
    try {
      const aluno = await prisma.aluno.findUnique({
        where: { userId: req.user.id }
      });

      const frequencias = await prisma.frequencia.findMany({
        where: { alunoId: aluno.id },
        include: { turma: true }
      });

      return res.json(frequencias);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async justificarFalta(req, res) {
    const { frequenciaId, justificativa } = req.body;

    try {
      const frequencia = await prisma.frequencia.update({
        where: { id: frequenciaId },
        data: { justificativa }
      });

      return res.json(frequencia);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AlunoController();
