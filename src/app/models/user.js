const Sequelize = require('sequelize')
const database = require('../../../db')
const user = database.define('user', {
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            len: [8, 12],
        },
    },
});
module.exports = user