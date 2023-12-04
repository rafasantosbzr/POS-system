const joi = require('joi');

const usuarioSchema = joi.object({
    nome: joi.string().required().messages({
        'string.base': 'Nome inválido!',
        'any.required': 'O campo nome é obrigatório!'
    }),
    email: joi.string().email().required().messages({
        'string.base': 'E-mail inválido!',
        'string.email': 'Formato de e-mail inválido!',
        'any.required': 'O campo email é obrigatório!'
    }),
    senha: joi.string().required().messages({
        'string.base': 'Senha inválida!',
        'any.required': 'O campo senha é obrigatório!'
    })
});

module.exports = usuarioSchema;