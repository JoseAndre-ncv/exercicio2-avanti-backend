-- DropForeignKey
ALTER TABLE "Materia" DROP CONSTRAINT "Materia_professorId_fkey";

-- DropForeignKey
ALTER TABLE "MateriaAluno" DROP CONSTRAINT "MateriaAluno_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "MateriaAluno" DROP CONSTRAINT "MateriaAluno_materiaId_fkey";

-- AlterTable
CREATE SEQUENCE materia_id_seq;
ALTER TABLE "Materia" ALTER COLUMN "id" SET DEFAULT nextval('materia_id_seq');
ALTER SEQUENCE materia_id_seq OWNED BY "Materia"."id";

-- AddForeignKey
ALTER TABLE "Materia" ADD CONSTRAINT "Materia_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaAluno" ADD CONSTRAINT "MateriaAluno_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "Materia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MateriaAluno" ADD CONSTRAINT "MateriaAluno_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
