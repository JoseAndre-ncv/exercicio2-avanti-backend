const prisma = require('../database/prisma');

class AlunoController {

  // ✅ Matérias com professor incluído
  async materiasMatriculadas(req, res) {
    try {
      const aluno = await prisma.aluno.findUnique({
        where: { userId: req.user.id },
        include: {
          materias: {
            include: {
              materia: {
                include: {
                  professor: {
                    include: {
                      user: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      if (!aluno)
        return res.status(404).json({ error: 'Aluno não encontrado' });

      const materias = aluno.materias.map(m => ({
        id: m.materia.id,
        nome: m.materia.nome,
        professor: {
          id: m.materia.professor.id,
          nome: m.materia.professor.user.name
        }
      }));

      return res.json(materias);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // ✅ Frequência correta por aluno + matéria
  async minhaFrequencia(req, res) {
    try {
      const { materiaId } = req.query;

      if (!materiaId)
        return res.status(400).json({ error: 'materiaId é obrigatório' });

      const aluno = await prisma.aluno.findUnique({
        where: { userId: req.user.id }
      });

      if (!aluno)
        return res.status(404).json({ error: 'Aluno não encontrado' });

      // 🔒 garante que o aluno está matriculado
      const matricula = await prisma.materiaAluno.findFirst({
        where: {
          alunoId: aluno.id,
          materiaId: Number(materiaId)
        }
      });

      if (!matricula)
        return res.status(403).json({ error: 'Aluno não matriculado nessa matéria' });

      const frequencias = await prisma.frequencia.findMany({
        where: {
          alunoId: aluno.id,
          materiaId: Number(materiaId)
        },
        orderBy: {
          data: 'asc'
        }
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
        where: { id: Number(frequenciaId) },
        data: { justificativa }
      });

      return res.json(frequencia);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async meuPerfil(req, res) {
    try {
      const aluno = await prisma.aluno.findUnique({
        where: { userId: req.user.id },
        include: { user: true }
      });

      if (!aluno)
        return res.status(404).json({ error: 'Aluno não encontrado' });

      return res.json({
        id: aluno.id,
        nome: aluno.user.name,
        email: aluno.user.email
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AlunoController();
