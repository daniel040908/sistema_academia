import conexao from "../config/db.js";

export const criarInstrutor = async (nome, especialidade) => {
    const [resultado] = await conexao.query(
        "INSERT INTO instrutores (nome, especialidade) VALUES (?, ?)",
        [nome, especialidade]
    );
    return resultado;
};

export const buscarInstrutores = async () => {
    const [rows] = await conexao.query("SELECT * FROM instrutores");
    return rows;
};

export const atualizarInstrutor = async (id, nome, especialidade) => {
    const [resultado] = await conexao.query(
        "UPDATE instrutores SET nome=?, especialidade=? WHERE id=?",
        [nome, especialidade, id]
    );
    return resultado;
};

export const deletarInstrutor = async (id) => {
    const [resultado] = await conexao.query(
        "DELETE FROM instrutores WHERE id=?",
        [id]
    );
    return resultado;
};