const joi = require('joi');

const pedidoSchema = joi.object({
    cliente_id: joi.number().integer().positive().required().messages({
        'any.required': 'O campo cliente_id é obrigatório.',
        'number.base': 'O campo cliente_id deve ser um número.',
        'number.integer': 'O campo cliente_id deve ser um número inteiro',
        'number.positive': 'O campo cliente_id deve ser um número positivo'
    }),
    observacao: joi.string().required().messages({
        'any.required': 'O campo observação é obrigatório'
    }),
    pedido_produtos: joi.array().min(1).items(
        joi.object({
            produto_id: joi.number().integer().positive().required().messages({
                'any.required': 'O campo produto_id é obrigatório.',
                'number.base': 'O campo produto_id deve ser um número.',
                'number.integer': 'O campo produto_id deve ser um número inteiro',
                'number.positive': 'O campo produto_id deve ser um número positivo'

            }),
            quantidade_produto: joi.number().integer().positive().required().messages({
                'any.required': 'O campo quantidade_produto é obrigatório.',
                'number.base': 'O campo quantidade_produto deve ser um número.',
                'number.integer': 'O campo quantidade_produto deve ser um número inteiro',
                'number.positive': 'O campo quantidade_produto deve ser um número positivo'

            })
        })
    ).required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório',
        'array.min': 'O campo pedido_produtos deve conter pelo menos 1 item.'
    })
});

module.exports = pedidoSchema;