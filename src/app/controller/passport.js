//const { authSecret } = require('../.env')
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'database-2.cfb2fyrhpdpy.us-east-2.rds.amazonaws.com',
      user : 'admin',
      password : '33333386',
      database : 'tasks'
    },
  });
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

const params = {
    secretOrKey: 12345678,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}
const strategy = new Strategy(params, (payload, done) => {
    knex('users')
        .where({ id: payload.id })
        .first()
        .then(user => {
            if (user) {
                done(null, { id: user.id, email: user.email })
            } else {
                done(null, false)
            }
        })
        .catch(err => done(err, false))
})
passport.use(strategy)
const passport2 = {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false })
    
}
class Passport {

}

module.exports = passport2