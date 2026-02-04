const prisma = require('../src/database/prisma');
const bcrypt = require('bcryptjs');

async function main() {
  const password = await bcrypt.hash('123456', 10);

  // ======================
  // USER + ADMIN
  // ======================
  const adminUser = await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@admin.com',
      password,
      role: 'ADMIN',
      admin: {
        create: {}
      }
    }
  });

  // ======================
  // USER + PROFESSOR
  // ======================
  const professorUser = await prisma.user.create({
    data: {
      name: 'Professor',
      email: 'prof@escola.com',
      password,
      role: 'PROFESSOR',
      professor: {
        create: {}
      }
    }
  });

  // ======================
  // USER + ALUNO
  // ======================
  const alunoUser = await prisma.user.create({
    data: {
      name: 'Aluno',
      email: 'aluno@escola.com',
      password,
      role: 'ALUNO',
      aluno: {
        create: {}
      }
    }
  });

  // Buscar entidades criadas
  const professor = await prisma.professor.findUnique({
    where: { userId: professorUser.id }
  });

  const aluno = await prisma.aluno.findUnique({
    where: { userId: alunoUser.id }
  });

  // ======================
  // TURMA
  // ======================
  const turma = await prisma.turma.create({
    data: {
      nome: 'Turma A',
      professorId: professor.id
    }
  });

  // ======================
  // VINCULAR ALUNO À TURMA
  // ======================
  await prisma.turmaAluno.create({
    data: {
      turmaId: turma.id,
      alunoId: aluno.id
    }
  });

  console.log('🌱 Seed executado com sucesso');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
