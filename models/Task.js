
const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
    titulo: String,
    descricao: String,
    status: String,
    prioridade: String,
    impedimento: {
        temImpedimento: {
            type: Boolean,
            default: false
        },
        motivo: {
            type: String,
            required: function () {
                return this.impedimento.temImpedimento === true;
            }
        },
        descricaoDetalhada: String
    }
});


module.exports = mongoose.model('Task', modelSchema);