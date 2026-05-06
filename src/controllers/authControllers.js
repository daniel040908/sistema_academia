import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";
import * as usuarioModel from "../models/usuarioModel.js";

export const registrar = async (req, res) => {
    try {
        const { nome, email, senha, perfil } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ msg: "Dados obrigatórios" });
        }

        const usuarioExistente = await usuarioModel.buscarPorEmail(email);

        if (usuarioExistente) {
            return res.status(400).json({ msg: "Email já cadastrado" });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        await usuarioModel.criarUsuario(nome, email, senhaHash, perfil || "usuario");

        res.status(201).json({ msg: "Usuário criado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ msg: "Dados obrigatórios" });
        }

        const usuario = await usuarioModel.buscarPorEmail(email);

        if (!usuario) {
            return res.status(401).json({ msg: "Email ou senha inválidos" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ msg: "Email ou senha inválidos" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, perfil: usuario.perfil },
            jwtConfig.secret,
            { expiresIn: "8h" }
        );

        res.json({ msg: "Login realizado", token });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};