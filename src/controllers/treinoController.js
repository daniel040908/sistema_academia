import * as treinoModel from "../models/treinoModel.js";

export const criarTreino = async (req, res) => {
    try {
        const { aluno_id, instrutor_id, descricao, data_inicio } = req.body;

        if (!aluno_id || !instrutor_id || !descricao) {
            return res.status(400).json({ msg: "Dados incompletos" });
        }

        const resultado = await treinoModel.criarTreino(aluno_id, instrutor_id, descricao, data_inicio);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const listarTreinos = async (req, res) => {
    try {
        const treinos = await treinoModel.buscarTreinos();
        res.json(treinos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const atualizarTreino = async (req, res) => {
    try {
        const { id } = req.params;
        const { aluno_id, instrutor_id, descricao, data_inicio } = req.body;

        const resultado = await treinoModel.atualizarTreino(id, aluno_id, instrutor_id, descricao, data_inicio);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Treino não encontrado" });
        }

        res.json({ msg: "Treino atualizado" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const deletarTreino = async (req, res) => {
    try {
        const { id } = req.params;

        const resultado = await treinoModel.deletarTreino(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Treino não encontrado" });
        }

        res.json({ msg: "Treino deletado" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};