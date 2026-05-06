import conexao from "../config/db.js";

export const criarPlano = async (nome, descricao, valor, duracao_meses, ativo) => {
    const [resultado] = await conexao.query(
        "INSERT INTO planos (nome, descricao, valor, duracao_meses, ativo) VALUES (?, ?, ?, ?, ?)",
        [nome, descricao, valor, duracao_meses, ativo ?? true]
    );
    return resultado;
};

export const buscarPlanos = async () => {
    const [rows] = await conexao.query("SELECT * FROM planos");
    return rows;
};

export const atualizarPlano = async (id, nome, descricao, valor, duracao_meses, ativo) => {
    const [resultado] = await conexao.query(
        "UPDATE planos SET nome=?, descricao=?, valor=?, duracao_meses=?, ativo=? WHERE id=?",
        [nome, descricao, valor, duracao_meses, ativo, id]
    );
    return resultado;
};

export const deletarPlano = async (id) => {
    const [resultado] = await conexao.query(
        "DELETE FROM planos WHERE id=?",
        [id]
    );
    return resultado;
};