// let tasks = [
//     { id: 1, titulo: "Lavar a casa", descricao: "É necessario lavar a cara", status: "Pendente", prioridade: "Alta" },
//     { id: 2, titulo: "Fazer comida", descricao: "É necessario fazer o almoço", status: "Concluida", prioridade: "Baixa" },
//     { id: 3, titulo: "Lavar carro", descricao: "É necessario lavar o carro", status: "A fazer", prioridade: "Médio" },
// ]

const Task = require('../models/Task');
const { validationResult, matchedData } = require('express-validator');
const { all } = require('../routes');


module.exports = {
    getAllTasks: async (req, res) => {
        let task = req.query;
        const tasks = await Task.find();
        res.status(200).json(tasks);
    },

    getTask: async (req, res) => {
        let titulo = req.params.titulo;
        const tituloTask = await Task.findOne({ titulo: titulo });

        if (tituloTask == null) {
            res.json({
                res: "Titulo de tarefa não encontrado"
            })
            return;
        }
        res.json({
            tituloTask
        });
    },

    addTask: async (req, res) => {
        const erros = validationResult(req);
    
        if (!erros.isEmpty()) {
            res.json({
                error: erros.mapped()
            });
            return;
        }
    
        const data = matchedData(req);
    
        const newTask = new Task({
            titulo: data.titulo,
            descricao: data.descricao,
            status: data.status,
            prioridade: data.prioridade,
            
            impedimento: {
                temImpedimento: req.body.impedimento && req.body.impedimento.temImpedimento,
                motivo: req.body.impedimento && req.body.impedimento.motivo,
                descricaoDetalhada: req.body.impedimento && req.body.impedimento.descricaoDetalhada
            }
        });
    
        try {
            const info = await newTask.save();
            res.json({ info });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao adicionar a tarefa" });
        }
    },

    editTask: async (req, res) => {

        try {

            const tarefaId = req.params.taskId;

            const tarefa = await Task.findById(tarefaId);

            console.log(tarefa.titulo);
            tarefa.titulo = req.body.titulo || tarefa.titulo;
            tarefa.descricao = req.body.descricao || tarefa.descricao;
            tarefa.status = req.body.status || tarefa.status;
            tarefa.prioridade = req.body.prioridade || tarefa.prioridade;

            tarefa.impedimento.temImpedimento = req.body.impedimento && req.body.impedimento.temImpedimento;
            tarefa.impedimento.motivo = req.body.impedimento && req.body.impedimento.motivo;
            tarefa.impedimento.descricaoDetalhada = req.body.impedimento && req.body.impedimento.descricaoDetalhada;


            await tarefa.save();

            res.status(200).json({ msg: "Tarefa Alterada Com Sucesso" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao editar a tarefa" });
        }
    },

    deleteTask: async (req, res) => {
        const tarefaId = req.params.taskId;

        try {
            const deletedTask = await Task.findOneAndDelete(tarefaId);

            if (deletedTask) {
                res.status(200).json({ msg: "Tarefa removida!" });
            } else {
                res.status(404).json({ msg: "Tarefa não encontrada!" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "Erro ao excluir a tarefa" });
        }
    }

}