import * as alunoModel from "../models/alunoModel.js";

export const criarAluno = async (req, res) => {
  try {
    const { nome, email, plano_id, telefone, data_nascimento, status, cpf } = req.body;

    // Validação
    if (!nome || !email) {
      return res.status(400).json({ msg: "Nome e email obrigatórios" });
    }

    if (!cpf) {
      return res.status(400).json({ msg: "CPF é obrigatório" });
    }

    const result = await alunoModel.criarAluno(
      nome, 
      email, 
      plano_id || null, 
      telefone || null, 
      data_nascimento || null, 
      status || 'Ativo',
      cpf
    );
    
    res.status(201).json({ 
      msg: "Aluno criado com sucesso",
      id: result.insertId,
      nome,
      email
    });

  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    
    // Tratamento de erros específicos
    if (error.code === 'ER_DUP_ENTRY') {
      if (error.sqlMessage.includes('email')) {
        return res.status(409).json({ erro: "Email já cadastrado" });
      }
      if (error.sqlMessage.includes('cpf')) {
        return res.status(409).json({ erro: "CPF já cadastrado" });
      }
    }
    
    if (error.code === 'ER_NO_DEFAULT_FOR_FIELD') {
      return res.status(400).json({ 
        erro: "Campo obrigatório não informado",
        campo: error.sqlMessage.match(/Field '(\w+)'/)?.[1]
      });
    }
    
    res.status(500).json({ 
      erro: error.message,
      sqlMessage: error.sqlMessage 
    });
  }
};

export const listarAlunos = async (req, res) => {
  try {
    const alunos = await alunoModel.buscarAlunos();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const atualizarAluno = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, plano_id, telefone, data_nascimento, status, cpf } = req.body;

    const result = await alunoModel.atualizarAluno(
      id, 
      nome, 
      email, 
      plano_id, 
      telefone, 
      data_nascimento, 
      status,
      cpf
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Aluno não encontrado" });
    }

    res.json({ msg: "Aluno atualizado com sucesso" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const deletarAluno = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await alunoModel.deletarAluno(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: "Aluno não encontrado" });
    }

    res.json({ msg: "Aluno deletado com sucesso" });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};