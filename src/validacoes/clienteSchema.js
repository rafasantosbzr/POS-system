const joi = require('joi');

const clienteSchema = joi.object({
    nome: joi.string().required().messages({
        'string.base': 'Nome inválido!',
        'any.required': 'O campo nome é obrigatório!'
    }),
    email: joi.string().email().required().messages({
        'string.base': 'E-mail inválido!',
        'string.email': 'Formato de e-mail inválido!',
        'any.required': 'O campo email é obrigatório!'
    }),
    cpf: joi.string().required().messages({
        'string.base': 'CPF inválido!',
        'any.required': 'O campo cpf é obrigatório!'
    }),
    cep: joi.string().messages({
        'string.base': 'CEP inválido!'
    }),
    rua: joi.string().messages({
        'string.base': 'Endereço inválido!'
    }),
    numero: joi.string().messages({
        'string.base': 'Endereço inválido!'
    }),
    bairro: joi.string().messages({
        'string.base': 'Endereço inválido!'
    }),
    cidade: joi.string().messages({
        'string.base': 'Endereço inválido!'
    }),
    estado: joi.string().messages({
        'string.base': 'Endereço inválido!'
    })
});

module.exports = clienteSchema;