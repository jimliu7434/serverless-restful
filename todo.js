const Sequelize = require('sequelize');
const mssql = new Sequelize('todo', 'jimliu7434', '1234567890000', {
    host: 'mssql.czue5esgst70.ap-southeast-1.rds.amazonaws.com',
    dialect: 'mssql',
    timezone: '+0800',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
});
const Todo = mssql.define('Todo', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    text: {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
    },

    checked: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },

    createAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },

    updateAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
    },
})

module.exports = Todo;