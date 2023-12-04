const knex = require('../conexao');

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes');

        return res.status(200).json(clientes);
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'});
    }
};

const detalharCliente = async(req, res) => {
    const { id } = req.params

    try {
        const clienteEncontrado = await knex('clientes').where('id', id).first();

        if (!clienteEncontrado) {
            return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
        };

        return res.status(200).json(clienteEncontrado);
    } catch (error) {
        return res.status(500).json({mensagem: 'Erro interno do servidor!'});
    };
};

const cadastrarCliente = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    try {
    const cpfEncontrado = await knex('clientes').where('cpf', cpf).first();

    if (cpfEncontrado) {
        return res.status(400).json({mensagem: 'Já existe um usuário cadastrado com o CPF informado!'});
    };
    
    const emailEncontrado = await knex('clientes').where('email', email).first();
    
    if (emailEncontrado) {
        return res.status(400).json({mensagem: 'Já existe um usuário cadastrado com o e-mail informado!'});
    };

    const novoCliente = await knex('clientes').insert({ 
        nome, 
        email, 
        cpf, 
        cep, 
        rua, 
        numero, 
        bairro, 
        cidade, 
        estado 
    }).returning('*');

    return res.status(200).json(novoCliente[0]);

    } catch (error) {
    return res.status(500).json({mensagem: 'Erro interno do servidor!'});
    };
};

const atualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;

    const clienteEncontrado = await knex('clientes').where('id', id).first();
    
    if (!clienteEncontrado) {
        return res.status(400).json({mensagem: 'Cliente não encontrado!'});
    };

    try {
        const cpfEncontrado = await knex('clientes').where('cpf', cpf).whereNot('id', id).first();

    if (cpfEncontrado) {
        return res.status(400).json({mensagem: 'Já existe um usuário cadastrado com o CPF informado!'});
    };
    
    const emailEncontrado = await knex('clientes').where('email', email).whereNot('id', id).first();

    if (emailEncontrado) {
        return res.status(400).json({mensagem: 'Já existe um usuário cadastrado com o e-mail informado!'});
    };

    await knex('clientes').update({ 
        nome, 
        email, 
        cpf, 
        cep, 
        rua, 
        numero, 
        bairro, 
        cidade, 
        estado 
    }).where('id', id).returning('*');

    return res.status(204).send();
    } catch (error) {
    return res.status(500).json({mensagem: 'Erro interno do servidor!'});
    };
};

module.exports = {
    listarClientes,
    detalharCliente,
    cadastrarCliente,
    atualizarCliente
};