const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Campaign = require('./campaign')(sequelize, Sequelize);
db.Event = require('./event')(sequelize, Sequelize);


db.Campaign.hasMany(db.Event, { foreignKey: 'root_id', sourceKey: 'id' });
db.Event.belongsTo(db.Campaign, { foreignKey: 'root_id', targetKey: 'id' });
module.exports = db;
