export const validarAluno = (req, res, next) => {
    const { nome, email, telefone, data_nascimento } = req.body;
    
    // Validações básicas
    if (!nome || nome.trim().length < 3) {
        return res.status(400).json({ 
            msg: "Nome é obrigatório e deve ter pelo menos 3 caracteres" 
        });
    }
    
    if (!email) {
        return res.status(400).json({ msg: "Email é obrigatório" });
    }
    
    next();
};