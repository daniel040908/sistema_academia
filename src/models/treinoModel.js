import conexao from "../config/db.js";

export const criarTreino = async (aluno_id, instrutor_id, nome_treino, descricao, data_inicio, data_fim) => {
    const [resultado] = await conexao.query(
        "INSERT INTO treinos (aluno_id, instrutor_id, nome_treino, descricao, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?, ?)",
        [aluno_id, instrutor_id, nome_treino, descricao, data_inicio, data_fim ?? null]
    );
    return resultado;
};

export const buscarTreinos = async () => {
    const [rows] = await conexao.query(`
        SELECT t.*, a.nome AS aluno, i.nome AS instrutor
        FROM treinos t
        INNER JOIN alunos a ON t.aluno_id = a.id
        INNER JOIN instrutores i ON t.instrutor_id = i.id
    `);
    return rows;
};

export const atualizarTreino = async (id, aluno_id, instrutor_id, nome_treino, descricao, data_inicio, data_fim) => {
    const [resultado] = await conexao.query(
        `UPDATE treinos SET aluno_id=?, instrutor_id=?, nome_treino=?, descricao=?, data_inicio=?, data_fim=? WHERE id=?`,
        [aluno_id, instrutor_id, nome_treino, descricao, data_inicio, data_fim, id]
    );
    return resultado;
};

export const deletarTreino = async (id) => {
    const [resultado] = await conexao.query(
        "DELETE FROM treinos WHERE id=?",
        [id]
    );
    return resultado;
};