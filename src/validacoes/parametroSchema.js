const joi = require('joi');

const parametroSchema = joi.object({
    id: joi.number().positive().min(1).integer().messages({
        'number.base': 'Formato de id inválido!',
        'number.positive': 'Id inválido!',
        'number.min': 'Id inválido!',
        'number.integer': 'Id inválido'  
    })
});

module.exports = parametroSchema;