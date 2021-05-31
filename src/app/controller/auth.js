const jwt = require('jwt-simple')
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

class AuthController{
    signin(req, res){
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Dados incompletos')
        }

        const user = await knex('users')
            .whereRaw("LOWER(email) = LOWER(?)", req.body.email)
            .first()
            .catch(err => res.status(400).json(err))
        if(user){
            try{
                bcrypt.compare(req.body.password, user.password, (err, isMatch)=>{
                    if(err || !isMatch){
                        return res.status(401).send()
                    }
                    const payload = {id: user.id}
                    res.json({
                        name: user.name,
                        email: user.email,
                        token: jwt.encode(payload, 12345678)
                    })
                })
            }catch (err){
                console.log(err)
            }
        }else {
            res.status(400).send('Problemas com o login do usuário')
        }
    }
}

module.exports = new AuthController();