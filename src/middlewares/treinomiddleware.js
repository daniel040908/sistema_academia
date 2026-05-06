import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const validarTreino = (req, res, next) => {
    const { aluno_id, instrutor_id, descricao } = req.body;

    if (!aluno_id || !instrutor_id || !descricao) {
        return res.status(400).json({ msg: "Dados incompletos" });
    }

    next();
};