import conexao from "../config/db.js";

export const criarAluno = async (nome, email, plano_id, telefone, data_nascimento, status, cpf) => {
    const [resultado] = await conexao.query(
        "INSERT INTO alunos (nome, email, plano_id, telefone, data_nascimento, status, cpf) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [nome, email, plano_id, telefone, data_nascimento, status, cpf]
    );
    return resultado;
};

export const buscarAlunos = async () => {
    const [rows] = await conexao.query(`
        SELECT a.*, p.nome AS plano
        FROM alunos a
        LEFT JOIN planos p ON a.plano_id = p.id
    `);
    return rows;
};

export const atualizarAluno = async (id, nome, email, plano_id, telefone, data_nascimento, status, cpf) => {
    const [resultado] = await conexao.query(
        "UPDATE alunos SET nome=?, email=?, plano_id=?, telefone=?, data_nascimento=?, status=?, cpf=? WHERE id=?",
        [nome, email, plano_id, telefone, data_nascimento, status, cpf, id]
    );
    return resultado;
};

export const deletarAluno = async (id) => {
    const [resultado] = await conexao.query(
        "DELETE FROM alunos WHERE id=?",
        [id]
    );
    return resultado;
};