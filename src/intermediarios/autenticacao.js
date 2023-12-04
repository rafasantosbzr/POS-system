const jwt = require('jsonwebtoken');
const senhaJwt = require('../senhaJwt');
const knex = require('../conexao');

const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso, um token de autenticação válido deve ser enviado!' });
    };

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, senhaJwt);

        const usuario = await knex('usuarios').where('id', id).returning('*');

        if (usuario.length === 0) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso, você precisa estar logado!' });
        };

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json({mensagem: 'Acesso negado!'});
    };
};

module.exports = verificarUsuarioLogado;