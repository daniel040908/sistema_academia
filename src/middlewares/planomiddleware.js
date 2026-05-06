import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const validarPlano = (req, res, next) => {
    const { nome, valor } = req.body;

    if (!nome || valor == null) {
        return res.status(400).json({ msg: "Nome e valor são obrigatórios" });
    }

    next();
};