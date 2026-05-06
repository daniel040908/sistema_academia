import { Router } from "express";
import {
    registrarFrequencia,
    listarFrequencias,
    atualizarFrequencia,
    deletarFrequencia,
} from "../controllers/frequenciaController.js";
import { verificarToken } from "../middlewares/authmiddleware.js";
import { validarFrequencia } from "../middlewares/frequenciamiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Frequencias
 *   description: Controle de frequência dos alunos
 */

/**
 * @swagger
 * /frequencias:
 *   get:
 *     summary: Lista todos os registros de frequência
 *     tags: [Frequencias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de frequências
 *       401:
 *         description: Não autorizado
 */
router.get("/", verificarToken, listarFrequencias);

/**
 * @swagger
 * /frequencias:
 *   post:
 *     summary: Registra a frequência de um aluno
 *     tags: [Frequencias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [aluno_id, data]
 *             properties:
 *               aluno_id:
 *                 type: integer
 *                 example: 1
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-06"
 *               presente:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Frequência registrada
 *       400:
 *         description: Dados obrigatórios ausentes
 *       401:
 *         description: Não autorizado
 */
router.post("/", verificarToken, validarFrequencia, registrarFrequencia);

/**
 * @swagger
 * /frequencias/{id}:
 *   put:
 *     summary: Atualiza um registro de frequência
 *     tags: [Frequencias]
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
 *               data:
 *                 type: string
 *                 format: date
 *               presente:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Frequência atualizada
 *       404:
 *         description: Registro não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put("/:id", verificarToken, validarFrequencia, atualizarFrequencia);

/**
 * @swagger
 * /frequencias/{id}:
 *   delete:
 *     summary: Remove um registro de frequência
 *     tags: [Frequencias]
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
 *         description: Frequência deletada
 *       404:
 *         description: Registro não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete("/:id", verificarToken, deletarFrequencia);

export default router;