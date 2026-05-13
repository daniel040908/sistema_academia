import * as treinoModel from "../models/treinoModel.js";


export const listarTreinos = async (req, res) => {
    try {
        const treinos = await treinoModel.buscarTreinos();
        res.json(treinos);
    } catch (error) {
        console.error("Erro ao listar treinos:", error.message);
        res.status(500).json({ erro: "Erro ao carregar a lista de treinos." });
    }
};

export const criarTreino = async (req, res) => {
    try {
        // Capturando nome_treino e data_fim vindos do formulário
        const { aluno_id, instrutor_id, nome_treino, descricao, data_inicio, data_fim } = req.body;

        const resultado = await treinoModel.criarTreino(aluno_id, instrutor_id, nome_treino, descricao, data_inicio, data_fim);
        res.status(201).json(resultado);
    } catch (error) {
        console.error("Erro ao criar treino:", error.message);
        res.status(500).json({ erro: error.message });
    }
};

export const atualizarTreino = async (req, res) => {
    try {
        const { id } = req.params;
        const { aluno_id, instrutor_id, nome_treino, descricao, data_inicio, data_fim } = req.body;

        const resultado = await treinoModel.atualizarTreino(id, aluno_id, instrutor_id, nome_treino, descricao, data_inicio, data_fim);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Treino não encontrado" });
        }

        res.json({ msg: "Treino atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// treinoController.js

export const deletarTreino = async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID do treino a partir dos parâmetros da URL

        // Chama a função do Model para eliminar o registo na base de dados
        const resultado = await treinoModel.deletarTreino(id);

        // Verifica se algum registo foi efetivamente eliminado
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Treino não encontrado para eliminar." });
        }

        // Retorna sucesso caso a eliminação ocorra corretamente
        res.json({ msg: "Treino eliminado com sucesso!" });
    } catch (error) {
        // Log do erro para debug e resposta de erro ao cliente
        console.error("Erro ao eliminar treino:", error.message);
        res.status(500).json({ erro: "Erro interno ao eliminar o treino: " + error.message });
    }
};
