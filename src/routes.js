const { Router } = require('express');
const UserController = require('./app/controller/userController');
const TaskController = require('./app/controller/tasksController');
const AuthController = require('./app/controller/auth')
const Passport = require('./app/controller/passport')
const cors = require('cors')

const routes = Router();

routes.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    next()
})

routes.post('/signup', UserController.save);

routes.post('/signin', AuthController.signin)


routes.route('/tasks')
    .all(Passport.authenticate())
    .get(TaskController.getTasks)
    .post(TaskController.save)
routes.route('/tasks/:id')
    .all(Passport.authenticate())
    .delete(TaskController.remove)
routes.route('/tasks/:id/toggle')
    .all(Passport.authenticate())
    .put(TaskController.toggleTask)

module.exports = routes;