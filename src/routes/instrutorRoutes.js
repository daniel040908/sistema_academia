import { Router } from "express";
import {
    criarInstrutor,
    listarInstrutores,
    atualizarInstrutor,
    deletarInstrutor,
} from "../controllers/instrutorController.js";
import { verificarToken } from "../middlewares/authmiddleware.js";
import { validarInstrutor } from "../middlewares/instrutormiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Instrutores
 *   description: Gerenciamento de instrutores da academia
 */

/**
 * @swagger
 * /instrutores:
 *   get:
 *     summary: Lista todos os instrutores
 *     tags: [Instrutores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de instrutores
 *       401:
 *         description: Não autorizado
 */
router.get("/", verificarToken, listarInstrutores);

/**
 * @swagger
 * /instrutores:
 *   post:
 *     summary: Cadastra um novo instrutor
 *     tags: [Instrutores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Carlos Pereira
 *               especialidade:
 *                 type: string
 *                 example: Musculação
 *     responses:
 *       201:
 *         description: Instrutor cadastrado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post("/", verificarToken, validarInstrutor, criarInstrutor);

/**
 * @swagger
 * /instrutores/{id}:
 *   put:
 *     summary: Atualiza dados de um instrutor
 *     tags: [Instrutores]
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
 *               especialidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Instrutor atualizado
 *       404:
 *         description: Instrutor não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put("/:id", verificarToken, validarInstrutor, atualizarInstrutor);

/**
 * @swagger
 * /instrutores/{id}:
 *   delete:
 *     summary: Remove um instrutor
 *     tags: [Instrutores]
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
 *         description: Instrutor deletado
 *       404:
 *         description: Instrutor não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", verificarToken, deletarInstrutor);

export default router;