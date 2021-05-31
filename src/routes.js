const { Router } = require('express');
const UserController = require('./app/controller/userController');
const TaskController = require('./app/controller/tasksController');
const AuthController = require('./app/controller/auth')
const Passport = require('./app/controller/passport')

const routes = Router();


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