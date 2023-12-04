const joi = require('joi');

const produtoSchema = joi.object({
    descricao: joi.string().required().messages({
        'string.base': 'Descrição inválida!',
        'any.required': 'O campo descricao é obrigatório!'
    }),
    quantidade_estoque: joi.number().positive().min(1).integer().required().messages({
        'number.base': 'Valor inválido!',
        'number.positive': 'Valor inválido!',
        'number.min': 'Valor inválido!',
        'number.integer': 'Valor inválido!',
        'any.required': 'O campo quantidade_estoque é obrigatório!'
    }),
    valor: joi.number().positive().min(1).integer().required().messages({
        'number.base': 'Valor inválido!',
        'number.positive': 'Valor inválido!',
        'number.min': 'Valor inválido!',
        'number.integer': 'Valor inválido!',
        'any.required': 'O campo valor é obrigatório!'
    }),
    categoria_id: joi.number().positive().min(1).integer().required().messages({
        'number.base': 'Valor inválido!',
        'number.positive': 'Valor inválido!',
        'number.min': 'Valor inválido!',
        'number.integer': 'Valor inválido!',
        'any.required': 'O campo categoria_id é obrigatório!'
    })
});

module.exports = produtoSchema;