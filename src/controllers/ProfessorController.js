const prisma = require('../database/prisma');

class ProfessorController {

  async criarMateria(req, res) {
    try {
      const professor = await prisma.professor.findUnique({
        where: { userId: req.user.id }
      });

      if (!professor)
        return res.status(404).json({ error: 'Professor não encontrado' });

      const materia = await prisma.materia.create({
        data: {
          nome: req.body.nome,
          professorId: professor.id
        }
      });

      return res.status(201).json(materia);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async minhasMaterias(req, res) {
  try {
    const professor = await prisma.professor.findUnique({
      where: { userId: req.user.id },
      include: {
        materias: {
          include: {
            alunos: {
              include: {
                aluno: {
                  include: {
                    user: true
                  }
                }
              }
            },
            frequencias: true
          }
        }
      }
    });

    if (!professor)
      return res.status(404).json({ error: 'Professor não encontrado' });

    return res.json(professor.materias);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

  async adicionarAluno(req, res) {
    const { materiaId } = req.params;
    const { alunoId } = req.body;

    try {
      const materia = await prisma.materia.findFirst({
        where: {
          id: Number(materiaId),
          professor: { userId: req.user.id }
        }
      });

      if (!materia)
        return res.status(403).json({ error: 'Matéria não pertence a você' });

      await prisma.materiaAluno.create({
        data: {
          materiaId: Number(materiaId),
          alunoId: Number(alunoId)
        }
      });

      return res.json({ message: 'Aluno adicionado com sucesso' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async historicoAluno(req, res) {
    const { alunoId } = req.params;

    try {
      const historico = await prisma.frequencia.findMany({
        where: { alunoId: Number(alunoId) },
        include: { materia: true }
      });

      return res.json(historico);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async meuPerfil(req, res) {
    try {
      const professor = await prisma.professor.findUnique({
        where: { userId: req.user.id },
        include: { user: true }
      });

      if (!professor)
        return res.status(404).json({ error: 'Professor não encontrado' });

      return res.json({
        id: professor.id,
        nome: professor.user.name,
        email: professor.user.email
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async relatorios(req, res) {
    try {
      const professor = await prisma.professor.findUnique({
        where: { userId: req.user.id }
      });

      if (!professor)
        return res.status(404).json({ error: 'Professor não encontrado' });

      const materias = await prisma.materia.findMany({
        where: { professorId: professor.id },
        include: {
          frequencias: {
            include: {
              aluno: {
                include: { user: true }
              }
            }
          }
        }
      });

      const resultado = materias.map(materia => ({
        materiaId: materia.id,
        materia: materia.nome,
        alunos: materia.frequencias.map(f => ({
          alunoId: f.aluno.id,
          alunoNome: f.aluno.user.name,
          data: f.data,
          presente: f.presente
        }))
      }));

      return res.json(resultado);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProfessorController();
