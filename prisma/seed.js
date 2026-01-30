const prisma = require('../src/prisma/client');
const bcrypt = require('bcryptjs');

async function main() {
  const senha = await bcrypt.hash('123456', 10);

  const admin = await prisma.user.create({
    data: {
      nome: 'Administrador',
      email: 'admin@admin.com',
      senha,
      role: 'ADMIN'
    }
  });

  const professor = await prisma.user.create({
    data: {
      nome: 'Professor',
      email: 'prof@escola.com',
      senha,
      role: 'PROFESSOR'
    }
  });

  const aluno = await prisma.user.create({
    data: {
      nome: 'Aluno',
      email: 'aluno@escola.com',
      senha,
      role: 'ALUNO'
    }
  });

  await prisma.turma.create({
    data: {
      nome: 'Turma A',
      professores: {
        connect: { id: professor.id }
      },
      alunos: {
        connect: { id: aluno.id }
      }
    }
  });

  console.log('🌱 Seed executado com sucesso');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
