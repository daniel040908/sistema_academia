import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

export const validarInstrutor = (req, res, next) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(400).json({ msg: "Nome obrigatório" });
    }

    next();
};