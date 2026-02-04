/*
  Warnings:

  - A unique constraint covering the columns `[alunoId,materiaId,data]` on the table `Frequencia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[materiaId,alunoId]` on the table `MateriaAluno` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Frequencia_alunoId_materiaId_data_key" ON "Frequencia"("alunoId", "materiaId", "data");

-- CreateIndex
CREATE UNIQUE INDEX "MateriaAluno_materiaId_alunoId_key" ON "MateriaAluno"("materiaId", "alunoId");
