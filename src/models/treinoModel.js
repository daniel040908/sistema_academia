import conexao from "../config/db.js";

export const buscarTreinos = async () => {
    const [rows] = await conexao.query(`
        SELECT t.*, a.nome AS aluno, i.nome AS instrutor
        FROM treinos t
        INNER JOIN alunos a ON t.aluno_id = a.id
        INNER JOIN instrutores i ON t.instrutor_id = i.id
    `);
    return rows;
};

export const atualizarTreino = async (id, aluno_id, instrutor_id, descricao, data_inicio) => {
    const [resultado] = await conexao.query(
        `UPDATE treinos SET aluno_id=?, instrutor_id=?, descricao=?, data_inicio=? WHERE id=?`,
        [aluno_id, instrutor_id, descricao, data_inicio, id]
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