import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const validarFrequencia = (req, res, next) => {
    const { aluno_id, data } = req.body;

    if (!aluno_id || !data) {
        return res.status(400).json({ msg: "Dados obrigatórios" });
    }

    next();
};