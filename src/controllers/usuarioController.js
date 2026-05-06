import bcrypt from "bcryptjs";
import * as usuarioModel from "../models/usuarioModel.js";

export const criarUsuario = async (req, res) => {
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

    const resultado = await usuarioModel.criarUsuario(
      nome,
      email,
      senhaHash,
      perfil || "usuario"
    );

    res.status(201).json(resultado);

  } catch (error) {
    console.error(error); // 👈 importante
    res.status(500).json({ erro: error.message });
  }
};



export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.buscarTodos();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await usuarioModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, perfil } = req.body;

        const resultado = await usuarioModel.atualizarUsuario(id, nome, email, perfil);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        res.json({ msg: "Usuário atualizado" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await usuarioModel.deletarUsuario(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Usuário não encontrado" });
        }

        res.json({ msg: "Usuário deletado" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};