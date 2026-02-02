const bcrypt = require('bcrypt');
const prisma = require('../database/prisma');
const { generateToken } = require('../config/jwt');
const { loginSchema } = require('../validators/auth.validator');

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = loginSchema.parse(req.body);

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user)
        return res.status(400).json({ error: 'Usuário não encontrado' });

      const valid = await bcrypt.compare(senha, user.password);
      if (!valid)
        return res.status(400).json({ error: 'Senha inválida' });

      const token = generateToken({ id: user.id, role: user.role });

      return res.json({
        token,
        role: user.role,
        name: user.name
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
