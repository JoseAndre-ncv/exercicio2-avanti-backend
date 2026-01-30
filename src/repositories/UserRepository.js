const prisma = require('../prisma/client');

class UserRepository {
  static create(data) {
    return prisma.user.create({ data });
  }

  static findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  }

  static findById(id) {
    return prisma.user.findUnique({ where: { id } });
  }

  static findByRole(role) {
    return prisma.user.findMany({ where: { role } });
  }
}

module.exports = UserRepository;
