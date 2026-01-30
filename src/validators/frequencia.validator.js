const { z } = require('zod');

const registrarFrequenciaSchema = z.object({
  turmaId: z.number(),
  data: z.string(),
  alunos: z.array(
    z.object({
      alunoId: z.number(),
      presente: z.boolean()
    })
  )
});

module.exports = { registrarFrequenciaSchema };
