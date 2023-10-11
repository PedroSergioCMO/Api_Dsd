
const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({

    titulo: String,
    descricao: String,
    status: String,
    prioridade: String,
});

// Adicione um hook para criar o número da tarefa automaticamente

module.exports = mongoose.model('Task', modelSchema);


// if(mongoose.connection && mongoose.connection.models[modelName]){
//     module.exports = mongoose.connection.models[modelName];
// }else {
//     module.exports = mongoose.connection.model[modelName, modelSchema];
// }
