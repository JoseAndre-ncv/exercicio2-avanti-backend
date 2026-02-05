Este projeto utiliza o banco de dados PostgreSQL. Para que o backend funcione corretamente e apresente os mesmos dados usados no desenvolvimento do AulaCheck, é necessário executar os comandos SQL abaixo. Eles inserem usuários, professores, alunos, matérias, matrículas e registros de frequência exatamente como foram usados no projeto.

Execute os comandos no PostgreSQL após a criação das tabelas.

```md
INSERT INTO "User" (id, name, email, password, role)
VALUES
(1, 'João Pereira', 'joao.pereira@escola.com',
'$2b$10$EAdKuFMTlULqRTSktu3c0eAe.zagE.8NTpb1YH1HsIltMAl64OkXm', 'ALUNO'),
(2, 'Maria Oliveira', 'maria.oliveira@escola.com',
'$2b$10$AR7zmD9B5UxV1g/2SpFIzOKFdb9ben23VdNfPi8JVRmbEXTYjSrWK', 'ALUNO'),
(3, 'Carlos Souza', 'carlos.souza@escola.com',
'$2b$10$jRZ2fMyvXcpV0s0wEMcNcu5vLGbz9cnkgdgH8glaGKQNtGNznqNaK', 'ALUNO'),
(4, 'Ana Silva', 'ana.silva@escola.com',
'$2b$10$odLsPKRpGpN2daJtFtzb/.VIoPzs1OnCZRLCBNuizQqN2Wp5Uh/O6', 'PROFESSOR'),
(5, 'Bruno Costa', 'bruno.costa@escola.com',
'$2b$10$/2p/ycV7XrGyv0Ku0tNrHerOhhgwJHRYfvObpixb75fDbw95GbHBe', 'PROFESSOR'),
(6, 'Carla Mendes', 'carla.mendes@escola.com',
'$2b$10$q0lqyG9660EsFfM/fhcDDuUVtmefdB7wRZZqTO9omvbyOxsX//sx2', 'PROFESSOR');

INSERT INTO "Professor" ("userId") VALUES
(4),
(5),
(6);

INSERT INTO "Aluno" ("userId") VALUES
(1),
(2),
(3);

INSERT INTO "Materia" (id, nome, "professorId") VALUES
(201, 'Matemática', 1),
(202, 'Português', 2),
(203, 'Inglês', 3);

INSERT INTO "MateriaAluno" ("materiaId", "alunoId") VALUES
(201, 1), (202, 1), (203, 1),
(201, 2), (202, 2), (203, 2),
(201, 3), (202, 3), (203, 3);

INSERT INTO "Frequencia" ("alunoId", "materiaId", data, presente) VALUES
(1, 201, '2026-01-01', true),
(1, 201, '2026-01-02', true),
(1, 201, '2026-01-05', true),
(1, 201, '2026-01-06', true),
(1, 202, '2026-01-01', true),
(1, 202, '2026-01-02', false),
(1, 202, '2026-01-05', true),
(1, 202, '2026-01-05', false),
(1, 202, '2026-01-06', false),
(2, 201, '2026-01-01', true),
(3, 201, '2026-01-02', false);
