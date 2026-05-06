import * as instrutorModel from "../models/instrutorModel.js";

export const criarInstrutor = async (req, res) => {
    try {
        const { nome, especialidade } = req.body;

        if (!nome) {
            return res.status(400).json({ msg: "Nome obrigatório" });
        }

        const resultado = await instrutorModel.criarInstrutor(nome, especialidade);

        res.status(201).json(resultado);

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const listarInstrutores = async (req, res) => {
    try {
        const dados = await instrutorModel.buscarInstrutores();
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const atualizarInstrutor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, especialidade } = req.body;

        const resultado = await instrutorModel.atualizarInstrutor(id, nome, especialidade);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Instrutor não encontrado" });
        }

        res.json({ msg: "Instrutor atualizado" });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

export const deletarInstrutor = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await instrutorModel.deletarInstrutor(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Instrutor não encontrado" });
        }

        res.json({ msg: "Instrutor deletado" });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};