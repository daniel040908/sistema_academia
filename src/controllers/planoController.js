import * as planoModel from "../models/planoModel.js";

export const criarPlano = async (req, res) => {
    try {
        const { nome, descricao, valor, duracao_meses, ativo } = req.body;

        if (!nome || valor == null) {
            return res.status(400).json({ msg: "Dados obrigatórios: nome e valor" });
        }

        const resultado = await planoModel.criarPlano(nome, descricao, valor, duracao_meses, ativo);
        res.status(201).json(resultado);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const listarPlanos = async (req, res) => {
    try {
        const planos = await planoModel.buscarPlanos();
        res.json(planos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const atualizarPlano = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, valor, duracao_meses, ativo } = req.body;

        const resultado = await planoModel.atualizarPlano(id, nome, descricao, valor, duracao_meses, ativo);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Plano não encontrado" });
        }

        res.json({ msg: "Plano atualizado" });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const deletarPlano = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await planoModel.deletarPlano(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Plano não encontrado" });
        }

        res.json({ msg: "Plano deletado" });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};