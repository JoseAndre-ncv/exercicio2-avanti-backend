const prisma = require('../database/prisma');

class FrequenciaController {

  async registrar(req, res) {
    const { materiaId, alunoId, presente, data } = req.body;

    try {
      const frequencia = await prisma.frequencia.upsert({
        where: {
          alunoId_materiaId_data: {
            alunoId: Number(alunoId),
            materiaId: Number(materiaId),
            data: new Date(data)
          }
        },
        update: {
          presente
        },
        create: {
          alunoId: Number(alunoId),
          materiaId: Number(materiaId),
          presente,
          data: new Date(data)
        }
      });

      return res.status(201).json(frequencia);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new FrequenciaController();
