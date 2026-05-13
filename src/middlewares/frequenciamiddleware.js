export const validarFrequencia = (req, res, next) => {
    const { aluno_id, data_frequencia, presente } = req.body;

    // Adicionado 'presente' na validação, pois é essencial para o registro
    if (!aluno_id || !data_frequencia || presente === undefined) {
        return res.status(400).json({ msg: "Dados obrigatórios: aluno_id, data e presente" });
    }

    next();
};