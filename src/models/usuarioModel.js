import conexao from "../config/db.js";

export const buscarPorEmail = async (email) => {
    const [rows] = await conexao.query(
        "SELECT * FROM usuarios WHERE email = ?", 
        [email]
    );
    return rows[0];
};

export const criarUsuario = async (nome, email, senha, perfil) => {
    const [resultado] = await conexao.query(
        "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)",
        [nome, email, senha, perfil]
    );
    return resultado;
};

// ✅ LISTAR TODOS
export const buscarTodos = async () => {
    const [rows] = await conexao.query(
        "SELECT id, nome, email, perfil FROM usuarios"
    );
    return rows;
};

// ✅ BUSCAR POR ID
export const buscarPorId = async (id) => {
    const [rows] = await conexao.query(
        "SELECT id, nome, email, perfil FROM usuarios WHERE id = ?",
        [id]
    );
    return rows[0];
};

// ✅ ATUALIZAR USUÁRIO
export const atualizarUsuario = async (id, nome, email, perfil) => {
    const [resultado] = await conexao.query(
        "UPDATE usuarios SET nome = ?, email = ?, perfil = ? WHERE id = ?",
        [nome, email, perfil, id]
    );
    return resultado;
};

// ✅ DELETAR USUÁRIO
export const deletarUsuario = async (id) => {
    const [resultado] = await conexao.query(
        "DELETE FROM usuarios WHERE id = ?",
        [id]
    );
    return resultado;
};