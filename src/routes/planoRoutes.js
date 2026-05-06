import { Router } from "express";
import {
    criarPlano,
    listarPlanos,
    atualizarPlano,
    deletarPlano,
} from "../controllers/planoController.js";
import { verificarToken } from "../middlewares/authmiddleware.js";
import { validarPlano } from "../middlewares/planomiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Planos
 *   description: Gerenciamento de planos de matrícula
 */

/**
 * @swagger
 * /planos:
 *   get:
 *     summary: Lista todos os planos disponíveis
 *     tags: [Planos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de planos
 *       401:
 *         description: Não autorizado
 */
router.get("/", verificarToken, listarPlanos);

/**
 * @swagger
 * /planos:
 *   post:
 *     summary: Cadastra um novo plano
 *     tags: [Planos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, valor]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Plano Mensal
 *               valor:
 *                 type: number
 *                 example: 99.90
 *     responses:
 *       201:
 *         description: Plano cadastrado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/", verificarToken, validarPlano, criarPlano);

/**
 * @swagger
 * /planos/{id}:
 *   put:
 *     summary: Atualiza um plano existente
 *     tags: [Planos]
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
 *               nome:
 *                 type: string
 *               valor:
 *                 type: number
 *     responses:
 *       200:
 *         description: Plano atualizado
 *       404:
 *         description: Plano não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put("/:id", verificarToken, validarPlano, atualizarPlano);

/**
 * @swagger
 * /planos/{id}:
 *   delete:
 *     summary: Remove um plano
 *     tags: [Planos]
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
 *         description: Plano deletado
 *       404:
 *         description: Plano não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", verificarToken, deletarPlano);

export default router;