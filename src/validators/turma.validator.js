const { z } = require('zod');

const criarTurmaSchema = z.object({
  nome: z.string().min(3)
});

module.exports = { criarTurmaSchema };
