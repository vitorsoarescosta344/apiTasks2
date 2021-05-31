const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'database-2.cfb2fyrhpdpy.us-east-2.rds.amazonaws.com',
      user : 'admin',
      password : '33333386',
      database : 'tasks'
    },
  });

const obterHash = (password, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
    })
}
class UserController {


    async save(req, res) {
        try {
            obterHash(req.body.password, hash => {
                const password = hash
                const createUser ={
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password
                }
                const Users = knex('users').insert({name: createUser.name, email: createUser.email, password})
                                .then(_ => res.status(204).send())
            })
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

}

module.exports = new UserController();