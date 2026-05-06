import { Router } from "express";
import {
    criarTreino,
    listarTreinos,
    atualizarTreino,
    deletarTreino,
} from "../controllers/treinoController.js";
import { verificarToken } from "../middlewares/authmiddleware.js";
import { validarTreino } from "../middlewares/treinomiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Treinos
 *   description: Gerenciamento de treinos dos alunos
 */

/**
 * @swagger
 * /treinos:
 *   get:
 *     summary: Lista todos os treinos
 *     tags: [Treinos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de treinos
 *       401:
 *         description: Não autorizado
 */
router.get("/", verificarToken, listarTreinos);

/**
 * @swagger
 * /treinos:
 *   post:
 *     summary: Cadastra um novo treino
 *     tags: [Treinos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [aluno_id, instrutor_id, descricao]
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 example: 1
 *               instrutor_id:
 *                 type: integer
 *                 example: 2
 *               descricao:
 *                 type: string
 *                 example: Treino de pernas - 4x12
 *               data_inicio:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-01"
 *     responses:
 *       201:
 *         description: Treino cadastrado
 *       400:
 *         description: Dados incompletos
 *       401:
 *         description: Não autorizado
 */
router.post("/", verificarToken, validarTreino, criarTreino);

/**
 * @swagger
 * /treinos/{id}:
 *   put:
 *     summary: Atualiza um treino
 *     tags: [Treinos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               aluno_id:
 *                 type: integer
 *               instrutor_id:
 *                 type: integer
 *               descricao:
 *                 type: string
 *               data_inicio:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Treino atualizado
 *       404:
 *         description: Treino não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put("/:id", verificarToken, validarTreino, atualizarTreino);

/**
 * @swagger
 * /treinos/{id}:
 *   delete:
 *     summary: Remove um treino
 *     tags: [Treinos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Treino deletado
 *       404:
 *         description: Treino não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", verificarToken, deletarTreino);

export default router;