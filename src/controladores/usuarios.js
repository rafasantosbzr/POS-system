const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');
const knex = require('../conexao');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const emailExiste = await knex('usuarios').where('email', email).first();

    if (emailExiste) {
        return res.status(400).json({ mensagem: 'Já existe um usuário cadastrado com o e-mail informado!' });
    };

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await knex('usuarios').insert({nome, email, senha: senhaHash}).returning('*');

    const {senha: _, ...usuarioCadastrado} = novoUsuario[0];

    return res.status(201).json(usuarioCadastrado);
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    };
};

const login = async (req, res) => {
    const { email, senha } = req.body

    try {
        const usuario = await knex('usuarios').where('email', email).first();

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s)!' });
        };

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Usuário e/ou senha inválido(s)!'});
        };

        const token = jwt.sign({ id: usuario.id }, senhaJwt, { expiresIn: '8h' });

        const { senha: _, ...usuarioLogado } = usuario;

        return res.status(200).json({ usuario: usuarioLogado, token });
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
    };
};

const detalharUsuario = async (req, res) => {
    const { senha: _, ...usuario } = req.usuario[0];

    return res.status(200).json(usuario);
};

const atualizarUsuario = async (req,res) => {
    const { nome, email, senha } = req.body
    const { id } = req.usuario[0]
   
   try {
       const emailExiste = await knex('usuarios').where('email', email).whereNot('id', id).first();
        
       if (emailExiste) {
        return res.status(400).json({mensagem: 'Já existe um usuário cadastrado com o e-mail informado!'});
       };

       const senhaHash = await bcrypt.hash(senha, 10); 

       await knex('usuarios').update({nome, email, senha: senhaHash}).where('id',id).returning('*');
    
       return res.status(204).send();

   } catch (error) {
       return res.status(500).json({mensagem: 'Erro interno do servidor!'});
   };
};

module.exports = {
    cadastrarUsuario,
    login,
    detalharUsuario,
    atualizarUsuario
};