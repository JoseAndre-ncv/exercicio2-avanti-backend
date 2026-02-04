const bcrypt = require('bcrypt');
const prisma = require('../database/prisma');
const { generateToken } = require('../config/jwt');
const { loginSchema } = require('../validators/auth.validator');

class AuthController {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Dados incompletos" });
      }

      const userExists = await prisma.user.findUnique({
        where: { email }
      });

      if (userExists) {
        return res.status(400).json({ error: "Usuário já existe" });
      }

      const hash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hash,
          role
        }
      });

      if (role === "ALUNO") {
        await prisma.aluno.create({
          data: { userId: user.id }
        });
      }

      if (role === "PROFESSOR") {
        await prisma.professor.create({
          data: { userId: user.id }
        });
      }

      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
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
