const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'database-2.cfb2fyrhpdpy.us-east-2.rds.amazonaws.com',
        user: 'admin',
        password: '33333386',
        database: 'tasks'
    },
});

const moment = require('moment')

class TaskController {
    async getTasks(req, res) {
        try {
            const date = req.params.date ? req.params.date
                :moment().endOf('day').toDate()
            knex('tasks')
                .where({ userId: req.params.userId })
                .where('estimateAt', '<=', date)
                .orderBy('estimateAt')
                .then(tasks => res.json(tasks))
                .catch(err => res.status(400).json(err))
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }

    }
    async save(req, res) {
        if (!req.body.desc.trim()) {
            return res.status(400).send('Descrição é um campo inválido')
        }

        //req.body.userId = req.user.id

        knex('tasks')
            .insert(req.body)
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    async remove(req, res) {
        knex('tasks')
            .where({id: req.params.id})
            .del()
            .then(rowsDeleted => {
                if(rowsDeleted > 0){
                    res.status(204).send()
                }else{
                    const msg = `Não foi encontradA task com id ${req.params.id}`
                    res.status(400).send(msg) 
                }
            })
            .catch(err => res.status(400).json(err))
    }

    async updateTaskDoneAt (req, res, doneAt){
        knex('tasks')
            .where({id: req.params.id, userId: req.params.userId})
            .update({doneAt})
            .then(_ => res.status(204).send(), console.log(doneAt))
            .catch(err => res.status(400).json({error: "ocorreu um erro!"}))
    }

    async toggleTask(req, res) {
        knex('tasks')
            .where({ id: req.params.id, userId: req.params.userId })
            .then(task => {
                if (!task) {
                    const msg = `Task com id ${req.params.id}`
                    return res.status(400).send(msg)
                }

                const doneAt = task.doneAt ? null : new Date()
                knex('tasks')
                    .where({id: req.params.id, userId: req.params.userId})
                    .update({doneAt})
                    .then(_ => res.status(204).send(), console.log(doneAt))
                    .catch(err => res.status(400).json({error: "ocorreu um erro!"}))
            })
            //.catch(err => res.status(400).json({error: "Catch"}))
    }
}

module.exports = new TaskController();