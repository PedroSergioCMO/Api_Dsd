const {checkSchema} = require('express-validator');


//titulo:, descricao, status, prioridade,



module.exports = {
    manipulateTask: checkSchema({
        titulo: {
            notEmpty: true,
            trim: true,
            errorMessage: "O Titulo precisa ser preenchido!"
        },
        descricao: {
            notEmpty: true,
            trim: true,
            isLength: {
                options: {min: 4}
            },
            errorMessage: "A descrição precisa ter pelo menos 4 caracteres"
        },
        status: {
            notEmpty: true,
            trim: true,
            errorMessage: "Os status precisa ser preenchido!"
        },
        prioridade: {
            notEmpty: true,
            trim: true,
            errorMessage: "A prioridade precisa ser preenchida!"
        }
    })
}