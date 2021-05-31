	
const Sequelize = require('sequelize');
const sequelize = new Sequelize('tasks', 'admin', '33333386', {dialect: 'mysql', host: 'database-2.cfb2fyrhpdpy.us-east-2.rds.amazonaws.com'});
 
module.exports = sequelize;