let tasks = [
    { id: 1, titulo: "Lavar a casa", descricao: "É necessario lavar a cara", status: "Pendente", prioridade: "Alta" },
    { id: 2, titulo: "Fazer comida", descricao: "É necessario fazer o almoço", status: "Concluida", prioridade: "Baixa" },
    { id: 3, titulo: "Lavar carro", descricao: "É necessario lavar o carro", status: "A fazer", prioridade: "Médio" },
]

module.exports = {
    getAllTasks: (req, res, next) => {
        res.status(200).json(tasks);
    },

    getTaskByid: (req, res, next) => {
        let idTask = req.params.id;
        let tarefas = tasks.filter(function (tarefa) {
            return tarefa.id == idTask;
        });
        console.log(tarefas);
        if (tasks.length == 0) {
            res.status(404).json({ msg: "Tarefa não encontrada" });
        } else {
            res.status(200).json(tarefas[0]);
        }
    },

    addTask: (req, res, next) => {
        let newTask = req.body;
        newTask.id = tasks[tasks.length - 1].id + 1;
        if (newTask.titulo == null) {
            res.status(404).json({ msg: "Você precisa adicionar um titulo!" })
        } else if (newTask.descricao == null) {
            res.status(404).json({ msg: "Você precisa adicionar uma descrição!" })
        } else if (newTask.status == null) {
            res.status(404).json({ msg: "Você precisa adicionar um status! EX: Pendente" })
        } else if (newTask.prioridade == null) {
            res.status(404).json({ msg: "Você precisa adicionar um nível de prioridade! (Alta, Média ou Baixa)" })
        } else {
            tasks.push(newTask);
            res.status(201).json({ msg: "Tarefa adicionada!" });
        }

    },

    editTask: (req, res, next) => {
        let idTask = req.params.id;
        let titulo = req.body.titulo;
        let descricao = req.body.descricao;
        let status = req.body.status;
        let prioridade = req.body.prioridade;
        let found = false;
    
        tasks.forEach((task, index) => {
            if (task.id == idTask) {
                found = true;
    
                tasks[index].titulo = titulo !== undefined ? titulo : tasks[index].titulo;
                tasks[index].descricao = descricao !== undefined ? descricao : tasks[index].descricao;
                tasks[index].status = status !== undefined ? status : tasks[index].status;
                tasks[index].prioridade = prioridade !== undefined ? prioridade : tasks[index].prioridade;
    
                res.status(200).json({ msg: "Tarefa Alterada Com Sucesso" });
                return;
            }
        });
    
        if (!found) res.status(404).json({ msg: "Tarefa não encontrada!" });
    },

    deleteTask: (req, res, next) => {
        let idTask = req.params.id;
        let found = false;

        tasks.forEach((task, index) => {
            if (task.id == idTask) {
                found = true;
                tasks.splice(index, 1);
                res.status(200).json({ msg: "Tarefa removida!" });
                return;
            }
        });
        if (!found) res.status(404).json({ msg: "Tarefa não encontrado!" });
    }
}