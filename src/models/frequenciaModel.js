import conexao from "../config/db.js";

export const criarFrequencia = async (aluno_id, data, presente) => {
    const [resultado] = await conexao.query(
        "INSERT INTO frequencias (aluno_id, data, presente) VALUES (?, ?, ?)",
        [aluno_id, data, presente]
    );
    return resultado;
};

// 👇 Função adicionada aqui
export const buscarFrequencias = async () => {
    const [resultado] = await conexao.query("SELECT * FROM frequencias");
    return resultado;
};

export const atualizarFrequencia = async (id, aluno_id, data, presente) => {
    const [resultado] = await conexao.query(
        "UPDATE frequencias SET aluno_id=?, data=?, presente=? WHERE id=?",
        [aluno_id, data, presente, id]
    );
    return resultado;
};

export const deletarFrequencia = async (id) => {
    const [resultado] = await conexao.query(
        "DELETE FROM frequencias WHERE id=?",
        [id]
    );
    return resultado;
};