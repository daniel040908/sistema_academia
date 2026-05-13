import conexao from "../config/db.js";
 
export const criarFrequencia = async (aluno_id, data, presente, observacao) => {
    const [resultado] = await conexao.query(
        "INSERT INTO frequencias (aluno_id, data_frequencia, presente, observacao) VALUES (?, ?, ?, ?)",
        [aluno_id, data, presente, observacao ?? null] 
    );
    return resultado;
};
 
export const buscarFrequencias = async () => {
    const [resultado] = await conexao.query("SELECT * FROM frequencias");
    return resultado;
};
 
// frequenciaModel.js - Ajuste na atualização
export const atualizarFrequencia = async (id, aluno_id, data, presente, observacao) => {
    // Usamos o operador ?? para garantir que valores opcionais sejam null se não informados
    const [resultado] = await conexao.query(
        "UPDATE frequencias SET aluno_id=?, data_frequencia=?, presente=?, observacao=? WHERE id=?",
        [aluno_id, data, presente, observacao ?? null, id]
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