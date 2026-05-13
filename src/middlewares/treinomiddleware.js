export const validarTreino = (req, res, next) => {
    const { aluno_id, instrutor_id, nome_treino, descricao, data_inicio } = req.body;

    // Adicionado nome_treino e data_inicio na validação obrigatória
    if (!aluno_id || !instrutor_id || !nome_treino || !descricao || !data_inicio) {
        return res.status(400).json({ msg: "Campos obrigatórios: Aluno, Instrutor, Nome do Treino, Descrição e Data de Início." });
    }

    next();
};