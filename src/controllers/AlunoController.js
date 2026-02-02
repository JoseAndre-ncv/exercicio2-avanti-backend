const prisma = require('../database/prisma');


class AlunoController {
  async materiasMatriculadas(req, res) {
  try {
    const aluno = await prisma.aluno.findUnique({
      where: { userId: req.user.id },
      include: {
        materias: {
          include: {
            materia: true
          }
        }
      }
    });

    return res.json(aluno.materias.map(m => m.materia));
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

  async minhaFrequencia(req, res) {
    try {
      const aluno = await prisma.aluno.findUnique({
        where: { userId: req.user.id }
      });

      const {materiaId}=req.query;

      const frequencias = await prisma.frequencia.findMany({
        where: { alunoId: aluno.id, materiaId:Number(materiaId) }
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
