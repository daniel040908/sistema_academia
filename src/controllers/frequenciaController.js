import * as frequenciaModel from "../models/frequenciaModel.js";
 
export const registrarFrequencia = async (req, res) => {
    try {
        const { aluno_id, data_frequencia, presente, observacao } = req.body;
 
        const resultado = await frequenciaModel.criarFrequencia(aluno_id, data_frequencia, presente, observacao);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
 
export const listarFrequencias = async (req, res) => {
    try {
        const frequencias = await frequenciaModel.buscarFrequencias();
        res.json(frequencias);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
 
export const atualizarFrequencia = async (req, res) => {
    try {
        const { id } = req.params;
        const { aluno_id, data_frequencia, presente, observacao } = req.body;

        // Garantir que o ID existe antes de tentar atualizar (opcional, mas recomendado)
        const resultado = await frequenciaModel.atualizarFrequencia(id, aluno_id, data_frequencia, presente, observacao);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Registro de frequência não encontrado" });
        }

        res.json({ msg: "Frequência atualizada com sucesso" });
    } catch (error) {
        console.error(error); // Log para debug
        res.status(500).json({ erro: "Erro interno ao atualizar frequência" });
    }
};
 
export const deletarFrequencia = async (req, res) => {
    try {
        const { id } = req.params;
 
        const resultado = await frequenciaModel.deletarFrequencia(id);
 
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ msg: "Registro não encontrado" });
        }
 
        res.json({ msg: "Frequência deletada" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};