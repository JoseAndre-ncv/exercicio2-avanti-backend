const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../database/prisma');
const { secret, expiresIn } = require('../config/jwt');
const { loginSchema } = require('../validators/auth.validator');

class AuthController {
  async login(req, res) {
    // ✅ validação no lugar certo
    const { email, password } = loginSchema.parse(req.body);

    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json({ error: 'Senha inválida' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        secret,
        { expiresIn }
      );

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
